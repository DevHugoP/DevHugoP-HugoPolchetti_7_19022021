"use strict";
const { Model, belongsTo } = require("sequelize");
const User = require("./User");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			models.Comment.belongsTo(models.User, {
				foreignKey: {
					allowNull: false
				}
			});
		}
	}
	Comment.init(
		{
			content: DataTypes.TEXT,
			user_id: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: "Comment"
		}
	);
	return Comment;
};
