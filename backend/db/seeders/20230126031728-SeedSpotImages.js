"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "SpotImages";
		return queryInterface.bulkInsert(
			options,
        [
          {
            spotId: 1,
            url: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2022/08/Big-Sur.jpg",
            preview: true
          },
          {
            spotId: 2,
            url: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2022/08/image19.png",
            preview: true
          },
          {
            spotId: 3,
            url: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2022/08/Los-Banos-3-1.png",
            preview: true
          }
      ],
			{}
		);
	},
      down: async (queryInterface, Sequelize) => {
        options.tableName = "SpotImages";
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
