// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDYQ9CqFLGwHfJXUEYGZTocX2V_esEVDyw",
    authDomain: "websitedatabasetest.firebaseapp.com",
    projectId: "websitedatabasetest",
    storageBucket: "websitedatabasetest.appspot.com",
    messagingSenderId: "1066826882782",
    appId: "1:1066826882782:web:433a1038a8f4c5a36a2c4f",
    measurementId: "G-3DBL7775CX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var storage = firebase.storage();

// Form submission handler
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Fetch form values
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var usia = document.getElementById('usia').value;
    var address = document.getElementById('address').value;
    var institution = document.getElementById('institution').value;
    var major = document.getElementById('major').value;
    var parentIncome = document.getElementById('parentIncome').value;
    var achievements = document.getElementById('achievements').value;
    var motivation = document.getElementById('motivation').value;
    var parentContact = document.getElementById('parentContact').value;
    var disabilityType = document.getElementById('disabilityType').value;
    var academicNeeds = document.getElementById('academicNeeds').value;
    var specialAccommodation = document.getElementById('specialAccommodation').value;
    var additionalDocuments = document.getElementById('additionalDocuments').files;

    // Save data to Firestore under 'users/{userNIK}/pendaftaran_bea'
    var userNIK = localStorage.getItem('userNIK');
    if (!userNIK) {
        showMessage('Gagal menyimpan data: userNIK tidak tersedia.', true);
        return;
    }

    var userDocRef = db.collection('users').doc(userNIK).collection('pendaftaran_bea').doc();

    userDocRef.set({
        fullName: fullName,
        email: email,
        phone: phone,
        gender: gender,
        usia: usia,
        address: address,
        institution: institution,
        major: major,
        parentIncome: parentIncome,
        achievements: achievements,
        motivation: motivation,
        parentContact: parentContact,
        disabilityType: disabilityType,
        academicNeeds: academicNeeds,
        specialAccommodation: specialAccommodation
    })
    .then(function() {
        // Upload additional documents to Firebase Storage if any
        if (additionalDocuments.length > 0) {
            uploadDocuments(userDocRef.id, additionalDocuments);
        } else {
            showMessage('Data berhasil disimpan.');
        }
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        showMessage('Terjadi kesalahan saat menyimpan data.', true);
    });
});

// Function to upload additional documents to Firebase Storage
function uploadDocuments(docId, files) {
    var storageRef = storage.ref();
    var docRef = storageRef.child('additional_documents/' + docId);

    Array.from(files).forEach(function(file) {
        var uploadTask = docRef.child(file.name).put(file);

        uploadTask.on('state_changed', 
            function(snapshot) {
                // Track upload progress (optional)
            }, 
            function(error) {
                console.error('Error uploading file:', error);
                showMessage('Terjadi kesalahan saat mengunggah dokumen.', true);
            }, 
            function() {
                // When upload is complete
                showMessage('Data dan dokumen berhasil disimpan.');
            }
        );
    });
}

// Function to display messages to the user
function showMessage(message, isError = false) {
    var messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.classList.remove('text-red-500', 'text-green-500');
    if (isError) {
        messageElement.classList.add('text-red-500');
    } else {
        messageElement.classList.add('text-green-500');
    }
}