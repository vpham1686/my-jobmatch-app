import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCmzYLNtawCh6RF6U5NA9IKtrKbk4tnAaQ",
  authDomain: "jobble-9b1f9.firebaseapp.com",
  projectId: "jobble-9b1f9",
  storageBucket: "jobble-9b1f9.appspot.com",
  messagingSenderId: "200803966715",
  appId: "1:200803966715:web:383736c6990f098b3a1a5e",
  measurementId: "G-YXD45XGQTW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
