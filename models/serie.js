"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class serie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      serie.belongsToMany(models.sharedWatchList, {
        through: "sharedWatchListSeries",
        foreignKey: "serieId",
      });
    }
  }
  serie.init(
    {
      name: DataTypes.STRING,
      genres: DataTypes.STRING,
      number_of_seasons: DataTypes.INTEGER,
      poster_path: DataTypes.TEXT,
      networks: DataTypes.STRING,
      vote_average: DataTypes.FLOAT,
      overview: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "serie",
    }
  );
  return serie;
};
