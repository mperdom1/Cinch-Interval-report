importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA_6YIfp2ATwEHWGirel4KHCQdtptN1Z2Q",
  authDomain: "cinch-hourly-shrinkage.firebaseapp.com",
  projectId: "cinch-hourly-shrinkage",
  messagingSenderId: "358847105024",
  appId: "1:358847105024:web:b0b4490baf51fa37def0e5"
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
