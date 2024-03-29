"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Reviews";
		return queryInterface.bulkInsert(
			options,
        [
          {
            "userId": 2,
            "spotId": 1,
            "review": "This spot was so-so!",
            "stars": 2
          },
          {
            "userId": 3,
            "spotId": 1,
            "review": "This was an awesome spot!",
            "stars": 5
          },
          {
            "userId": 1,
            "spotId": 3,
            "review": "This was a great spot!",
            "stars": 4
          },
          {
            "userId": 1,
            "spotId": 2,
            "review": "This was an awesome spot!",
            "stars": 5
          },
          {
            "userId": 2,
            "spotId": 3,
            "review": "This was a great spot!",
            "stars": 4
          }
      ],
			{}
		);
	},
      down: async (queryInterface, Sequelize) => {
        options.tableName = "Reviews";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
          options,
          {
          spotId: { [Op.in]: [1, 2, 3] }
          },
          {}
        );
      }
    };
