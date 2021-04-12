// l'objectif du middleware ici est de faire en sorte que les requests POST / PUT / DELETE soient forcement du proprietaire  de l'element OU ADMIN et indique à l'emmeteur 'vous n'avez pas les droits pour modifier / supprimer'

const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = (req, res, next) => {
	console.log(req.query.currentUser);
	const token = req.headers.authorization.split(" ")[1];
	console.log(token);
	const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
	console.log(decodedToken);
	const userId = decodedToken.where.userId;
	console.log(req.body.userId);
	console.log(userId);
	let currentUser = req.query.currentUser;
	let testUser = parseInt(currentUser);
	console.log(testUser);

	if (testUser !== userId) {
		console.log(
			"Le proprietaire de l'element et l'utilisateur demandant la modification / suppression sont différents"
		);
		res.status(401).json({
			message: "vous n'avez pas les droits pour modifier / supprimer cet element"
		});
	} else {
		next();
	}
};
