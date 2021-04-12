const express = require("express");
const router = express.Router();

const deleteComment = require("../middleware/deleteComment");
const owner = require("../middleware/owner");

const stuffCtrlComment = require("../controllers/comment");

router.get("/", owner, stuffCtrlComment.getAllComment);
router.get("/from/:id", owner, stuffCtrlComment.getMultipleComment);
router.post("/", owner, stuffCtrlComment.createComment);
router.get("/:id", owner, stuffCtrlComment.getOneComment);
router.delete("/:id", deleteComment, stuffCtrlComment.deleteComment);

module.exports = router;
