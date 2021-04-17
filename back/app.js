const express = require("express");
const path = require("path");
const messageRoutes = require("./routes/message");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const bddName = process.env.BDD_NAME;
const bddUser = process.env.BDD_USER;
const bddPass = process.env.BDD_PASS;

// Connexion DB
const sequelize = new Sequelize(`${bddName}`, `${bddUser}`, `${bddPass}`, {
	host: "localhost",
	dialect: "mysql"
});
sequelize
	.authenticate()
	.then(() => console.log("Database connected !"))
	.catch((err) => console.log("Error: " + err));

const app = express();
// parse application/json

// CORS
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/messages", messageRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;
