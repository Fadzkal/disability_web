const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, writeBatch } = require('firebase/firestore');

// Firebase configuration
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
const db = getFirestore(app);

// User data
const users = [
    { "email": "user1@example.com", "nama": "User One", "nik": "1234567890123456", "registrationTimestamp": "2024-06-18T12:00:00Z" },
    { "email": "user2@example.com", "nama": "User Two", "nik": "2345678901234567", "registrationTimestamp": "2024-06-18T12:01:00Z" },
    { "email": "user3@example.com", "nama": "User Three", "nik": "3456789012345678", "registrationTimestamp": "2024-06-18T12:02:00Z" },
    { "email": "user4@example.com", "nama": "User Four", "nik": "4567890123456789", "registrationTimestamp": "2024-06-18T12:03:00Z" },
    { "email": "user5@example.com", "nama": "User Five", "nik": "5678901234567890", "registrationTimestamp": "2024-06-18T12:04:00Z" },
    { "email": "user6@example.com", "nama": "User Six", "nik": "6789012345678901", "registrationTimestamp": "2024-06-18T12:05:00Z" },
    { "email": "user7@example.com", "nama": "User Seven", "nik": "7890123456789012", "registrationTimestamp": "2024-06-18T12:06:00Z" },
    { "email": "user8@example.com", "nama": "User Eight", "nik": "8901234567890123", "registrationTimestamp": "2024-06-18T12:07:00Z" },
    { "email": "user9@example.com", "nama": "User Nine", "nik": "9012345678901234", "registrationTimestamp": "2024-06-18T12:08:00Z" },
    { "email": "user10@example.com", "nama": "User Ten", "nik": "0123456789012345", "registrationTimestamp": "2024-06-18T12:09:00Z" },
    { "email": "user11@example.com", "nama": "User Eleven", "nik": "1123456789012345", "registrationTimestamp": "2024-06-18T12:10:00Z" },
    { "email": "user12@example.com", "nama": "User Twelve", "nik": "2123456789012345", "registrationTimestamp": "2024-06-18T12:11:00Z" },
    { "email": "user13@example.com", "nama": "User Thirteen", "nik": "3123456789012345", "registrationTimestamp": "2024-06-18T12:12:00Z" },
    { "email": "user14@example.com", "nama": "User Fourteen", "nik": "4123456789012345", "registrationTimestamp": "2024-06-18T12:13:00Z" },
    { "email": "user15@example.com", "nama": "User Fifteen", "nik": "5123456789012345", "registrationTimestamp": "2024-06-18T12:14:00Z" },
    { "email": "user16@example.com", "nama": "User Sixteen", "nik": "6123456789012345", "registrationTimestamp": "2024-06-18T12:15:00Z" },
    { "email": "user17@example.com", "nama": "User Seventeen", "nik": "7123456789012345", "registrationTimestamp": "2024-06-18T12:16:00Z" },
    { "email": "user18@example.com", "nama": "User Eighteen", "nik": "8123456789012345", "registrationTimestamp": "2024-06-18T12:17:00Z" },
    { "email": "user19@example.com", "nama": "User Nineteen", "nik": "9123456789012345", "registrationTimestamp": "2024-06-18T12:18:00Z" },
    { "email": "user20@example.com", "nama": "User Twenty", "nik": "0213456789012345", "registrationTimestamp": "2024-06-18T12:19:00Z" },
    { "email": "user21@example.com", "nama": "User Twenty-One", "nik": "1213456789012345", "registrationTimestamp": "2024-06-18T12:20:00Z" },
    { "email": "user22@example.com", "nama": "User Twenty-Two", "nik": "2213456789012345", "registrationTimestamp": "2024-06-18T12:21:00Z" },
    { "email": "user23@example.com", "nama": "User Twenty-Three", "nik": "3213456789012345", "registrationTimestamp": "2024-06-18T12:22:00Z" },
    { "email": "user24@example.com", "nama": "User Twenty-Four", "nik": "4213456789012345", "registrationTimestamp": "2024-06-18T12:23:00Z" },
    { "email": "user25@example.com", "nama": "User Twenty-Five", "nik": "5213456789012345", "registrationTimestamp": "2024-06-18T12:24:00Z" },
    { "email": "user26@example.com", "nama": "User Twenty-Six", "nik": "6213456789012345", "registrationTimestamp": "2024-06-18T12:25:00Z" },
    { "email": "user27@example.com", "nama": "User Twenty-Seven", "nik": "7213456789012345", "registrationTimestamp": "2024-06-18T12:26:00Z" },
    { "email": "user28@example.com", "nama": "User Twenty-Eight", "nik": "8213456789012345", "registrationTimestamp": "2024-06-18T12:27:00Z" },
    { "email": "user29@example.com", "nama": "User Twenty-Nine", "nik": "9213456789012345", "registrationTimestamp": "2024-06-18T12:28:00Z" },
    { "email": "user30@example.com", "nama": "User Thirty", "nik": "0312456789012345", "registrationTimestamp": "2024-06-18T12:29:00Z" },
    { "email": "user31@example.com", "nama": "User Thirty-One", "nik": "1312456789012345", "registrationTimestamp": "2024-06-18T12:30:00Z" },
    { "email": "user32@example.com", "nama": "User Thirty-Two", "nik": "2312456789012345", "registrationTimestamp": "2024-06-18T12:31:00Z" },
    { "email": "user33@example.com", "nama": "User Thirty-Three", "nik": "3312456789012345", "registrationTimestamp": "2024-06-18T12:32:00Z" },
    { "email": "user34@example.com", "nama": "User Thirty-Four", "nik": "4312456789012345", "registrationTimestamp": "2024-06-18T12:33:00Z" },
    { "email": "user35@example.com", "nama": "User Thirty-Five", "nik": "5312456789012345", "registrationTimestamp": "2024-06-18T12:34:00Z" },
    { "email": "user36@example.com", "nama": "User Thirty-Six", "nik": "6312456789012345", "registrationTimestamp": "2024-06-18T12:35:00Z" },
    { "email": "user37@example.com", "nama": "User Thirty-Seven", "nik": "7312456789012345", "registrationTimestamp": "2024-06-18T12:36:00Z" },
    { "email": "user38@example.com", "nama": "User Thirty-Eight", "nik": "8312456789012345", "registrationTimestamp": "2024-06-18T12:37:00Z" },
    { "email": "user39@example.com", "nama": "User Thirty-Nine", "nik": "9312456789012345", "registrationTimestamp": "2024-06-18T12:38:00Z" },
    { "email": "user40@example.com", "nama": "User Forty", "nik": "0412356789012345", "registrationTimestamp": "2024-06-18T12:39:00Z" },
    { "email": "user41@example.com", "nama": "User Forty-One", "nik": "1412356789012345", "registrationTimestamp": "2024-06-18T12:40:00Z" },
    { "email": "user42@example.com", "nama": "User Forty-Two", "nik": "2412356789012345", "registrationTimestamp": "2024-06-18T12:41:00Z" },
    { "email": "user43@example.com", "nama": "User Forty-Three", "nik": "3412356789012345", "registrationTimestamp": "2024-06-18T12:42:00Z" },
    { "email": "user44@example.com", "nama": "User Forty-Four", "nik": "4412356789012345", "registrationTimestamp": "2024-06-18T12:43:00Z" },
    { "email": "user45@example.com", "nama": "User Forty-Five", "nik": "5412356789012345", "registrationTimestamp": "2024-06-18T12:44:00Z" },
    { "email": "user46@example.com", "nama": "User Forty-Six", "nik": "6412356789012345", "registrationTimestamp": "2024-06-18T12:45:00Z" },
    { "email": "user47@example.com", "nama": "User Forty-Seven", "nik": "7412356789012345", "registrationTimestamp": "2024-06-18T12:46:00Z" },
    { "email": "user48@example.com", "nama": "User Forty-Eight", "nik": "8412356789012345", "registrationTimestamp": "2024-06-18T12:47:00Z" },
    { "email": "user49@example.com", "nama": "User Forty-Nine", "nik": "9412356789012345", "registrationTimestamp": "2024-06-18T12:48:00Z" },
    { "email": "user50@example.com", "nama": "User Fifty", "nik": "0512346789012345", "registrationTimestamp": "2024-06-18T12:49:00Z" }
];

async function addUsers() {
  const batch = writeBatch(db);
  users.forEach((user, index) => {
    const userRef = doc(db, 'users', `user${index + 1}`);
    batch.set(userRef, user);
  });

  await batch.commit();
  console.log('All users have been added to Firestore');
}

addUsers().catch(console.error);
