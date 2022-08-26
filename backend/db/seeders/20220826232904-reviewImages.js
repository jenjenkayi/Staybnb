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
        url: 'url',
      },
      {
        reviewId: 2,
        url: 'url',
      },
      {
        reviewId: 3,
        url: 'url',
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
