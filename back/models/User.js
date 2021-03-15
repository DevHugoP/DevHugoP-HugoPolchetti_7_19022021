"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			models.User.hasMany(models.Message);
			models.User.hasMany(models.Comment);
		}
	}
	User.init(
		{
			username: DataTypes.STRING,
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
