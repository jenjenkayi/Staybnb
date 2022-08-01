'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here
     */
   await queryInterface.bulkInsert('Bookings', [
     {
       spotId: 1,
       userId: 2,
       startDate: "2021-11-19",
       endDate: "2021-11-20",
     },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
