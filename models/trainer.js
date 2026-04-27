'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trainer.init({
    full_name: DataTypes.STRING,
    specialization: DataTypes.STRING,
    bio: DataTypes.TEXT,
    photo_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trainer',
  });
  return Trainer;
};