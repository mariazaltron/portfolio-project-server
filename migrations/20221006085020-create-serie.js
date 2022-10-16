'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("series", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      genres: {
        type: Sequelize.STRING,
      },
      number_of_seasons: {
        type: Sequelize.INTEGER,
      },
      poster_path: {
        type: Sequelize.TEXT,
      },
      networks: {
        type: Sequelize.STRING,
      },
      vote_average: {
        type: Sequelize.FLOAT,
      },
      overview: {
        type: Sequelize.TEXT,
      },
      tmdb_id: {
        type: Sequelize.INTEGER,
      },
      backdrop_path: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('series');
  }
};