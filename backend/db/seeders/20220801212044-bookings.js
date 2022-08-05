'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here
     */
   await queryInterface.bulkInsert('Bookings', [
     {
       spotId: 1,
       userId: 1,
       startDate: new Date("2021-11-01"),
       endDate: new Date("2021-11-05"),
     },
     {
       spotId: 2,
       userId: 2,
       startDate: new Date("2021-11-10"),
       endDate: new Date("2021-11-15"),
     },
     {
       spotId: 3,
       userId: 3,
       startDate: new Date("2021-11-20"),
       endDate: new Date("2021-11-25"),
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
