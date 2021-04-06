"use strict";

const { sequelize } = require("../models");

module.exports = {
	up: async (queryInterface, Sequelize, DataTypes) => {
		await queryInterface.createTable("Messages", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				onDelete: "CASCADE",
				references: {
					model: "Users",
					key: "id"
				}
			},
			commentId: {
				allowNull: true,
				type: Sequelize.INTEGER
			}, // rajouter la foreign key après la creation de la table

			title: {
				allowNull: false,
				type: Sequelize.STRING
			},
			content: {
				allowNull: false,
				type: Sequelize.STRING
			},
			attachement: {
				allowNull: true,
				type: Sequelize.STRING
			},

			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Messages");
	}
};
