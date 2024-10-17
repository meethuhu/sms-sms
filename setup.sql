-- 创建数据库
CREATE DATABASE IF NOT EXISTS smsdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE smsdb;

-- 创建用户表
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phoneNumber VARCHAR(20) NOT NULL UNIQUE,
  lastLoginTime DATETIME NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

-- 创建短信日志表
CREATE TABLE IF NOT EXISTS SmsLogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phoneNumber VARCHAR(20) NOT NULL,
  code VARCHAR(6) NOT NULL,
  sentAt DATETIME NOT NULL,
  expiresAt DATETIME NOT NULL,
  isUsed BOOLEAN DEFAULT FALSE,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

-- 插入一些测试数据（可选）
INSERT INTO Users (phoneNumber, lastLoginTime, createdAt, updatedAt)
VALUES 
('13800000000', NOW(), NOW(), NOW()),
('13900000000', NOW(), NOW(), NOW());

INSERT INTO SmsLogs (phoneNumber, code, sentAt, expiresAt, isUsed, createdAt, updatedAt)
VALUES 
('13800000000', '123456', NOW(), DATE_ADD(NOW(), INTERVAL 5 MINUTE), FALSE, NOW(), NOW()),
('13900000000', '654321', NOW(), DATE_ADD(NOW(), INTERVAL 5 MINUTE), FALSE, NOW(), NOW());

-- 创建索引以提高查询性能
CREATE INDEX idx_phone_number ON Users (phoneNumber);
CREATE INDEX idx_phone_code ON SmsLogs (phoneNumber, code);
CREATE INDEX idx_expires_at ON SmsLogs (expiresAt);

-- 创建网盘信息表
CREATE TABLE IF NOT EXISTS NetdiskInfo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sharePassword VARCHAR(50) NOT NULL,
  netdiskLink VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL
);

-- 插入初始网盘信息
INSERT INTO NetdiskInfo (sharePassword, netdiskLink, createdAt, updatedAt)
VALUES 
('gNTv', 'https://pan.quark.cn/s/57e3e9071826', NOW(), NOW());
