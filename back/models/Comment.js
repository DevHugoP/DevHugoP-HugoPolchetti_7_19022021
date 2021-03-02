"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comments extends Model {
		static associate(models) {
			models.Comment.hasMany(models.User);
		}
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
