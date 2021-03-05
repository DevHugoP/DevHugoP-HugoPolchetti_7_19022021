const { Sequelize, Model, DataTypes } = require("sequelize");

// TEST DB

const sequelize = new Sequelize("database_development2", "root", "polchetti59", {
	host: "localhost",
	dialect: "mysql"
});

const User = sequelize.define("users", {
	name: DataTypes.TEXT
});

const Message = sequelize.define("message", {
	title: DataTypes.STRING,
	content: DataTypes.STRING,
	attachement: DataTypes.STRING,
	likes: DataTypes.INTEGER
});

const Comment = sequelize.define("comments", {
	content: DataTypes.TEXT
});
(async () => {
	await sequelize.sync({ force: true });
	const jane = await User.create({ name: "Jane" });
	const message = await Message.create({
		title: "Jane doe",
		content: "j ' écoute ultra oklm ",
		attachement: null,
		likes: 0
	});
	// Jane exists in the database now!
	console.log(jane instanceof User); // true
	console.log(jane.name); // "Jane"
	console.log(message.title);
})();

(async () => {
	const message = await Message.findOne({ where: { title: "Jane doe" } });
	if (message === null) {
		console.log("Not found!");
	} else {
		console.log(message instanceof Message); // true
		console.log(message.title); // 'My Title'
	}
})();
