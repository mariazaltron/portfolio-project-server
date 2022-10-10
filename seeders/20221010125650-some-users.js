'use strict';
const bcrypt = require("bcrypt")

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Ana",
          email: "ana@ana.com",
          password: bcrypt.hashSync("ana", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tom",
          email: "Tom@tom.com",
          password: bcrypt.hashSync("tom", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Julia",
          email: "julia@julia.com",
          password: bcrypt.hashSync("julia", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  }
};
