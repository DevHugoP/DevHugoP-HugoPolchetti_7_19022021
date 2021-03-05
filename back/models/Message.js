"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Message extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}
	Message.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			title: DataTypes.STRING,
			content: DataTypes.TEXT,
			attachement: DataTypes.STRING,
			likes: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: "Message"
		}
	);
	return Message;
};
