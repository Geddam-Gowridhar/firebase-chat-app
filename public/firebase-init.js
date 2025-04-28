import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6WgJMH6PgA9lr-EMVUIMwISqhra97NpA",
  authDomain: "chatapp-5efd4.firebaseapp.com",
  databaseURL: "https://chatapp-5efd4-default-rtdb.firebaseio.com",
  projectId: "chatapp-5efd4",
  storageBucket: "chatapp-5efd4.appspot.com",
  messagingSenderId: "920573589411",
  appId: "1:920573589411:web:bc7b4f1c7b94cd9bfa8c16",
  measurementId: "G-0P762496P1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const loginForm = document.getElementById("loginForm");
const loginDiv = document.getElementById("loginDiv");
const chatDiv = document.getElementById("chatDiv");
const loginMsg = document.getElementById("loginMessage");
const welcomeMsg = document.getElementById("welcomeMsg");
const messageInput = document.getElementById("messageInput");
const messagesList = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Authentication State Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Redirect to chat view
    loginDiv.style.display = "none";
    chatDiv.style.display = "block";
    welcomeMsg.textContent = `Welcome, ${user.email}`;

    // Load messages in real-time
    const q = collection(db, "messages");
    onSnapshot(q, (snapshot) => {
      messagesList.innerHTML = "";
      snapshot.forEach((doc) => {
        const msg = doc.data();
        const li = document.createElement("li");
        li.textContent = `${msg.email}: ${msg.text}`;
        messagesList.appendChild(li);
      });
    });
  } else {
    // Redirect to login view
    loginDiv.style.display = "block";
    chatDiv.style.display = "none";
  }
});

// Login Function
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the form from reloading the page
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginMsg.textContent = "✅ Logged in!";
    loginForm.reset();
  } catch (err) {
    loginMsg.textContent = `❌ ${err.message}`;
  }
});

// Register User Function
window.registerUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("User registered successfully!");
    })
    .catch((error) => {
      alert("Error registering user: " + error.message);
    });
};

// Send Message Function
sendBtn.addEventListener("click", async () => {
  const text = messageInput.value.trim();
  const user = auth.currentUser;
  if (text && user) {
    await addDoc(collection(db, "messages"), {
      email: user.email,
      text,
      timestamp: serverTimestamp()
    });
    messageInput.value = "";
  }
});

// Logout Function
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log("User logged out");
  });
});

// Test Firebase Connectivity
console.log("Testing Firebase Connectivity...");
console.log("Auth Instance:", auth);
console.log("Firestore Instance:", db);

// Test Firestore Read
const testCollection = collection(db, "test");
onSnapshot(testCollection, (snapshot) => {
  console.log("Firestore is connected. Snapshot received:", snapshot.docs.map(doc => doc.data()));
}, (error) => {
  console.error("Firestore connection error:", error.message);
});
