'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.ReviewImage, {foreignKey:'reviewId'})
      Review.belongsTo(models.User, {foreignKey:'userId',  onDelete: 'CASCADE'})
      Review.belongsTo(models.Spot, {foreignKey:'spotId',  onDelete: 'CASCADE'})
    }
  }
  Review.init({
    spotId: {
      type:DataTypes.INTEGER,
      references: {model: 'Spots'},
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {model: 'Users'},
      onDelete: 'CASCADE'
    },
    review: DataTypes.TEXT,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
