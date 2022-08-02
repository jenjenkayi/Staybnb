'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here
     */
    await queryInterface.bulkInsert('Images', [
      {
        url: 'image url',
        previewImage: 'image url',
        spotId: 1,
        reviewId: 1,
        userId: 1
    },
      {
        url: 'image url',
        previewImage: 'image url',
        spotId: 2,
        reviewId: 2,
        userId: 2
    },
      {
        url: 'image url',
        previewImage: 'image url',
        spotId: 3,
        reviewId: 3,
        userId: 3
    },
      {
        url: 'image url',
        previewImage: 'image url',
        spotId: 4,
        reviewId: 4,
        userId: 4
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Images', null, {});
  }
};
