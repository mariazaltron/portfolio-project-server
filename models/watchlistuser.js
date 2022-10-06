'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class watchListUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  watchListUser.init({
    userId: DataTypes.INTEGER,
    sharedWatchListId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'watchListUser',
  });
  return watchListUser;
};