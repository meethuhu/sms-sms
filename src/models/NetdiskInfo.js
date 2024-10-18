const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NetdiskInfo = sequelize.define('NetdiskInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  shareLink: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'share_link'
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'netdiskinfo',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: false
});

module.exports = NetdiskInfo;
