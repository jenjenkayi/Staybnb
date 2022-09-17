'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://images.app.goo.gl/nEskmbwyLhHyBn8S8',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://www.hojoanaheim.com/hojo-magical-in-room-celebrations/',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.tokyodisneyresort.jp/en/hotel/dah/room/detail/amb_minnie/',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://www.houzz.com/photos/modern-guesthouse-ideas-phbr2-bp~t_24681~s_2105~a_34-292',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://malibu.nobuhotels.com/accommodations/',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://www.hiltonhawaiianvillage.com/rooms-and-suites/',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://www.marriott.com/en-us/hotels/mcodw-walt-disney-world-swan/overview/',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://www.rmrentals.com/jackson-hole-rentals/mountain-view-lodge',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://www.familyvacationcritic.com/aurora-borealis-lodge/htl/',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://planetofhotels.com/en/usa/gatlinburg/big-bear-lodge-5-bedrooms-view-hot-tub-privacy-jacuzzis-sleeps-26',
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
