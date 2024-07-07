importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

const firebaseConfig = {
        apiKey: "AIzaSyC5nmvBrc3o5DzB1U6zo3kXvnKtw8HlX0c",
        authDomain: "projecthub-1b710.firebaseapp.com",
        projectId: "projecthub-1b710",
        storageBucket: "projecthub-1b710.appspot.com",
        messagingSenderId: "735397157169",
        appId: "1:735397157169:web:d1f669e37f560d5502f810",
        measurementId: "G-CHPW97K56W"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  const taskId = event.notification.data.taskId;
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/task/' + taskId)
  );
});


