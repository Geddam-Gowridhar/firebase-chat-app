// Import only what you use
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA6WgJMH6PgA9lr-EMVUIMwISqhra97NpA",
  authDomain: "chatapp-5efd4.firebaseapp.com",
  projectId: "chatapp-5efd4",
  storageBucket: "chatapp-5efd4.appspot.com",
  messagingSenderId: "920573589411",
  appId: "1:920573589411:web:bc7b4f1c7b94cd9bfa8c16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
