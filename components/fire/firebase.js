// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Database, getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6Dk-N7Zn92BPIjV-vbdGjFD5Z3-3XVsA",
  authDomain: "healthygym2024.firebaseapp.com",
  databaseURL: "https://healthygym2024-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "healthygym2024",
  storageBucket: "healthygym2024.firebasestorage.app",
  messagingSenderId: "865233300515",
  appId: "1:865233300515:web:7df94eb400bba478319596"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db=getDatabase(app)
// console.log(db)
export const db=getFirestore(app)
export const dbadmin=getDatabase(app)
export const auth=getAuth();
export default app