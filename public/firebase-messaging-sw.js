importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDEc7yDOP9Hhi86_IxSDSf-b3cGwbvPp8k",
  authDomain: "cinchintervalstaffingrep.firebaseapp.com",
  projectId: "cinchintervalstaffingrep",
  messagingSenderId: "137246401526",
  appId: "1:137246401526:web:79aca486c44fee685fddd7"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: '/favicon.ico'
    }
  );
});
