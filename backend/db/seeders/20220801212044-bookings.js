'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Bookings';
   await queryInterface.bulkInsert(options,[
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
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(null, options,{});
  }
};
