"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "admin@gmail.com",
        password:
          "$2a$10$Baoe7pODAM9WOdREblWnFeLGt7yC8YWZgI8LeHPNbxYzL/IsbOmZK",
        placeManagement: "All",
        gender: "1",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
