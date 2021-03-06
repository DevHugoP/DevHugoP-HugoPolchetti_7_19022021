const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const stuffCtrl = require("../controllers/message");

router.get("/", stuffCtrl.getAllMessage);
router.post("/", stuffCtrl.createMessage);
router.get("/:id", stuffCtrl.getOneMessage);
router.put("/:id", multer, stuffCtrl.modifyMessage);
router.delete("/:id", stuffCtrl.deleteMessage);

module.exports = router;
