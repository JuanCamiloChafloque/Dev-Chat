import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCfZp63wr_2VB0QmTTIPFxjNfgeP3m0WwQ",
  authDomain: "devchat-9c9c0.firebaseapp.com",
  projectId: "devchat-9c9c0",
  storageBucket: "devchat-9c9c0.appspot.com",
  messagingSenderId: "51841725266",
  appId: "1:51841725266:web:a204174fa4d7607a0a808b",
  measurementId: "G-9VHRH4SJGF",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
