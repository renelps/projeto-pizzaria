import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyCuT_FrIf5QAn_xpFMWAFRhnCJMnFS7RVo',
  authDomain: 'pizzaria-3ee94.firebaseapp.com',
  projectId: 'pizzaria-3ee94',
  storageBucket: 'pizzaria-3ee94.firebasestorage.app',
  messagingSenderId: '642111113721',
  appId: '1:642111113721:web:3625e22586927515dbd528',
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const emailProvider = new EmailAuthProvider();

export { auth, googleProvider, emailProvider };
