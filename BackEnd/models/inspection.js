"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inspection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Inspection.init(
    {
      result: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      sampled: DataTypes.BOOLEAN,
      premisesId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Inspection",
    }
  );
  return Inspection;
};
