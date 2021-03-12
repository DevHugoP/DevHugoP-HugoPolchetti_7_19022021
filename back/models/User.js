"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {}
	User.init(
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			email: DataTypes.STRING,
			isAdmin: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: "User"
		}
	);
	return User;
};
