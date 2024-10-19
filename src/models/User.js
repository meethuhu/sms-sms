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
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false // 禁用 Sequelize 自动管理的 createdAt 和 updatedAt
});

module.exports = User;
