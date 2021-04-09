const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const stuffCtrl = require("../controllers/message");

router.get("/", auth, stuffCtrl.getAllMessage);
router.post("/", auth, multer, stuffCtrl.createMessage);
router.get("/:id", auth, stuffCtrl.getOneMessage);
router.put("/:id", auth, multer, stuffCtrl.modifyMessage);
router.delete("/:id", auth, stuffCtrl.deleteMessage);

module.exports = router;
