importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
var firebaseConfig = {
    apiKey: "AIzaSyAYLNGOWZtYLE0zS4nqVTVkvfilQ0QAraM",
    authDomain: "winnerenglish2-e0f1b.firebaseapp.com",
    databaseURL: "https://winnerenglish2-e0f1b.firebaseio.com",
    projectId: "winnerenglish2-e0f1b",
    storageBucket: "winnerenglish2-e0f1b.appspot.com",
    messagingSenderId: "771031700651",
    appId: "1:771031700651:web:a7f06b7595c5539a7b13ee",
    measurementId: "G-HW612TDMZF",
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

let messaging = null

if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging()

    messaging.onBackgroundMessage((payload) => {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        // Customize notification here
        const notificationTitle = payload.notification.title
        const notificationOptions = payload.notification

        self.registration.showNotification(notificationTitle,
            notificationOptions);
    });
}