// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get HTML elements
const registrationForm = document.getElementById("registrationForm");
const messageDiv = document.getElementById("message");

// Add event listener to the form submit event
registrationForm.addEventListener("click", async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Form validation
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const disabilityType = document.getElementById('disabilityType').value;
    const disability = document.getElementById('disability').value;
    const usia = document.getElementById('usia').value;
    const organisation = document.getElementById('organisation').value;
    const accommodation = document.getElementById('accommodation').value;

    if (!fullName || !phone || !disabilityType || !disability || !usia || !organisation || !accommodation) {
        messageDiv.textContent = "Harap lengkapi semua kolom yang diperlukan.";
        return;
    }

    // Get email from localStorage
    const email = localStorage.getItem('userEmail');
    if (!email) {
        messageDiv.textContent = "Email tidak ditemukan. Silakan login terlebih dahulu.";
        return;
    }

    // Prepare form data
    const formData = {
        fullName: fullName,
        email: email,
        phone: phone,
        disabilityType: disabilityType,
        gender: document.querySelector('input[name="gender"]:checked')?.value || '',
        disability: disability,
        otherDisabilityDescription: document.getElementById('otherDisabilityDescription').value,
        usia: usia,
        organisation: organisation,
        otherOrganisationDescription: document.getElementById('otherOrganisationDescription').value,
        accommodation: accommodation
    };

    try {
        // Check if the email already exists in Firestore
        const docRef = doc(db, 'users', email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Email exists, update the existing document in 'Personal data' collection
            const personalDataRef = doc(docRef, 'Personal data', 'info');
            await setDoc(personalDataRef, formData, { merge: true });
            messageDiv.textContent = "Data berhasil diperbarui di database.";
        } else {
            // Email does not exist, create a new document in 'Personal data' collection
            await setDoc(docRef, { email: email }); // Create user document with email
            const personalDataRef = doc(docRef, 'Personal data', 'info');
            await setDoc(personalDataRef, formData);
            messageDiv.textContent = "Data berhasil disimpan ke database.";
        }

        registrationForm.reset(); // Reset form after success
    } catch (error) {
        console.error("Error updating document: ", error);
        messageDiv.textContent = "Terjadi kesalahan saat menyimpan data.";
    }
});

// Clear message on form input change
registrationForm.addEventListener('input', function() {
    messageDiv.textContent = '';
});
