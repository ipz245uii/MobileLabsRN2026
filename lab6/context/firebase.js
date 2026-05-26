import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCkChfttAmcJ4VEsRJou4DhGFjXu35I5RQ",
  authDomain: "mobilelabsrn2026.firebaseapp.com",
  projectId: "mobilelabsrn2026",
  storageBucket: "mobilelabsrn2026.firebasestorage.app",
  messagingSenderId: "240238277334",
  appId: "1:240238277334:web:472493fbd0fc5ad4454f77",
  measurementId: "G-8LP3BYRCS1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);