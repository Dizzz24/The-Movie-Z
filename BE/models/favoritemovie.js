'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteMovie extends Model {

    static associate(models) {
      FavoriteMovie.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  FavoriteMovie.init({
    title: DataTypes.STRING,
    overview: DataTypes.STRING,
    poster_path: DataTypes.STRING,
    backdrop_path: DataTypes.STRING,
    release_date: DataTypes.STRING,
    vote_average: DataTypes.STRING,
    userId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'FavoriteMovie',
  });
  return FavoriteMovie;
};