const fs = require("fs");
const Message = require("../models/Message");
const User = require("../models/User");
const db = require("../models");

exports.getAllMessage = (req, res, next) => {
	db.Message.findAll({
		include: [{ model: db.User }, { model: db.Comment }],
		order: [["createdAt", "DESC"]]
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
	console.log(req.params.id);
	db.Message.findOne({
		where: {
			id: req.params.id
		}
	})
		.then((message) => {
			if (message.attachement !== null) {
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
			} else {
				db.Message.destroy({
					where: {
						id: req.params.id
					}
				})
					.then(() => res.status(200).json({ message: "Message supprimé !" }))
					.catch((error) => res.status(400).json({ error }));
			}
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.modifyMessage = async (req, res, next) => {
	const message = JSON.parse(req.body.message);
	console.log(message);
	console.log(message.attachement);
	console.log("on test req.file" + req.file);

	if (req.file !== undefined || message.attachement === null) {
		db.Message.findOne({
			where: {
				id: req.params.id
			}
		}).then((message) => {
			console.log("on est dans la réponse avec file" + message.attachement);
			const filename = message.attachement.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {});
		});
	}

	const messageObject = req.file
		? {
				...message,
				attachement: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
		  }
		: { ...message };

	db.Message.update(
		{ ...messageObject },
		{
			where: { id: req.params.id }
		}
	)
		.then(() => res.status(200).json({ message: "Message modifié !" }))
		.catch((error) => res.status(400).json({ error }));
};
