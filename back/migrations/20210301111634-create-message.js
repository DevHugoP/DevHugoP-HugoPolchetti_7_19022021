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
			uuid: {
				allowNull: false,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				unique: true
			},
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
			likes: {
				allowNull: false,
				type: Sequelize.INTEGER
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
