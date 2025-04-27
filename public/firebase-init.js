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
