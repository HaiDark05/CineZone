const admin = require("firebase-admin");

// Lấy JSON từ environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://moviesproject-16df3-default-rtdb.firebaseio.com"
});

const db = admin.firestore();      // Firestore
const chat = admin.database();     // Realtime Database

module.exports = { chat, db };
