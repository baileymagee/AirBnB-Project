"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Spots";
		return queryInterface.bulkInsert(
			options,
        [
          {
          "ownerId": 1,
          "address": "123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": 37.7645358,
          "lng": -122.4730327,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": 123
        },
        {
          "ownerId": 1,
          "address": "123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": 37.7645358,
          "lng": -122.4730327,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": 123
        }
      ],
			{}
		);
	},
      down: async (queryInterface, Sequelize) => {
        options.tableName = "Spots";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
          options,
          {
          ownerId: { [Op.in]: [1, 2, 3] }
          },
          {}
        );
      }
    };
