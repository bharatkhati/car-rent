"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VehicleType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VehicleType.hasMany(models.Vehicle, {
        foreignKey: "typeId",
        as: "Vehicles", // optional alias for easier queries
      });
    }
  }
  VehicleType.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      wheelCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 4,
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: "VehicleType",
      tableName: "VehicleTypes",
    }
  );
  return VehicleType;
};
