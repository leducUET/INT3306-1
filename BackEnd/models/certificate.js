"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Certificate.belongsTo(models.Premises, { foreignKey: "premisesId" });
    }
  }
  Certificate.init(
    {
      code: DataTypes.STRING,
      issueDate: DataTypes.DATE,
      expirationDate: DataTypes.DATE,
      revoked: DataTypes.BOOLEAN,
      image: DataTypes.BLOB,
      premisesId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Certificate",
    }
  );
  return Certificate;
};
