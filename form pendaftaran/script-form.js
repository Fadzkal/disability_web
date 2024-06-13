document.getElementById('themeToggle').addEventListener('click', function() {
    document.documentElement.classList.toggle('dark');
});

// Tambahkan validasi form seperti yang telah diimplementasikan sebelumnya
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const disabilityType = document.getElementById('disabilityType').value;
    const country = document.getElementById('country').value;
    const gender = document.getElementById('gender').value;
    const disability = document.getElementById('disability').value;
    const otherDisabilityDescription = document.getElementById('otherDisabilityDescription').value;
    const age = document.getElementById('age').value;
    const indigenous = document.getElementById('indigenous').value;
    const organisation = document.getElementById('organisation').value;
    const otherOrganisationDescription = document.getElementById('otherOrganisationDescription').value;
    const accommodation = document.getElementById('accommodation').value;

    // Check if mandatory fields are filled
    if (fullName && email && phone && disabilityType && country && gender && disability && age && indigenous && organisation) {
        alert('Pendaftaran berhasil! Terima kasih telah mendaftar.');
        // Proses lebih lanjut seperti mengirim data ke server bisa dilakukan di sini.
    } else {
        alert('Mohon isi semua bidang yang wajib.');
    }
});
