import { useEffect } from 'react';
import { onValue, ref, off, DatabaseReference } from 'firebase/database';
import { realtimeDb } from '../firebase';

/**
 * Custom hook para suscribirse en tiempo real a cualquier ruta de Firebase Realtime Database.
 * @param path Ruta en la base de datos (por ejemplo, 'intervals' o 'agents')
 * @param callback Función que recibe los datos actualizados
 */
export function useFirebaseRealtime<T = any>(path: string, callback: (data: T | null) => void) {
  useEffect(() => {
    const dbRef: DatabaseReference = ref(realtimeDb, path);
    const handler = (snapshot: any) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        callback(null);
      }
    };
    onValue(dbRef, handler);
    return () => off(dbRef, 'value', handler);
  }, [path, callback]);
}
