'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
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
        address: "84552 Tatum Crescent",
        city: "Stonemouth",
        state: "Missouri",
        country: "United States of America",
        lat: 21.7645358,
        lng: -101.4730327,
        name: "Stone House",
        description: "Charming, contemporary guesthouse in Stonemouth",
        price: 200
      },
      {
        ownerId: 5,
        address: "2236 Oceanfront Street",
        city: "Malibu",
        state: "California",
        country: "United States of America",
        lat: 25.7645358,
        lng: -105.4730327,
        name: "Oceanfront House",
        description: "The house offers stunning panoramic views from the Malibu Pier",
        price: 1000
      },
      {
        ownerId: 6,
        address: "8108 Olson Street",
        city: "Hakalau",
        state: "Hawaii",
        country: "United States of America",
        lat: 62.7645358,
        lng: -110.4730327,
        name: "Beach House",
        description: "This unique property combines all the best that Hamakua Coast has to offer",
        price: 550
      },
      {
        ownerId: 7,
        address: "2366 Orlando Street",
        city: "Orlando",
        state: "Florida",
        country: "United States of America",
        lat: 56.7645358,
        lng: -100.4730327,
        name: "Swan House",
        description: "Cozy house close to Disney Resort",
        price: 350
      },
      {
        ownerId: 8,
        address: "53419 Raleigh Mountains",
        city: "Port Mikestad",
        state: "Idaho",
        country: "United States of America",
        lat: 70.7645358,
        lng: -109.4730327,
        name: "Mountain House",
        description: "Peaceful mornings and fun-filled afternoons await you at this unique experience!",
        price: 150
      },
      {
        ownerId: 9,
        address: "2780 Stella Corners",
        city: "East Randyside",
        state: "Alaska",
        country: "United States of America",
        lat: 65.7645358,
        lng: -99.4730327,
        name: "Hillside House",
        description: "A place for you to retreat, relax, reset and revive yourself",
        price: 250
      },
      {
        ownerId: 10,
        address: "21578 Big Bear Blvd",
        city: "Big Bear Lake",
        state: "California",
        country: "United States of America",
        lat: 72.7645358,
        lng: -100.4730327,
        name: "Snow House",
        description: "Comfortable Big Bear Lake apartment with fireplace and kitchen",
        price: 350
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(null, options, {});
  }
};
