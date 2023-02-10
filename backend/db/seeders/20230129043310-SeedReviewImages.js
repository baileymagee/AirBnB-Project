"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "ReviewImages";
		return queryInterface.bulkInsert(
			options,
        [
          {
            reviewId: 1,
            url: 'http://cdn.home-designing.com/wp-content/uploads/2008/10/all_white_all_good_by_incrediblepoo.jpg'
          },
          {
            reviewId: 2,
            url: 'http://cdn.home-designing.com/wp-content/uploads/2008/10/living_room3_by_ozhan.jpg'
          },
          {
            reviewId: 3,
            url: 'http://cdn.home-designing.com/wp-content/uploads/2008/10/m_living_room_1_by_semsa.jpg'
          },
          {
            reviewId: 4,
            url: 'http://cdn.home-designing.com/wp-content/uploads/2008/10/kitchen_living_by_diegoreales.jpg'
          },
          {
            reviewId: 5,
            url: 'http://cdn.home-designing.com/wp-content/uploads/2008/10/living_and_dining_view_2_by_cmjohncheng.jpg'
          }
      ],
			{}
		);
	},
      down: async (queryInterface, Sequelize) => {
        options.tableName = "ReviewImages";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
          options,
          {
          reviewId: { [Op.in]: [1, 2, 3] }
          },
          {}
        );
      }
    };
