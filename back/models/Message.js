"use strict";
const { Model } = require("sequelize");
const User = require("./User");
module.exports = (sequelize, DataTypes) => {
	class Message extends Model {
		static associate(models) {
			models.Message.belongsTo(models.User, {});
			models.Message.hasMany(models.Comment, { onDelete: "CASCADE", hooks: true });
		}
	}
	Message.init(
		{
			title: DataTypes.STRING,
			content: DataTypes.TEXT,
			attachement: DataTypes.STRING,
			userId: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: "Message"
		}
	);
	return Message;
};
