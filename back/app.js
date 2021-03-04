const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const messageRoutes = require("./routes/message");
const userRoutes = require("./routes/user");
const { Sequelize } = require("sequelize");
const User = require("./models/User");

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
app.use(express.json());

// app.use("/images", express.static(path.join(__dirname, "images")));

// app.use((req, res, next) => {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
// 	);
// 	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
// 	next();
// });

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("TEST"));
app.use("/api/messages", messageRoutes);
app.use("/api/auth", userRoutes);

app.post("/users", async (req, res) => {
	const { idUSERS, usernames, password, email, isAdmin } = req.body;
	try {
		const user = await User.create({ idUSERS, usernames, password, email, isAdmin });

		return res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// app.listen({ port: 3000 }, async () => {
// 	console.log("server up");
// 	await sequelize.sync({ force: true });
// });
module.exports = app;
