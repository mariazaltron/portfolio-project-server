"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sharedWatchList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      sharedWatchList.belongsToMany(models.user, {
        as: "sharedWatchListUsers",
        through: "sharedWatchListUsers",
        foreignKey: "userId",
      });
      sharedWatchList.belongsToMany(models.serie, {
        as: "sharedWatchListSeries",
        through: "sharedWatchListSeries",
        foreignKey: "serieId",
      });
    }
  }
  sharedWatchList.init(
    {
      name: DataTypes.STRING,
      owner: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "sharedWatchList",
    }
  );
  return sharedWatchList;
};
