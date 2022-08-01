'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: 'userId' })
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId' })
    }
  }
  Booking.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATETIME,
      validate: {
        isBeforeStartDate(value) {
          if (this.endDate < value) {
            throw new Error('Invalid Date')
          }
        }
      }
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATETIME,
      validate: {
        isAfterStartDate(value) {
          if (this.startDate > value) {
            throw new Error('Invalid Date')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};