const admin = require("firebase-admin");
const uuid = require("uuid");

// CREATE Category

module.exports.Post = async (req, res) => {
  const db = admin.firestore();

  try {
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const id = uuid.v4();

    await db
      .collection("category")
      .doc("/" + id + "/")
      .create({
        category_name: category_name,
      });

    return res.status(200).json({ message: "Item created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// GET Category

module.exports.Get = async (req, res) => {
  const db = admin.firestore();

  try {
    const query = db.collection("category");
    const response = [];
    await query.get().then((res) => {
      const docs = res.docs;
      for (const doc of docs) {
        const selectedItem = {
          id: doc.id,
          category_name: doc.data().category_name,
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
