'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here
     */
    await queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 1,
        review: "This was an awesome spot!",
        stars: 5
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
