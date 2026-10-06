importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Debe ser el MISMO proyecto de Firebase que firebase.ts
firebase.initializeApp({
  apiKey: "AIzaSyDEc7yDOP9Hhi86_IxSDSf-b3cGwbvPp8k",
  authDomain: "cinchintervalstaffingrep.firebaseapp.com",
  projectId: "cinchintervalstaffingrep",
  messagingSenderId: "137246401526",
  appId: "1:137246401526:web:79aca486c44fee685fddd7"
});

const messaging = firebase.messaging();

// Con payload.notification, el navegador ya muestra la notificación solo.
// Solo mostramos manualmente si el mensaje llega sin ese bloque (mensaje de datos).
messaging.onBackgroundMessage(function(payload) {
  if (payload.notification) return;
  const data = payload.data || {};
  self.registration.showNotification(data.title || 'Interval staffing', {
    body: data.body || '',
    icon: '/favicon.ico'
  });
});
