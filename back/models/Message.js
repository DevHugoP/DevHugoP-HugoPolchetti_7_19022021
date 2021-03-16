"use strict";
const { Model } = require("sequelize");
const User = require("./User");
module.exports = (sequelize, DataTypes) => {
	class Message extends Model {
		static associate(models) {
			models.Message.belongsTo(models.User, {
				foreignKey: "userId"
			});
			models.Message.hasMany(models.Comment);
		}
	}
	Message.init(
		{
			title: DataTypes.STRING,
			content: DataTypes.TEXT,
			attachement: DataTypes.STRING,
			userId: DataTypes.INTEGER,
			commentId: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: "Message"
		}
	);
	return Message;
};
