const { Sequelize, Model, DataTypes } = require("sequelize");

// TEST DB

const sequelize = new Sequelize("database_development2", "root", "polchetti59", {
	host: "localhost",
	dialect: "mysql"
});

const User = sequelize.define("user", {
	name: DataTypes.TEXT
});

(async () => {
	await sequelize.sync({ force: true });
	const jane = await User.create({ name: "Jane" });
	// Jane exists in the database now!
	console.log(jane instanceof User); // true
	console.log(jane.name); // "Jane"
})();
