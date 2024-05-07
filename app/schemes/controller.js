const admin = require("firebase-admin");
const uuid = require("uuid");

// POST Schemes

module.exports.Post = async (req, res) => {
  const db = admin.firestore();

  try {
    const {name, description, url, category} = req.body;

    if (!name || !url || !description || !category) {
      return res.status(400).json({error: "Missing required fields"});
    }
    const id = uuid.v4();

    await db
        .collection("scheme")
        .doc("/" + id + "/")
        .create({
          name: name,
          description: description,
          url: url,
          category: category,
        });

    return res.status(200).json({message: "Item created successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// GET Schemes

module.exports.Get = async (req, res) => {
  const db = admin.firestore();

  try {
    const query = db.collection("scheme");
    const response = [];
    await query.get().then((res) => {
      const docs = res.docs;
      for (const doc of docs) {
        const selectedItem = {
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          url: doc.data().url,
          category: doc.data().category,
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

// UPDATE Scheme

module.exports.Update = async (req, res) => {
  const db = admin.firestore();

  const id = req.params.id;
  try {
    const document = db.collection("scheme").doc(id);
    await document.update({
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
      category: req.body.category,
    });
    return res.status(200).json({message: "Successfully Updated"});
  } catch (error) {
    return res.status(500).send(error);
  }
};

// DELETE Scheme

module.exports.Delete = async (req, res) => {
  const db = admin.firestore();

  const id = req.params.id;
  try {
    const document = db.collection("scheme").doc(id);

    await document.delete();
    return res.status(200).json({message: "Successfully deleted"});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
