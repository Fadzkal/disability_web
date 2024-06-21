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
const db = firebase.firestore();

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Get the current logged-in user's email or NIK from localStorage
    const userEmail = localStorage.getItem('userEmail');
    const userNIK = localStorage.getItem('userNIK');

    // Form field values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const usia = document.getElementById('usia').value;
    const address = document.getElementById('address').value;
    const institution = document.getElementById('institution').value;
    const major = document.getElementById('major').value;
    const parentIncome = document.getElementById('parentIncome').value;
    const achievements = document.getElementById('achievements').value;
    const motivation = document.getElementById('motivation').value;
    const parentContact = document.getElementById('parentContact').value;
    const disabilityType = document.getElementById('disabilityType').value;
    const academicNeeds = document.getElementById('academicNeeds').value;
    const specialAccommodation = document.getElementById('specialAccommodation').value;
    
    // Dokumen pendukung tambahan
    const additionalDocuments = document.getElementById('additionalDocuments').files;
    const additionalDocsArray = [];
    for (let i = 0; i < additionalDocuments.length; i++) {
        additionalDocsArray.push(additionalDocuments[i].name); // hanya nama file yang disimpan dalam array
    }

    // Mencari user dengan email atau NIK yang sesuai
    db.collection('users').where('email', '==', userEmail).get()
    .then(querySnapshot => {
        if (querySnapshot.empty) {
            // Jika tidak ada user yang ditemukan berdasarkan email, coba cari berdasarkan NIK
            return db.collection('users').where('nik', '==', userNIK).get();
        }
        return querySnapshot;
    })
    .then(querySnapshot => {
        if (querySnapshot.empty) {
            document.getElementById('message').innerText = "User tidak ditemukan.";
        } else {
            querySnapshot.forEach(doc => {
                const userId = doc.id;

                // Menambahkan data pendaftaran beasiswa ke koleksi users
                db.collection('users').doc(userId).collection('beasiswaApplications').add({
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
                    specialAccommodation: specialAccommodation,
                    additionalDocuments: additionalDocsArray,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    document.getElementById('message').innerText = "Pendaftaran berhasil.";
                    document.getElementById('registrationForm').reset();
                })
                .catch(error => {
                    document.getElementById('message').innerText = "Terjadi kesalahan: " + error.message;
                });
            });
        }
    })
    .catch(error => {
        document.getElementById('message').innerText = "Terjadi kesalahan: " + error.message;
    });
});
