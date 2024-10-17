const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  lastLoginTime: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = User;
