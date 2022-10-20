"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class watchList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      watchList.belongsToMany(models.user, {
        through: "sharedWatchLists",
        foreignKey: "watchListId",
      });
      watchList.belongsToMany(models.serie, {
        through: "watchListSeries",
        foreignKey: "watchListId",
      });
    }
  }
  watchList.init(
    {
      name: DataTypes.STRING,
      owner: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "watchList",
    }
  );
  return watchList;
};
