import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdAn_xvLxQ4J1JqLQeBjyJmwtCxp7pAuk",
  authDomain: "new-blog-2696e.firebaseapp.com",
  projectId: "new-blog-2696e",
  storageBucket: "new-blog-2696e.appspot.com",
  messagingSenderId: "914635506767",
  appId: "1:914635506767:web:33beeb619587ee5840163a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
