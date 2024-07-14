// firebaseAdmin.js
import admin from 'firebase-admin';

// Initialize Firebase Admin with your service account
const serviceAccount = require('./serviceAccountKey.json'); 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;