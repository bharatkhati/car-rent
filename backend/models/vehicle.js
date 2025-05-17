"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
      Vehicle.belongsTo(models.VehicleType, {
        foreignKey: "typeId",
        as: "VehicleType", // optional alias
      });
      Vehicle.hasMany(models.Booking, {
        foreignKey: "vehicleId",
        as: "Bookings", // optional alias
      });
    }
  }
  Vehicle.init(
    {
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "VehicleTypes",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Vehicle",
      tableName: "Vehicles",
    }
  );
  return Vehicle;
};
