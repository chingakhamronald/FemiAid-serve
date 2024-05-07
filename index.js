const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const serviceAccount = require("./permission.json");
const MedicalRouter = require("./app/medicals/router");
const SchemeRouter = require("./app/schemes/router");
const DoctorRouter = require("./app/doctors/router");
const EmergencyRouter = require("./app/emergency/router");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://femiaids-default-rtdb.firebaseio.com/",
});

const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors({ origin: true }));

app.use("/api/medical", MedicalRouter);
app.use("/api/scheme", SchemeRouter);
app.use("/api/doctor", DoctorRouter);
app.use("/api/emergency", EmergencyRouter);

exports.app = onRequest(app);
