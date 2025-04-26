// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDPeFVgGZHJYSfgKho3z0FKnMZfBx4sjeA",
  authDomain: "fir-chat-app-66747.firebaseapp.com",
  projectId: "fir-chat-app-66747",
  storageBucket: "fir-chat-app-66747.appspot.com",
  messagingSenderId: "768757302927",
  appId: "1:768757302927:web:8ae5865d41442103f7d2fa",
  measurementId: "G-FFBZW106SW"
};

// Initialize
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

// Login Function
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      loginMsg.textContent = "✅ Logged in!";
      loginForm.reset();
    })
    .catch((err) => {
      loginMsg.textContent = `❌ ${err.message}`;
    });
});

// Auth State Change Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginDiv.style.display = "none";
    chatDiv.style.display = "block";
    welcomeMsg.textContent = `Welcome, ${user.email}`;

    const q = query(collection(db, "messages"), orderBy("timestamp"));
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
    loginDiv.style.display = "block";
    chatDiv.style.display = "none";
  }
});

// Send Message
document.getElementById("sendBtn").addEventListener("click", async () => {
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

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth);
});
