"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			models.User.hasMany(models.Message, { onDelete: "CASCADE", hooks: true });
			models.User.hasMany(models.Comment, { onDelete: "CASCADE", hooks: true });
		}
	}
	User.init(
		{
			username: { type: DataTypes.STRING },
			password: DataTypes.STRING,
			email: DataTypes.STRING,
			isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
		},
		{
			sequelize,
			modelName: "User"
		}
	);
	return User;
};
