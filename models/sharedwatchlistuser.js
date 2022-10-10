"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sharedWatchListUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  sharedWatchListUser.init(
    {
      userId: DataTypes.INTEGER,
      sharedWatchListId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "sharedWatchListUser",
    }
  );
  return sharedWatchListUser;
};
