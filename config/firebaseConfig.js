const firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyDu7QkjRurssuq4ccDi-QqUBKUjq1Ha_dA",
  authDomain: "enazam-e66bb.firebaseapp.com",
  projectId: "enazam-e66bb",
  storageBucket: "enazam-e66bb.appspot.com",
  messagingSenderId: "171646677456",
  appId: "1:171646677456:web:8cc81f96870c14b87e09d5"
};

const app = firebase.initializeApp(firebaseConfig);

module.exports = app;