const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const messageRoutes = require("./routes/message");
const userRoutes = require("./routes/user");
const { Sequelize } = require("sequelize");

// Connexion DB
const sequelize = new Sequelize("database_development2", "root", "polchetti59", {
	host: "localhost",
	dialect: "mysql"
});
sequelize
	.authenticate()
	.then(() => console.log("Database connected !"))
	.catch((err) => console.log("Error: " + err));

const app = express();

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

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

app.get("/", (req, res) => res.send("TEST"));
app.use("/api/messages", messageRoutes);
app.use("/api/auth", userRoutes);

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

module.exports = app;
