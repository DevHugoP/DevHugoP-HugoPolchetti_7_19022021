"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {}
	}
	Comment.init(
		{
			content: DataTypes.TEXT,
			likes: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: "Comment"
		}
	);
	return Comment;
};
