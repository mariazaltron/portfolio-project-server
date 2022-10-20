"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "watchListSeries",
      [
        {
          serieId: 1,
          watchListId: 1,
          status: "watching",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          serieId: 2,
          watchListId: 2,
          status: "watching",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          serieId: 3,
          watchListId: 3,
          status: "watching",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("watchListSeries", null, {});
  },
};
