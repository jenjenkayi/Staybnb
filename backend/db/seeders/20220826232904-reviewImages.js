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
        url: 'https://insidethemagic.net/2019/01/ba1-sofia-the-first-hotel-tokyo-disney/',
      },
      {
        reviewId: 2,
        url: 'https://www.disneytouristblog.com/mickeys-penthouse-suite-ambassador-hotel-tokyo-disney/',
      },
      {
        reviewId: 3,
        url: 'https://soranews24.com/2012/12/04/love-disney-these-adorable-mickey-and-minnie-hotel-rooms-are-for-you/',
      },
      {
        reviewId: 4,
        url: 'https://www.architecturaldigest.com/gallery/how-to-decorate-your-guesthouse',
      },
      {
        reviewId: 5,
        url: 'https://www.nytimes.com/2019/05/03/travel/Nobu-Ryokan-Malibu.html',
      },
      {
        reviewId: 6,
        url: 'https://www.cntraveler.com/galleries/2014-10-20/top-25-resorts-in-hawaii',
      },
      {
        reviewId: 7,
        url: 'https://allears.net/2020/12/13/preview-the-guest-rooms-at-the-walt-disney-world-swan-reserve-hotel-opening-july-2021/',
      },
      {
        reviewId: 8,
        url: 'https://mountain-view-lodge-pretoria.booked.net/',
      },
      {
        reviewId: 9,
        url: 'https://www.explorefairbanks.com/places-to-stay/lodges/',
      },
      {
        reviewId: 10,
        url: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/329701207.jpg?k=abd5ff56e15cbe6c7a303664d506e91df2d139c55b4e89cfbd52c766ed505504&o=',
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
