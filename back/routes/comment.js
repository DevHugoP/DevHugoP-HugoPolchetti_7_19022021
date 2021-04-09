const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const stuffCtrlComment = require("../controllers/comment");

router.get("/", auth, stuffCtrlComment.getAllComment);
router.get("/message/:id", auth, stuffCtrlComment.getMultipleComment);
router.post("/", auth, stuffCtrlComment.createComment);
router.get("/:id", auth, stuffCtrlComment.getOneComment);
router.delete("/:id", auth, stuffCtrlComment.deleteComment);

module.exports = router;
