const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SmsLog = sequelize.define('SmsLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sentAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = SmsLog;
