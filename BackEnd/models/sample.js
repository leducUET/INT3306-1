"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sample.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      agencies: DataTypes.STRING,
      result: DataTypes.STRING,
      sendingDate: DataTypes.DATE,
      inspeactionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Sample",
    }
  );
  return Sample;
};
