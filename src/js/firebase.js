// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV_WsM1EUzG9F42DLPQYp0EkptEK_LWJE",
  authDomain: "noteballs2-74791.firebaseapp.com",
  projectId: "noteballs2-74791",
  storageBucket: "noteballs2-74791.appspot.com",
  messagingSenderId: "154181497870",
  appId: "1:154181497870:web:2c9cc8111643facd94385f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth };
