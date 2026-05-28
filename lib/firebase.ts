import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  Auth,
} from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Cek apakah kita memiliki API Key
const hasConfig = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== "";

let app: FirebaseApp;
if (getApps().length > 0) {
  app = getApp();
} else if (hasConfig) {
  app = initializeApp(firebaseConfig);
} else {
  // Jika sedang build dan tidak ada key, buat object mock agar tidak crash
  app = { name: "MOCK" } as unknown as FirebaseApp;
}

const auth = hasConfig && app.name !== "MOCK" ? getAuth(app) : null as unknown as Auth;
const db = hasConfig && app.name !== "MOCK" ? getFirestore(app) : null as unknown as Firestore;
const googleProvider = new GoogleAuthProvider();

// --- Akhir bagian yang diubah ---

export {
  app,
  auth,
  db,
  googleProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
};

