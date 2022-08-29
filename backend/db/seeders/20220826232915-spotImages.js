'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'image url',
        preview: true
      },
      {
        spotId: 2,
        url: 'image url',
        preview: true
      },
      {
        spotId: 3,
        url: 'image url',
        preview: true
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
