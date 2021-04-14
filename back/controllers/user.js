const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
exports.signup = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 4)
		.then((hash) => {
			const user = db.User.create({
				username: req.body.username,
				password: hash,
				email: req.body.email,
				isAdmin: req.body.isAdmin
			})
				.then((user) =>
					res.status(201).json({
						message: "Utilisateur créé !",
						userId: user.id,
						token: jwt.sign({ where: { userId: user.id } }, "RANDOM_TOKEN_SECRET", {
							expiresIn: "24h"
						})
					})
				)
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
						userId: user.id,
						token: jwt.sign({ where: { userId: user.id } }, "RANDOM_TOKEN_SECRET", {
							expiresIn: "24h"
						})
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.getUserData = (req, res, next) => {
	db.User.findOne({
		where: {
			id: req.params.id
		}
	})
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(404).json({
				error: error
			});
		});
};

exports.deleteUser = (req, res, next) => {
	db.User.destroy({
		where: {
			id: req.params.id
		}
	})
		.then((res) => res.status(204).json("compte utilisateur supprimé"))
		.catch((err) => res.status(400).json(err));
};
