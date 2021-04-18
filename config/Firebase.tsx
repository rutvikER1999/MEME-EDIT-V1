import firebase from 'firebase';
import "firebase/auth";
require('firebase/firestore')
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCcVVoWO2FR0ax-b0GEgvtgDdU2p6hcD28",
  authDomain: "meme-edit.firebaseapp.com",
  projectId: "meme-edit",
  storageBucket: "meme-edit.appspot.com",
  messagingSenderId: "891905621255",
  appId: "1:891905621255:web:b38c9e930ac674cf57d9a2"
};
  // Initialize Firebase

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db;