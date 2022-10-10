"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "sharedWatchLists",
      [
        {
          name: "",
          owner: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "",
          owner: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "",
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
