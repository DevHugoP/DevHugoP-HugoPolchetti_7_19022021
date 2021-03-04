"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		// define association here
	}
	User.init(
		{
			idUSERS: DataTypes.INTEGER,
			usernames: DataTypes.STRING,
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
