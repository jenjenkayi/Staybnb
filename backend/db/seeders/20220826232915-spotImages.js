'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options,[
      {
        spotId: 1,
        url: 'https://cdn.pixabay.com/photo/2016/06/24/11/46/architecture-1477099_1280.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2016/06/24/11/45/architecture-1477098_1280.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2019/08/19/14/36/hotel-4416612_1280.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2019/10/17/02/39/villa-4555824_1280.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2020/01/30/13/28/villa-4805428_1280.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdn.pixabay.com/photo/2021/12/18/06/00/room-6878004_1280.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://cdn.pixabay.com/photo/2019/10/17/02/39/villa-4555818_1280.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://cdn.pixabay.com/photo/2016/04/15/11/46/hotel-1330846_1280.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://cdn.pixabay.com/photo/2014/09/26/04/59/holiday-complex-461633_1280.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://cdn.pixabay.com/photo/2016/06/24/11/47/architecture-1477100_1280.jpg',
        preview: true
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(null, options,{});
  }
};
