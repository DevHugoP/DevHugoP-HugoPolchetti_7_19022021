const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const db = require("../models");
exports.signup = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = db.User.create({
				username: req.body.username,
				password: hash,
				email: req.body.email,
				isAdmin: req.body.isAdmin
			})
				.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
	db.User.findOne({
		where: {
			email: req.body.email
		}
	})
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					res.status(200).json({
						userId: user.uuid,
						token: jwt.sign({ where: { userId: user.uuid } }, "RANDOM_TOKEN_SECRET", {
							expiresIn: "24h"
						})
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.test = (req, res, next) => {
	db.User.findOne({ where: { email: req.body.email } })
		.then((user) => {
			return (
				res.status(401).json({ message: `le test fonctionne " + ${user}` }),
				console.log(user)
			);
		})
		.catch((error) => res.status(500).json({ error }));
};
