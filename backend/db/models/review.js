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
      Review.hasMany(models.Image, { foreignKey: 'reviewId' })
      Review.belongsTo(models.User, { foreignKey: 'userId' })
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' })
    }
  }
  Review.init({
    review: {
      tpye: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10]
      }
    },
    stars: {
      tpye: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    userId: {
      tpye: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      tpye: DataTypes.INTEGER,
      allowNull: false
    }
}, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};