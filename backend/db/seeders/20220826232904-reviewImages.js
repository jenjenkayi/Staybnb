'use strict';

const { ReviewImage } = require('../models')
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'image url',
      },
      {
        reviewId: 2,
        url: 'image url',
      },
      {
        reviewId: 3,
        url: 'image url',
      },
   ], { });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
