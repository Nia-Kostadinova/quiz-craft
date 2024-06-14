import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDXCjjm4dn8tWwrhUjb_ZA6Mb-R7D6Nf3c",
  authDomain: "art-quest-f6d45.firebaseapp.com",
  projectId: "art-quest-f6d45",
  storageBucket: "art-quest-f6d45.appspot.com",
  messagingSenderId: "8584576596",
  appId: "1:8584576596:web:3854b36c3404fead5cb7c1",
  measurementId: "G-11NXKSNN3K",
  databaseURL: "https://art-quest-f6d45-default-rtdb.europe-west1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig);

// the Firebase authentication handler
export const auth = getAuth(app);

// the Realtime Database handler
export const db = getDatabase(app);