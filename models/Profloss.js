const { Model, DataTypes } = require('sequelize');
const dataTypes = require('sequelize/lib/data-types');
const sequelize = require('../config/connection');

class Profloss extends Model {}

Profloss.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userid:{
      type: dataTypes.INTEGER,
      references:{
        model:'User',
        key: 'id',
      }
    },
    categoryid:{
      type: dataTypes.INTEGER,
      references:{
        model:'Category',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'profloss'
  }
);
module.exports = Profloss;