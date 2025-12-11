// Interfaz común para almacenamiento remoto (Firebase, JSONBin, etc.)
import { AppState } from '../types';

export interface CloudProvider {
  fetch: () => Promise<AppState | null>;
  save: (data: AppState) => Promise<boolean>;
  subscribe?: (callback: (data: AppState | null) => void) => () => void;
}

// Ejemplo de implementación para Firebase
import { get, set, ref, onValue, off } from 'firebase/database';
import { realtimeDb } from '../firebase';

export const firebaseProvider: CloudProvider = {
  fetch: async () => {
    try {
      const snapshot = await get(ref(realtimeDb, 'intervals'));
      return snapshot.exists() ? snapshot.val() : null;
    } catch (e) {
      console.error('Firebase fetch error:', e);
      return null;
    }
  },
  save: async (data: AppState) => {
    try {
      await set(ref(realtimeDb, 'intervals'), data);
      return true;
    } catch (e) {
      console.error('Firebase save error:', e);
      return false;
    }
  },
  subscribe: (callback) => {
    const dbRef = ref(realtimeDb, 'intervals');
    const handler = (snapshot: any) => {
      callback(snapshot.exists() ? snapshot.val() : null);
    };
    onValue(dbRef, handler);
    return () => off(dbRef, 'value', handler);
  }
};

// Ejemplo de uso:
// import { firebaseProvider } from './services/cloudProvider';
// firebaseProvider.fetch().then(...)
// firebaseProvider.save(data)
// const unsubscribe = firebaseProvider.subscribe((data) => { ... })
