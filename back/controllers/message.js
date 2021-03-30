const fs = require("fs");
const Message = require("../models/Message");
const User = require("../models/User");
const db = require("../models");

exports.getAllMessage = (req, res, next) => {
	db.Message.findAll({
		include: [{ model: db.User }, { model: db.Comment }]
	})
		.then((messages) => {
			res.status(200).json({ messages });
		})
		.catch((error) => {
			res.status(400).json({
				error: error
			});
		});
};

exports.createMessage = async (req, res, next) => {
	const messageObject = JSON.parse(req.body.message);
	const testReqFile = req.file;
	console.log(testReqFile);
	testBoolean = false;
	const test = () => {
		if (req.file == undefined) {
			testBoolean = false;
		} else {
			testBoolean = true;
		}
	};
	test();
	const message = await db.Message.create({
		userId: messageObject.userId,
		title: messageObject.title,
		content: messageObject.content,
		attachement: testBoolean
			? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
			: null
	})

		.then((message) => {
			res.status(200).json(message);
		})
		.catch((error) => {
			res.status(404).json({
				error: error
			});
		});
};

exports.getOneMessage = (req, res, next) => {
	console.log(req.params);
	// req.params contient ce qu'il y a dans l'uri => faire une requette
	console.log(req.params.id);
	db.Message.findOne({
		where: {
			id: req.params.id
		},
		include: [{ model: db.User }, { model: db.Comment }]
	})
		.then((message) => {
			res.status(200).json(message);
		})
		.catch((error) => {
			res.status(404).json({
				error: error
			});
		});
};

exports.deleteMessage = (req, res, next) => {
	db.Message.findOne({
		where: {
			id: req.params.id
		}
	})
		.then((message) => {
			const filename = message.attachement.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {
				db.Message.destroy({
					where: {
						id: req.params.id
					}
				})
					.then(() => res.status(200).json({ message: "Message supprimé !" }))
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.modifyMessage = (req, res, next) => {
	const message = JSON.parse(req.body.message);
	console.log(message);
	console.log(req.body.image);
	console.log(req.params.id);
	if (req.file !== null) {
		db.Message.findOne({
			where: {
				id: req.params.id
			}
		}).then((message) => {
			const filename = message.attachement.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {});
		});
	}

	const messageObject = req.file
		? {
				...JSON.parse(req.body.message),
				attachement: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
		  }
		: { ...req.body };
	db.Message.update(
		{
			...messageObject,
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
		.then(() => res.status(200).json({ message: "Message modifié !" }))
		.catch((error) => res.status(400).json({ error }));
};
// exports.likeMessage = (req, res, next) => {
// 	Sauce.findOne({
// 		_id: req.params.id
// 	}).then((sauce) => {
// 		let userId = req.body.userId;
// 		let like = req.body.like;
// 		res.status(200).json();

// 		function arrayLike() {
// 			if (like === 1) {
// 				message.likes++;
// 				message.usersLiked.push(userId);
// 				return;
// 			}
// 			if (like === -1) {
// 				// si le nombre arrivant de la requete est -1 alors c'est un dislike on va donc augmenter le compte de dislikes et rajouter l'id de l'utilisateur dans le tableau des dislike
// 				message.dislikes++;
// 				message.usersDisliked.push(userId);
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
