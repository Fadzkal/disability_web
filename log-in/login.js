// login.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(item => {
  item.addEventListener('click', function() {
      const target = document.getElementById(this.getAttribute('data-target'));
      if (target.type === 'password') {
          target.type = 'text';
          this.src = '/src/images/visible.png'; // change to show image
      } else {
          target.type = 'password';
          this.src = '/src/images/hide.png'; // change to hide image
      }
  });
});

// Placeholder behavior
const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.placeholder = '';
    });
    input.addEventListener('blur', () => {
        if (input.id === 'email') input.placeholder = 'Email';
        if (input.id === 'password') input.placeholder = 'Password';
    });
});

// Remember me functionality
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('remember-me');

if (localStorage.getItem('rememberMe') === 'true') {
    emailInput.value = localStorage.getItem('email');
    passwordInput.value = localStorage.getItem('password');
    rememberMeCheckbox.checked = true;
}

document.querySelector('.rectangle-button').addEventListener('click', async (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (rememberMeCheckbox.checked) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('rememberMe', true);
    } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
    }

    try {
        // Sign in the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        document.getElementById('message').textContent = "Login berhasil!";

        // Fetch documents from Firestore
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Assuming only one document matches
            const docData = querySnapshot.docs[0].data();
            const documentId = querySnapshot.docs[0].id; // This ID can be used to fetch NIK or other data

            // Save email or other info in localStorage if needed
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userNIK', docData.nik); // Save NIK if needed

            // Redirect to the specific page
            window.location.href = "/landing-page-in.html";
        } else {
            document.getElementById('message').textContent = "No matching user found in Firestore.";
        }
    } catch (error) {
        const errorMessage = error.message;
        document.getElementById('message').textContent = "Error: " + errorMessage;
    }
});
