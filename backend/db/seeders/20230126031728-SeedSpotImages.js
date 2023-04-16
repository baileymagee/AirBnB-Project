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
          url: "https://footeandfriendsonfilm.com/wp-content/uploads/2019/05/you-only-live-twice.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://cdna.artstation.com/p/assets/images/images/000/351/032/medium/ronald-fong-ffcc031a5b23e9a5c4cf9a697bce8a47ca7b5695.jpg?1418350895",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.pinimg.com/originals/2f/66/91/2f66914bbc441069375481e86f7e752c.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://comicvine.gamespot.com/a/uploads/square_medium/5/57906/1085238-castle_doom.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://lumiere-a.akamaihd.net/v1/images/Death-Star-I-copy_36ad2500.jpeg?region=0%2C31%2C1600%2C800",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://i.redd.it/o9hztkxvg4961.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://legendary-digital-network-assets.s3.amazonaws.com/wp-content/uploads/2022/03/12181226/Arkham-Asylum-comics.jpg",
          preview: true,
        },
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
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
