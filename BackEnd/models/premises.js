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
      Premises.hasOne(models.Address, { foreignKey: "premisesId" });
      Premises.hasOne(models.Certificate, { foreignKey: "premisesId" });
      Premises.hasMany(models.Inspection, { foreignKey: "premisesId" });
    }
  }
  Premises.init(
    {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Premises",
    }
  );
  return Premises;
};
