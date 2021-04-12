const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const owner = require("../middleware/owner");
const modifyAndDeleteMessage = require("../middleware/modifyAndDeleteMessage");

const stuffCtrl = require("../controllers/message");

router.get("/", owner, stuffCtrl.getAllMessage);
router.post("/", owner, multer, stuffCtrl.createMessage);
router.get("/:id", owner, stuffCtrl.getOneMessage);
router.put("/:id", modifyAndDeleteMessage, multer, stuffCtrl.modifyMessage);
router.delete("/:id", modifyAndDeleteMessage, stuffCtrl.deleteMessage);

module.exports = router;
