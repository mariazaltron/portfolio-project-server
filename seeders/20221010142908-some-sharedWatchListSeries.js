'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "sharedWatchListSeries",
      [
        {
          serieId: 1,
          sharedWatchListId: 1,
          status: "watching",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          serieId: 2,
          sharedWatchListId: 2,
          status: "watching",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          serieId: 3,
          sharedWatchListId: 3,
          status: "watching",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
       await queryInterface.bulkDelete("sharedWatchListSeries", null, {});

  }
};
