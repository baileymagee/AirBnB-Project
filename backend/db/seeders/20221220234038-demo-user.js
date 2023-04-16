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
        firstName: 'Magneto',
        lastName: 'Marvel',
        email: 'magneto@gmail.com',
        username: 'Magneto1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Fake',
        lastName: 'User',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Joker',
        lastName: 'DC',
        email: 'joker@gmail.com',
        username: 'Joker1',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Doctor',
        lastName: 'Doom',
        email: 'docdoom@gmail.com',
        username: 'Dr.Doom',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Darth',
        lastName: 'Vader',
        email: 'jedisucks@gmail.com',
        username: 'DarthVador',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Loki',
        lastName: 'Marvel',
        email: 'loki@gmail.com',
        username: 'Loki',
        hashedPassword: bcrypt.hashSync('password6')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
