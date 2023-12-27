// Import the functions you need from the SDKs you need
import { initializeApp,getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "netflix-clone-f52a8.firebaseapp.com",
  projectId: "netflix-clone-f52a8",
  storageBucket: "netflix-clone-f52a8.appspot.com",
  messagingSenderId: "417685565363",
  appId: "1:417685565363:web:b87691000d02ec38d365c6",
  measurementId: "G-G0N7VM8P5D"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// we want to have only one instance of firebase initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db =   getFirestore()
const auth = getAuth()

export default app
export {auth, db}