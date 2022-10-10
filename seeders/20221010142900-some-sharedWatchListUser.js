"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "sharedWatchListUsers",
      [
        {
          userId: 1,
          sharedWatchListId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          sharedWatchListId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          sharedWatchListId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sharedWatchListUsers", null, {});
  },
};
