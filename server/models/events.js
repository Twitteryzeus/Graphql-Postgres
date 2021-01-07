"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Events.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  Events.init(
    {
      name: DataTypes.STRING,
      invites: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "Events",
    }
  );
  return Events;
};
