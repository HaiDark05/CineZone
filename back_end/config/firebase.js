const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://moviesproject-16df3-default-rtdb.firebaseio.com"  // Đảm bảo đúng URL của Firebase Realtime Database
});

const db = admin.firestore();  // Sử dụng Realtime Database
const chat = admin.database(); 
module.exports = { chat , db };
