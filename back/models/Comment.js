"use strict";
const { Model, belongsTo } = require("sequelize");
const User = require("./User");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			models.Comment.belongsTo(models.User, {
				foreignKey: "userId"
			});
		}
	}
	Comment.init(
		{
			content: DataTypes.TEXT,
			userId: {
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
