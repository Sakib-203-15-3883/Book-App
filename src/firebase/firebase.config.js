// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdAKarwNWbGfMzQL8uNyglwxryD1a0ZKs",
  authDomain: "bookapp-8cb3f.firebaseapp.com",
  projectId: "bookapp-8cb3f",
  storageBucket: "bookapp-8cb3f.appspot.com",
  messagingSenderId: "483357606063",
  appId: "1:483357606063:web:d64d16e3d0cb2288e6d45a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;