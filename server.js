const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

// Inicializa firebase-admin con tu serviceAccountKey.json
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cinchintervalstaffingrep-default-rtdb.firebaseio.com'
});

const app = express();
app.use(bodyParser.json());

// Endpoint para enviar notificación FCM
app.post('/notify-staffing-update', async (req, res) => {
  try {
    const updatedBy = req.body.updatedBy || 'Unknown';
    // Lee los tokens desde la base de datos
    const tokensSnapshot = await admin.database().ref('fcmTokens').once('value');
    const tokensObj = tokensSnapshot.val() || {};
    const tokens = Object.values(tokensObj);

    if (tokens.length === 0) {
      return res.status(404).json({ error: 'No FCM tokens found.' });
    }

    const message = {
      notification: {
        title: 'Interval staffing updated',
        body: `Actualizado por ${updatedBy}`
      },
      tokens: tokens
    };

    // Envía la notificación a todos los tokens
    const response = await admin.messaging().sendMulticast(message);
    res.json({ success: true, response });
  } catch (error) {
    console.error('Error sending FCM notification:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend FCM server running on port ${PORT}`);
});
