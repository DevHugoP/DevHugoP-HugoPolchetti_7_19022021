const fs = require("fs");
const Comment = require("../models/Comment");
const db = require("../models");

exports.createComment = async (req, res, next) => {
	console.log(req.body.userId);
	const commentObject = req.body;
	const comment = await db.Comment.create({
		userId: commentObject.userId,
		content: commentObject.content
	});
	res.status(200).json(comment);
	console.log(req.body);
};

exports.getAllComment = (req, res, next) => {
	db.Comment.findAll({
		include: [{ model: db.User }]
	})
		.then((comments) => {
			res.status(200).json(comments);
		})
		.catch((error) => {
			res.status(400).json({
				error: error
			});
		});
};

exports.getOneComment = (req, res, next) => {
	console.log(req.params);
	// req.params contient ce qu'il y a dans l'uri => faire une requette
	console.log(req.params.id);
	db.Comment.findOne({
		where: {
			id: req.params.id
		},
		include: [{ model: db.User }]
	})
		.then((comment) => {
			res.status(200).json(comment);
		})
		.catch((error) => {
			res.status(404).json({
				error: error
			});
		});
};

exports.deleteComment = (req, res, next) => {
	db.Comment.findOne({
		where: {
			id: req.params.id
		},
		include: [{ model: db.User }]
	})
		.then((comment) => {
			// const filename = comment.attachement.split("/images/")[1];
			// fs.unlink(`images/${filename}`,
			// () => {
			db.Comment.destroy({
				where: {
					id: req.params.id
				}
			})
				.then(() => res.status(200).json({ comment: "Comment supprimé !" }))
				.catch((error) => res.status(400).json({ error }));
			// });
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.modifyComment = (req, res, next) => {
	if (req.file) {
		db.Comment.findOne({
			where: {
				id: req.params.id
			},
			include: [{ model: db.User }]
		}).then((comment) => {
			const filename = comment.attachement.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {});
		});
	}

	const commentObject = req.file
		? {
				...JSON.parse(req.body.comment),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
		  }
		: { ...req.body };
	db.Comment.update(
		{
			...commentObject,
			where: {
				id: req.params.id
			}
		},
		{
			where: {
				id: req.params.id
			}
		}
	)
		.then(() => res.status(200).json({ comment: "Commentaire modifié !" }))
		.catch((error) => res.status(400).json({ error }));
};

// exports.likeComment = (req, res, next) => {
// 	Sauce.findOne({
// 		_id: req.params.id
// 	}).then((sauce) => {
// 		let userId = req.body.userId;
// 		let like = req.body.like;
// 		res.status(200).json();

// 		function arrayLike() {
// 			if (like === 1) {
// 				Comment.likes++;
// 				Comment.usersLiked.push(userId);
// 				return;
// 			}
// 			if (like === -1) {
// 				// si le nombre arrivant de la requete est -1 alors c'est un dislike on va donc augmenter le compte de dislikes et rajouter l'id de l'utilisateur dans le tableau des dislike
// 				Comment.dislikes++;
// 				Comment.usersDisliked.push(userId);
// 				return;
// 			}
// 			if (like === 0) {
// 				//Si le nombre dans la requète est 0 alors il faut vérifier si l'utilisateur avait auparavant liké ou disliké la sauce en vérifiant sa présence dans chaque tableau pour pouvoir le retirer du tableau concerné et ajuster le compte
// 				if (sauce.usersLiked.indexOf(userId) === -1) {
// 					sauce.dislikes--;
// 					sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userId), 1);
// 				} else if (sauce.usersLiked.indexOf(userId) !== -1) {
// 					sauce.likes--;
// 					sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1);
// 				}
// 			}
// 		}
// 		arrayLike();

// 		sauce.save();
// 	});
// };
