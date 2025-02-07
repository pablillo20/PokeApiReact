import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth, GithubAuthProvider } from 'firebase/auth';

export const firebaseApp = initializeApp({
  // your application settings
  apiKey: "AIzaSyB7qlFNZtB3ZrhzTnt93NvHbvwIWYfkKvU",
  authDomain: "pokeapi-890ab.firebaseapp.com",
  projectId: "pokeapi-890ab",
  storageBucket: "pokeapi-890ab.firebasestorage.app",
  messagingSenderId: "1006697104623",
  appId: "1:1006697104623:web:568ae34a7d9d13c8ba071a"
})

const authGit = getAuth(firebaseApp);
const provider = new GithubAuthProvider();

export { authGit,provider};

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export { db };