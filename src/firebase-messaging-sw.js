// importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js");

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyC5dA_afnY3Psp55WOibvGPO5mXk5fIYGU",
  authDomain: "ibnb-commum.firebaseapp.com",
  projectId: "ibnb-commum",
  storageBucket: "ibnb-commum.appspot.com",
  messagingSenderId: "93614175371",
  appId: "1:93614175371:web:d36b4faf2f07fcbf49d08e",
  measurementId: "G-FDB5BKH636"
});
// Initialize Firebase

var messaging = firebase.messaging();


// firebase.analytics();
