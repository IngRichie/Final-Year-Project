import { getApps, initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFWNcAqQ_4UzWLKt7-6JovmJ_V28_AcV8",
  authDomain: "campcare-93295.firebaseapp.com",
  projectId: "campcare-93295",
  storageBucket: "campcare-93295.appspot.com",
  messagingSenderId: "549195152079",
  appId: "1:549195152079:web:8a83fe303fa6e30cdad5ba"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db: Firestore = getFirestore();

// Initialize Auth and set persistence
const auth: Auth = getAuth();
auth.setPersistence(browserLocalPersistence);

export { auth, db };