'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey:'ownerId', as:"Owner", onDelete: 'CASCADE'})
      Spot.hasMany(models.SpotImage, {foreignKey:'spotId'})
      Spot.hasOne(models.SpotImage, {foreignKey: 'spotId', as: 'previewImage'})
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      references: {model:'Users'},
      onDelete: 'CASCADE'
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
