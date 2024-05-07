/* eslint-disable camelcase */
const admin = require("firebase-admin");
const uuid = require("uuid");

// CREATE Doctor

module.exports.Post = async (req, res) => {
  const db = admin.firestore();

  try {
    const {name, address, gender, mobile_number, hospital, place, tag} =
      req.body;

    if (
      !name ||
      !gender ||
      !address ||
      !mobile_number ||
      !hospital ||
      !place ||
      !tag
    ) {
      return res.status(400).json({error: "Missing required fields"});
    }
    const id = uuid.v4();

    await db
        .collection("doctor")
        .doc("/" + id + "/")
        .create({
          name: name,
          gender: gender,
          address: address,
          mobile_number: Number(mobile_number),
          hospital: hospital,
          place: place,
          tag: tag,
        });

    return res.status(200).json({message: "Item created successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// GET Doctors

module.exports.Get = async (req, res) => {
  const db = admin.firestore();

  try {
    const query = db.collection("doctor");
    const response = [];
    await query.get().then((res) => {
      const docs = res.docs;
      for (const doc of docs) {
        const selectedItem = {
          id: doc.id,
          name: doc.data().name,
          gender: doc.data().gender,
          hospital: doc.data().hospital,
          place: doc.data().place,
          mobile_number: doc.data().mobile_number,
          tag: doc.data().tag,
        };
        response.push(selectedItem);
      }
    });
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
