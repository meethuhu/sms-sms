const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NetdiskInfo = sequelize.define('NetdiskInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  share_link: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'netdiskinfo',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: false
});

module.exports = NetdiskInfo;
