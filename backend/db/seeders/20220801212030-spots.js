'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here
     */
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerId: 2,
        address: "456 Disney Lane",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 52.7645358,
        lng: -112.4730327,
        name: "Mickey House",
        description: "Place where web developers are created",
        price: 200
      },
      {
        ownerId: 3,
        address: "818 Sixflag Street",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 56.7645358,
        lng: -100.4730327,
        name: "Minnie House",
        description: "Place where web developers are created",
        price: 150
      },
      {
        ownerId: 4,
        address: "246 Knotts Road",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 23.7645358,
        lng: -152.4730327,
        name: "Winnie House",
        description: "Place where web developers are created",
        price: 250
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
