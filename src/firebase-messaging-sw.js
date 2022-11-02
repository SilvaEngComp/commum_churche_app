importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js");

// <script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-analytics.js"></script>

firebase.initializeApp({
    apiKey: 'AIzaSyCYj0n-RKGnGBrI1Lj_2DO46cMKMz7LtCM',
    authDomain: 'systematic-review-456d2.firebaseapp.com',
    projectId: 'systematic-review-456d2',
    storageBucket: 'systematic-review-456d2.appspot.com',
    messagingSenderId: '447649419389',
    appId: '1:447649419389:web:d19e30f463833fda66a114',
    measurementId: 'G-EXX5970YFX'
});
// Initialize Firebase

var messaging = firebase.messaging();


// firebase.analytics();