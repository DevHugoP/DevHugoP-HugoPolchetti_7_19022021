"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comments extends Model {
		static associate(models) {}
	}
	Comments.init(
		{
			idCOMMENTS: DataTypes.INTEGER,
			content: DataTypes.STRING,
			likes: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: "Comments"
		}
	);
	return Comments;
};
