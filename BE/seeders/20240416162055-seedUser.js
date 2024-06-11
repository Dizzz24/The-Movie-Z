'use strict';
const hashPassword = require('../helpers/hashPassword')

/** @type {import('sequelize-cli').Migration} */

let user =
  [
    {
      username: "user1",
      email: "user1@mail.com",
      password: hashPassword("12345"),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', user, {})

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', user, {})

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
