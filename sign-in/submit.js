// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYQ9CqFLGwHfJXUEYGZTocX2V_esEVDyw",
  authDomain: "websitedatabasetest.firebaseapp.com",
  projectId: "websitedatabasetest",
  storageBucket: "websitedatabasetest.appspot.com",
  messagingSenderId: "1066826882782",
  appId: "1:1066826882782:web:433a1038a8f4c5a36a2c4f",
  measurementId: "G-3DBL7775CX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(item => {
  item.addEventListener('click', function() {
    const target = document.getElementById(this.getAttribute('data-target'));
    if (target.type === 'password') {
      target.type = 'text';
      this.src = '/sign-in/images/hide.png'; // change to hide image
    } else {
      target.type = 'password';
      this.src = '/sign-in/images/show.png'; // change to show image
    }
  });
});

// Event listener for submit button
const submit = document.getElementById("submit");
const messageDiv = document.getElementById("message");

submit.addEventListener("click", async function (event) {
  event.preventDefault();

  const nik = document.getElementById("nik").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const confirmEmail = document.getElementById("confirm-email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Basic validation
  if (email !== confirmEmail) {
    messageDiv.textContent = "Email and confirmation email do not match.";
    return;
  }
  
  if (password !== confirmPassword) {
    messageDiv.textContent = "Password and confirmation password do not match.";
    return;
  }

  try {
    // Log data being sent for debugging
    console.log("Email:", email);
    console.log("Password:", password);

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Log user details for debugging
    console.log("User:", user);

    // Store user data in Firestore
    await setDoc(doc(db, 'users', nik), {
      nik: nik,
      name: name,
      email: user.email,
      registrationTimestamp: new Date()
    });

    messageDiv.textContent = "Akun berhasil dibuat!";
    localStorage.setItem('userEmail', email); // Simpan email pengguna di localStorage
    window.location.href = "/landing-page-in.html"; // Redirect to landing page
  } catch (error) {
    const errorMessage = error.message;
    messageDiv.textContent = "Error: " + errorMessage;
    console.error("Error:", error); // Log the error for debugging
  }
});
