// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0Vaq_9NnHQsHL_ACo_N8pJjRaxt5Wi3Y",
  authDomain: "time-table-maker-b2065.firebaseapp.com",
  projectId: "time-table-maker-b2065",
  storageBucket: "time-table-maker-b2065.appspot.com",
  messagingSenderId: "1056332331740",
  appId: "1:1056332331740:web:42b8df87aa00d8f58f1219"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Function to show messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 5000);
}

// Sign up functionality
const signUpButton = document.getElementById('submitSignUp');
signUpButton.addEventListener('click', (event) => {
  event.preventDefault();
  const fname = document.getElementById('signup-fname').value;
  const lname = document.getElementById('signup-lname').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = { email: email, fname: fname, lname: lname };
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          showMessage('Account Created Successfully', 'signUpMessage');
          setTimeout(() => {
            // Redirect to the homepage after successful signup
            window.location.href = 'https://quizleapsbooks.github.io/Welcome_Quiz_Leap_Books/';
          }, 2000);
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!!', 'signUpMessage');
      } else {
        showMessage('Unable to create User', 'signUpMessage');
      }
    });
});

// Login functionality
const signInButton = document.getElementById('submitSignIn');
signInButton.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('signIn-email').value;
  const password = document.getElementById('signIn-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      showMessage('Logged in Successfully', 'signInMessage');
      // Redirect to the homepage after successful login
      setTimeout(() => {
        window.location.href = 'https://quizleapsbooks.github.io/Welcome_Quiz_Leap_Books/';
      }, 2000);
    })
    .catch((error) => {
      showMessage('Login Failed. Email or Password is incorrect.', 'signInMessage');
    });
});
