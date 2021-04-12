const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const owner = require("../middleware/owner");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/user/:id", userCtrl.getUserData);
router.delete("/user/:id", owner, userCtrl.deleteUser);

module.exports = router;
