"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Premises extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Premises.init(
    {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      type: DataTypes.STRING,
      addressId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Premises",
    }
  );
  return Premises;
};
