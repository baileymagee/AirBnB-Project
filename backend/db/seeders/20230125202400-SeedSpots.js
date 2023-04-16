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
          "address": "1225 Russia Rd.",
          "city": "Unknown",
          "state": "Unknown",
          "country": "Russia",
          "lat": 58.7645358,
          "lng": 139.9827327,
          "name": "World Annihilation",
          "description": "Hidden lair in the mountains of Russia!",
          "price": 12999
        },
        {
          "ownerId": 2,
          "address": "Unknown",
          "city": "Unknown",
          "state": "Unknown",
          "country": "Underworld",
          "lat": 37.7645358,
          "lng": 110.6547897,
          "name": "Underworld",
          "description": "A nice lair in the underworld no one will ever find!",
          "price": 15999
        },
        {
          "ownerId": 3,
          "address": "1564 Asulym",
          "city": "Gotham",
          "state": "New Jersey",
          "country": "United States of America",
          "lat": 47.7645358,
          "lng": -126.8930327,
          "name": "Joker Town",
          "description": "A nice place for good laughs and evil times.",
          "price": 20999
        },
        {
          "ownerId": 4,
          "address": "152 Upstate",
          "city": "Rome",
          "state": "New York",
          "country": "United States of America",
          "lat": 47.7645358,
          "lng": -126.8930327,
          "name": "Castle Doom",
          "description": "A place to get away and plan world domination!",
          "price": 35999
        },
        {
          "ownerId": 5,
          "address": "15 Death star",
          "city": "Unknown",
          "state": "Galaxy",
          "country": "Space",
          "lat": 47.7645358,
          "lng": -126.8930327,
          "name": "Death Star",
          "description": "Very handy to fight off rebels and destory whole planets! Comes with an army!",
          "price": 50999
        },
        {
          "ownerId": 6,
          "address": "12 World Tree",
          "city": "Balargarde",
          "state": "Jotunheim",
          "country": "World Tree",
          "lat": 47.7645358,
          "lng": -126.8930327,
          "name": "Loki's Palace",
          "description": "A very chilly place, very secluded with a world gate to take you to anywhere!",
          "price": 25999
        },
        {
          "ownerId": 3,
          "address": "Arkham Asylum Lane",
          "city": "Gotham",
          "state": "New Jersey",
          "country": "United States of America",
          "lat": 47.7645358,
          "lng": -126.8930327,
          "name": "Arkham Asylum",
          "description": "A luxury prison comes with a fully army of crazy criminals ready to do evil with you!",
          "price": 13999
        },
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
