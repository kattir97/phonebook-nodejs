const { firestore } = require("firebase-admin");
const fs = require("fs");
const { db } = require("../firebase");
// let persons = JSON.parse(fs.readFileSync(`${__dirname}/../db.json`));

exports.checkId = async (req, res, next) => {
  const snapshot = await db.collection("contacts").get();
  const persons = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  if (!persons.find((e) => e.id == req.params.id)) {
    return res.status(404).json({
      status: "fail",
      message: "Contact with such id does not exist",
    });
  }

  next();
};

exports.checkBody = async (req, res, next) => {
  const snapshot = await db.collection("contacts").get();
  const persons = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  if (persons.find((e) => e.name === req.body.name || e.number === req.body.number)) {
    return res.status(404).json({
      status: "fail",
      message: "Contact with such name or number already exists!",
    });
  }

  next();
};

exports.getAllPersons = async (req, res) => {
  const contactsRef = db.collection("contacts");
  const snapshot = await contactsRef.get();
  const persons = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  res.send(persons);
};

exports.getPerson = async (req, res) => {
  const id = req.params.id;
  const contactRef = db.collection("contacts").doc(id);
  const doc = await contactRef.get();
  const person = { id: doc.id, ...doc.data() };
  res.status(200).send(person);
};

exports.deletePerson = async (req, res) => {
  const id = req.params.id;
  await db.collection("contacts").doc(id).delete();
  res.send(null);
};

exports.createPerson = async (req, res) => {
  const newPerson = req.body;
  await db.collection("contacts").add(newPerson);
  res.send(newPerson);
};

exports.updatePerson = async (req, res) => {
  const updatedPerson = req.body;
  console.log("ID:", req.params.id);
  await db.collection("contacts").doc(req.params.id).set(updatedPerson);
  res.send(updatedPerson);
};
