"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "sharedWatchLists",
      [
        {
          name: "Ana's List",
          owner: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tom's List",
          owner: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Julia's List",
          owner: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sharedWatchLists", null, {});
  },
};
