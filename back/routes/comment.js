const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const stuffCtrlComment = require("../controllers/comment");

router.get("/", stuffCtrlComment.getAllComment);
router.post("/", stuffCtrlComment.createComment);
router.get("/:id", stuffCtrlComment.getOneComment);
router.put("/:id", multer, stuffCtrlComment.modifyComment);
router.delete("/:id", stuffCtrlComment.deleteComment);

module.exports = router;
