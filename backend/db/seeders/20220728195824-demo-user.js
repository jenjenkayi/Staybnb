'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: "demo",
        lastName: "user",
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: "Jo",
        lastName: "Baker",
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: "AJ",
        lastName: "Wallen",
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
        {
        firstName: "demo1",
        lastName: "user1",
        email: 'demo1@user.io',
        username: 'Demo-lition1',
        hashedPassword: bcrypt.hashSync('password4')
      },
        {
        firstName: "demo2",
        lastName: "user2",
        email: 'demo2@user.io',
        username: 'Demo-lition2',
        hashedPassword: bcrypt.hashSync('password5')
      },
        {
        firstName: "demo3",
        lastName: "user3",
        email: 'demo3@user.io',
        username: 'Demo-lition3',
        hashedPassword: bcrypt.hashSync('password6')
      },
        {
        firstName: "demo4",
        lastName: "user4",
        email: 'demo4@user.io',
        username: 'Demo-lition4',
        hashedPassword: bcrypt.hashSync('password7')
      },
        {
        firstName: "demo5",
        lastName: "user5",
        email: 'demo5@user.io',
        username: 'Demo-lition5',
        hashedPassword: bcrypt.hashSync('password8')
      },
        {
        firstName: "demo6",
        lastName: "user6",
        email: 'demo6@user.io',
        username: 'Demo-lition6',
        hashedPassword: bcrypt.hashSync('password9')
      },
        {
        firstName: "demo7",
        lastName: "user7",
        email: 'demo7@user.io',
        username: 'Demo-lition7',
        hashedPassword: bcrypt.hashSync('password10')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['JohnSmith', 'Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
