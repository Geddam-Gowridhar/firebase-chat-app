const messagesRef = db.collection("messages");

function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

function signOut() {
  auth.signOut();
}

auth.onAuthStateChanged(user => {
  const chatDiv = document.getElementById("chat");
  const userInfo = document.getElementById("user-info");

  if (user) {
    chatDiv.style.display = "block";
    userInfo.textContent = `Logged in as: ${user.displayName}`;
    listenForMessages();
  } else {
    chatDiv.style.display = "none";
    userInfo.textContent = "Not signed in";
  }
});

function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value;

  if (text.trim() === "") return;

  messagesRef.add({
    text: text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    uid: auth.currentUser.uid,
    name: auth.currentUser.displayName
  });

  input.value = "";
}

function listenForMessages() {
  messagesRef.orderBy("timestamp")
    .onSnapshot(snapshot => {
      const messagesUl = document.getElementById("messages");
      messagesUl.innerHTML = "";
      snapshot.forEach(doc => {
        const msg = doc.data();
        const li = document.createElement("li");
        li.textContent = `${msg.name}: ${msg.text}`;
        messagesUl.appendChild(li);
      });
    });
}
