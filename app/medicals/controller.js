const admin = require("firebase-admin");
const uuid = require("uuid");

// POST Medical

module.exports.Post = async (req, res) => {
  const db = admin.firestore();
  const {name, img, description, symptoms, treatment} = req.body;
  const id = uuid.v4();

  try {
    if (!name || !img || !description || !symptoms || !treatment) {
      return res.status(400).json({error: "Missing required fields"});
    }

    await db
        .collection("medical")
        .doc("/" + id + "/")
        .create({
          name: name,
          img: img,
          description: description,
          symptoms: symptoms,
          treatment: treatment,
        });

    return res.status(200).json({message: "Item created successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// GET Medicals

module.exports.Get = async (req, res) => {
  const db = admin.firestore();

  try {
    const query = db.collection("medical");
    const response = [];
    await query.get().then((res) => {
      const docs = res.docs;
      for (const doc of docs) {
        const selectedItem = {
          id: doc.id,
          name: doc.data().name,
          img: doc.data().img,
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

// GET BY ID Medical

module.exports.GetById = async (req, res) => {
  const db = admin.firestore();

  const id = req.params.id;

  try {
    const document = db.collection("medical").doc(id);

    const medicalItem = await document.get();
    const doctorSnapshot = await db
        .collection("doctor")
        .where("tag", "==", medicalItem.data().name)
        .get();

    const medicalRecordWithDoctor = {
      id: id,
      name: medicalItem.data().name,
      description: medicalItem.data().description,
      symptoms: medicalItem.data().symptoms,
      treatment: medicalItem.data().treatment,
      doc: [],
    };

    doctorSnapshot.forEach((e) => {
      const doctorData = e.data();
      console.log("e" + e);
      const doctor = {
        id: e.id,
        name: doctorData.name,
        gender: doctorData.gender,
        address: doctorData.address,
        mobile_number: doctorData.mobile_number,
        hospital: doctorData.hospital,
        place: doctorData.place,
      };
      return medicalRecordWithDoctor.doc.push(doctor);
    });

    return res.status(200).send(medicalRecordWithDoctor);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// UPDATE Medical

module.exports.Update = async (req, res) => {
  const db = admin.firestore();

  const id = req.params.id;
  try {
    const document = db.collection("medical").doc(id);
    await document.update({
      name: req.body.name,
      img: req.body.img,
      description: req.body.description,
      symptoms: req.body.symptoms,
      treatment: req.body.treatment,
    });
    return res.status(200).json({message: "Successfully Updated"});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// DELETE Medical

module.exports.Delete = async (req, res) => {
  const db = admin.firestore();

  const id = req.params.id;

  try {
    const document = db.collection("medical").doc(id);
    await document.delete();
    return res.status(200).json({message: "Successfully deleted"});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
