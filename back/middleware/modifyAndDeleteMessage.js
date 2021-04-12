const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
	const userId = decodedToken.where.userId;

	if (req.params.id) {
		db.User.findOne({ where: { id: req.query.currentUser } }).then((user) => {
			let userIsAdmin = user.isAdmin;
			db.Message.findOne({ where: { id: req.params.id } }).then((message) => {
				if (message.userId == userId || userIsAdmin) {
					next();
				} else {
					console.log(
						"Le proprietaire de l'element et l'utilisateur demandant la modification / suppression sont différents"
					);
					res.status(401).json({
						message: "vous n'avez pas les droits pour modifier / supprimer cet element"
					});
				}
			});
		});
	} else {
		res.status(401).json({
			error: new Error("Invalid request!")
		});
	}
};
