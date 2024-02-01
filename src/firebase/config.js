
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCw8GJlo9B3gxAZWmXQmSv4wsnTTAIDmjA",
  authDomain: "miniblog-ec7fe.firebaseapp.com",
  projectId: "miniblog-ec7fe",
  storageBucket: "miniblog-ec7fe.appspot.com",
  messagingSenderId: "597651828776",
  appId: "1:597651828776:web:85efa27fcc0b7e5433851d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Data Bank

const db = getFirestore(app)

export {db}