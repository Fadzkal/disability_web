// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYQ9CqFLGwHfJXUEYGZTocX2V_esEVDyw",
    authDomain: "websitedatabasetest.firebaseapp.com",
    projectId: "websitedatabasetest",
    storageBucket: "websitedatabasetest.appspot.com",
    messagingSenderId: "1066826882782",
    appId: "1:1066826882782:web:433a1038a8f4c5a36a2c4f",
    measurementId: "G-3DBL7775CX",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Function to add a new user to Firestore
function addUser(data) {
    // Use email as the document ID
    db.collection("users").doc(data.email).set(data)
    .then(() => {
        console.log("User added successfully");
        document.getElementById("message").textContent = "User successfully added!";
    })
    .catch((error) => {
        console.error("Error adding user: ", error);
        document.getElementById("message").textContent = "Error adding user: " + error.message;
    });
}

// Form submission handler
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form values
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const disabilityType = document.getElementById("disabilityType").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
    const disability = document.getElementById("disability").value;
    const otherDisabilityDescription = document.getElementById("otherDisabilityDescription").value;
    const usia = document.getElementById("usia").value;
    const organisation = document.getElementById("organisation").value;
    const otherOrganisationDescription = document.getElementById("otherOrganisationDescription").value;
    const accommodation = document.getElementById("accommodation").value;

    // Prepare user data
    const userData = {
        fullName,
        email,
        phone,
        disabilityType,
        gender,
        disability,
        otherDisabilityDescription,
        usia,
        organisation,
        otherOrganisationDescription,
        accommodation
    };

    // Add the user to Firestore
    addUser(userData);

    // Clear the form
    document.getElementById("registrationForm").reset();
});
