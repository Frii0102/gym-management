'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Training extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Training.init({
    title: DataTypes.STRING,
    start_time: DataTypes.DATE,
    duration_min: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Training',
  });
  return Training;
};