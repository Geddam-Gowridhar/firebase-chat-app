<<<<<<< HEAD
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// Firebase configuration
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
const app = initializeApp(firebaseConfig); // Removed duplicate declaration
const auth = getAuth(app);
const database = getDatabase(app);

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  console.log('onAuthStateChanged triggered');
  if (user) {
    console.log('User is signed in:', user);
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('chat-section').style.display = 'block';
    loadMessages();
  } else {
    console.log('No user is signed in.');
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('chat-section').style.display = 'none';
  }
});

// Register a new user
window.registerUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User signed up:', userCredential.user);
    })
    .catch((error) => {
      alert('Error signing up: ' + error.message);
    });
};

// Sign in an existing user
window.signInUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User signed in:', userCredential.user);
    })
    .catch((error) => {
      alert('Error signing in: ' + error.message);
    });
};

// Send a message
window.sendMessage = () => {
  const message = document.getElementById('messageInput').value;
  const user = auth.currentUser;
  if (!user) return;

  if (message.trim() !== '') {
    push(ref(database, 'messages'), {
      uid: user.uid,
      email: user.email,
      text: message,
      timestamp: Date.now()
    }).catch((error) => {
      alert('Error sending message: ' + error.message);
    });
    document.getElementById('messageInput').value = '';
  }
};

// Load messages
const loadMessages = () => {
  const messagesRef = ref(database, 'messages');
  onChildAdded(messagesRef, (snapshot) => {
    const msg = snapshot.val();
    if (msg) {
      const msgDiv = document.createElement('div');
      msgDiv.style.marginBottom = '0.5rem'; // Inline style equivalent to 'mb-2'
      msgDiv.innerHTML = `
        <span class="text-gray-600 text-xs">${new Date(msg.timestamp).toLocaleTimeString()} - ${msg.email}:</span>
        <span>${msg.text}</span>
      `;
      const messagesContainer = document.getElementById('messages');
      if (messagesContainer) {
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  });
};
=======
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
>>>>>>> e36cd6e0dae195758c7df2e1e43c39bd5d0906ae
