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
          "lat": 58.7645358,
          "lng": 139.9827327,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": 250
        },
        {
          "ownerId": 2,
          "address": "123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": 37.7645358,
          "lng": 110.6547897,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": 120
        },
        {
          "ownerId": 3,
          "address": "123 Disney Lane",
          "city": "San Francisco",
          "state": "California",
          "country": "United States of America",
          "lat": 47.7645358,
          "lng": -126.8930327,
          "name": "App Academy",
          "description": "Place where web developers are created",
          "price": 100
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
