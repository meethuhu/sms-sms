const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NetdiskInfo = sequelize.define('NetdiskInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sharePassword: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  netdiskLink: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
});

module.exports = NetdiskInfo;
