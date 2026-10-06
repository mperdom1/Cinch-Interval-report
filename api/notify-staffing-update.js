// Función serverless de Vercel: envía la notificación push (FCM) a todos los tokens guardados.
// Requiere la variable de entorno FIREBASE_SERVICE_ACCOUNT (JSON completo de la cuenta de servicio).
import admin from 'firebase-admin';

function getApp() {
  if (admin.apps.length) return admin.app();
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error('Falta la variable de entorno FIREBASE_SERVICE_ACCOUNT');
  return admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(raw)),
    databaseURL: 'https://cinchintervalstaffingrep-default-rtdb.firebaseio.com'
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    getApp();
    const updatedBy = String((req.body && req.body.updatedBy) || 'Unknown').slice(0, 100);

    const snapshot = await admin.database().ref('fcmTokens').once('value');
    const tokensObj = snapshot.val() || {};
    // Cada entrada se guarda como { token, updatedAt }
    const tokens = Object.values(tokensObj)
      .map((entry) => (typeof entry === 'string' ? entry : entry && entry.token))
      .filter(Boolean);

    if (tokens.length === 0) {
      return res.status(404).json({ error: 'No FCM tokens found.' });
    }

    const response = await admin.messaging().sendEachForMulticast({
      notification: {
        title: 'Interval staffing updated',
        body: `Actualizado por ${updatedBy}`
      },
      tokens
    });

    res.json({ success: true, sent: response.successCount, failed: response.failureCount });
  } catch (error) {
    console.error('Error sending FCM notification:', error);
    res.status(500).json({ error: error.message });
  }
}
