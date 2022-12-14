'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options,[
      {
        userId: 1,
        spotId: 1,
        review: "This was an awesome spot!",
        stars: 5
      },
      {
        userId: 2,
        spotId: 2,
        review: "This place was good!",
        stars: 3
      },
      {
        userId: 3,
        spotId: 3,
        review: "This place was dirty!",
        stars: 1
      },
      {
        userId: 4,
        spotId: 4,
        review: "This place was clean!",
        stars: 4
      },
      {
        userId: 5,
        spotId: 5,
        review: "This was an awesome spot!!",
        stars: 5
      },
      {
        userId: 6,
        spotId: 6,
        review: "This place was dirty!",
        stars: 1
      },
      {
        userId: 7,
        spotId: 7,
        review: "This was an awesome spot!",
        stars: 5
      },
      {
        userId: 8,
        spotId: 8,
        review: "This place was good!",
        stars: 3
      },
      {
        userId: 9,
        spotId: 9,
        review: "This was an awesome spot!",
        stars: 5
      },
      {
        userId: 10,
        spotId: 10,
        review: "This place was dirty!",
        stars: 1
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(null, options, {});
  }
};
