import { initializeApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getMessaging, Messaging } from 'firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEc7yDOP9Hhi86_IxSDSf-b3cGwbvPp8k",
  authDomain: "cinchintervalstaffingrep.firebaseapp.com",
  databaseURL: "https://cinchintervalstaffingrep-default-rtdb.firebaseio.com",
  projectId: "cinchintervalstaffingrep",
  storageBucket: "cinchintervalstaffingrep.appspot.com",
  messagingSenderId: "137246401526",
  appId: "1:137246401526:web:79aca486c44fee685fddd7",
  measurementId: "G-MV14BQDEYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics y Messaging no existen en todos los navegadores (ej. Safari iOS sin instalar la app).
// Si fallan, la app debe seguir cargando sin ellos.
let analyticsInstance: Analytics | null = null;
let messagingInstance: Messaging | null = null;

if (typeof window !== 'undefined') {
  try {
    analyticsInstance = getAnalytics(app);
  } catch (e) {
    console.warn('Firebase Analytics no disponible:', e);
  }
  try {
    if ('serviceWorker' in navigator && 'Notification' in window) {
      messagingInstance = getMessaging(app);
    }
  } catch (e) {
    console.warn('Firebase Messaging no disponible:', e);
  }
}

export const analytics = analyticsInstance;
export const messaging = messagingInstance;

export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);

export default app;
