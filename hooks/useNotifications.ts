import { useEffect } from 'react';
import { messaging } from '../firebase';
import { getToken, onMessage } from 'firebase/messaging';
import { getDatabase, ref, set } from 'firebase/database';
import { User } from '../types';

export const useNotifications = (user: User | null) => {
    // Request permission on mount
    useEffect(() => {
        if (!('Notification' in window)) {
            console.log('❌ Notification API not supported in this browser');
            return;
        }

        if (Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('✅ Notification permission granted.');
                }
            });
        }
    }, []);

    // FCM Setup
    useEffect(() => {
        if (!user || !messaging) return;

        const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY as string | undefined;
        if (!vapidKey) {
            console.warn('Falta VITE_FIREBASE_VAPID_KEY: las notificaciones push en segundo plano están desactivadas.');
        }

        // Register worker and get token
        if (vapidKey && 'serviceWorker' in navigator && Notification.permission === 'granted') {
            navigator.serviceWorker.register('/firebase-messaging-sw.js')
                .then((registration) => {
                    return getToken(messaging!, {
                        vapidKey,
                        serviceWorkerRegistration: registration
                    });
                })
                .then((currentToken) => {
                    if (currentToken && user.email) {
                            const db = getDatabase();
                        // Sanitized email key
                        const emailKey = user.email.replace(/[.@]/g, '_');
                        set(ref(db, 'fcmTokens/' + emailKey), {
                            token: currentToken,
                            updatedAt: new Date().toISOString()
                        });
                    }
                })
                .catch((err) => {
                    console.log('Error getting FCM token:', err);
                });
        }

        // Foreground messages
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log('🔔 FCM Message received:', payload);
            if (payload.notification) {
                new Notification(payload.notification.title || 'Notification', {
                    body: payload.notification.body,
                    icon: '/favicon.ico'
                });
            }
        });

        return () => unsubscribe();
    }, [user]);
};
