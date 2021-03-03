const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Sequelize } = require("sequelize");

// TEST DB

const sequelize = new Sequelize("database_development", "root", "polchetti59", {
	host: "localhost",
	dialect: "mysql"
});

sequelize
	.authenticate()
	.then(() => console.log("Database connected !"))
	.catch((err) => console.log("Error: " + err));

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("INDEX"));

app.listen(PORT, console.log(`Server started on ${PORT}`));
