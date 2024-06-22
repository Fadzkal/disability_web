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
const { doc, setDoc } = firebase.firestore;

document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Generate a unique document ID (Optional)
    // const documentId = db.collection('Form pendaftaran').doc().id;

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

    // Jika ada file yang diunggah, simpan hanya nama file
    if (additionalDocuments.length > 0) {
        for (let i = 0; i < additionalDocuments.length; i++) {
            additionalDocsArray.push(additionalDocuments[i].name);
        }
    }

    try {
        // Menyimpan data pendaftaran beasiswa dalam koleksi 'Form pendaftaran' dengan dokumen yang memiliki nama sebagai ID
        await setDoc(doc(db, 'Form pendaftaran', fullName), {
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
        });

        // Reset form setelah data berhasil disimpan
        document.getElementById('message').innerText = "Pendaftaran berhasil.";
        document.getElementById('registrationForm').reset();
    } catch (error) {
        // Tangani kesalahan jika penyimpanan data gagal
        document.getElementById('message').innerText = "Terjadi kesalahan: " + error.message;
    }
});
