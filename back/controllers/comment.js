const fs = require("fs");
const Comment = require("../models/Comment");
const db = require("../models");

exports.createComment = async (req, res, next) => {
	console.log(req.body.userId);
	const commentObject = req.body;
	await db.Comment.create({
		userId: commentObject.userId,
		messageId: commentObject.messageId,
		content: commentObject.content
	})
		.then((comment) => {
			res.status(200).json(comment);
		})
		.catch((error) => {
			res.status(404).json({ error: error });
		});
};

exports.getMultipleComment = (req, res, next) => {
	console.log(req.params.id);
	db.Comment.findAll({
		where: {
			messageId: req.params.id
		},
		include: [{ model: db.User }],
		order: [["createdAt", "DESC"]]
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

exports.getAllComment = (req, res, next) => {
	db.Comment.findAll({
		include: [{ model: db.User }, { model: db.Message }]
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
	console.log(req.params.id);
	db.Comment.findOne({
		where: {
			id: req.params.id
		},
		include: [{ model: db.User }, { model: db.Message }]
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
		}
	})
		.then((comment) => {
			db.Comment.destroy({
				where: {
					id: req.params.id
				}
			})
				.then(() => res.status(200).json({ comment: "Comment supprimé !" }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.modifyComment = (req, res, next) => {
	if (req.file) {
		db.Comment.findOne({
			where: {
				id: req.params.id
			}
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
