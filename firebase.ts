import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEc7yDOP9Hhi86_IxSDSf-b3cGwbvPp8k",
  authDomain: "cinchintervalstaffingrep.firebaseapp.com",
  projectId: "cinchintervalstaffingrep",
  storageBucket: "cinchintervalstaffingrep.firebasestorage.app",
  messagingSenderId: "137246401526",
  appId: "1:137246401526:web:79aca486c44fee685fddd7",
  measurementId: "G-MV14BQDEYQ",
  databaseURL: "https://cinchintervalstaffingrep-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);

export default app;
