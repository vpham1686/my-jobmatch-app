const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const firebase = require("firebase/app");
require("firebase/auth");
require("dotenv").config();

// Replace with your own Firebase service account and config
const serviceAccount = { /* your service account object */ };
const firebaseConfig = { /* your firebase config object */ };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jobble-9b1f9.firebaseio.com",
});

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Sign up route
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await admin.auth().createUser({ email, password });
    res.status(201).send({ message: "User created successfully", uid: user.uid });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Sign in route
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    res.status(200).send({ message: "User signed in successfully", uid: user.uid });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// User profile route
app.get("/profile", async (req, res) => {
  try {
    const uid = req.query.uid;
    const user = await admin.auth().getUser(uid);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update user profile route
app.put("/profile", async (req, res) => {
  try {
    const { uid, displayName, photoURL } = req.body;
    const user = await admin.auth().updateUser(uid, { displayName, photoURL });
    res.status(200).send({ message: "User profile updated successfully", user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete user route
app.delete("/profile", async (req, res) => {
  try {
    const uid = req.query.uid;
    await admin.auth().deleteUser(uid);
    res.status(200).send({ message: "User profile deleted successfully" });
    } catch (error) {
    res.status(400).send({ message: error.message });
    }
    });
    
    app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    });

