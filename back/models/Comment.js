"use strict";
const { Model, belongsTo } = require("sequelize");
const User = require("./User");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			models.Comment.belongsTo(models.User, {});

			models.Comment.belongsTo(models.Message, {});
		}
	}
	Comment.init(
		{
			content: DataTypes.TEXT,
			userId: {
				type: DataTypes.INTEGER
			},
			messageId: {
				type: DataTypes.INTEGER
			}
		},
		{
			sequelize,
			modelName: "Comment"
		}
	);
	return Comment;
};
