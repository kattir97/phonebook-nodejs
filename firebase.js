const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore");

const serviceAccout = require("./phonebook-creds.json");

initializeApp({
  credential: cert(serviceAccout),
});

const db = getFirestore();

module.exports = { db };
