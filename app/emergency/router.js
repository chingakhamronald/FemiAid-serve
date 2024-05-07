// eslint-disable-next-line new-cap
const router = require("express").Router();
const Controller = require("./controller");

router.get("/", Controller.Get);
router.post("/", Controller.Post);
router.put("/update/:id", Controller.Update);

module.exports = router;
