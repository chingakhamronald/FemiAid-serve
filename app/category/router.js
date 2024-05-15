const router = require("express").Router();
const Controller = require("./controller");

router.post("/", Controller.Post);
router.get("/", Controller.Get);

module.exports = router;
