const admin = require("firebase-admin");
const uuid = require("uuid");

// POST Emergency

module.exports.Post = async (req, res) => {
  const db = admin.firestore();
  const {priority1, priority2, priority3} = req.body;
  const id = uuid.v4();

  try {
    if (!priority1 || !priority2 || !priority3) {
      return res.status(400).json({error: "Missing required fields"});
    }

    await db
        .collection("emergency")
        .doc("/" + id + "/")
        .create({
          priority1: priority1,
          priority2: priority2,
          priority3: priority3,
        });

    return res.status(200).json({message: "Item created successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// GET Emergency

module.exports.Get = async (req, res) => {
  const db = admin.firestore();

  try {
    const query = db.collection("emergency");
    const response = [];
    await query.get().then((res) => {
      const docs = res.docs;
      for (const doc of docs) {
        const selectedItem = {
          id: doc.id,
          priority1: doc.data().priority1,
          priority2: doc.data().priority2,
          priority3: doc.data().priority3,
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

// UPDATE Emergency

module.exports.Update = async (req, res) => {
  const db = admin.firestore();

  const id = req.params.id;
  console.log({"ID....": id});

  try {
    const document = db.collection("emergency").doc(id);
    await document.update({
      priority1: req.body.priority1,
      priority2: req.body.priority2,
      priority3: req.body.priority3,
    });
    return res.status(200).json({message: "Successfully Updated"});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
