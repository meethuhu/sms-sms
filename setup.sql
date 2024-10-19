-- 创建数据库
CREATE DATABASE IF NOT EXISTS smsdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE smsdb;

-- 创建用户表
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phoneNumber VARCHAR(20) NOT NULL UNIQUE,
  lastLoginTime DATETIME NOT NULL,
  createdAt DATETIME NOT NULL
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

-- 创建新的网盘信息表
CREATE TABLE `netdiskinfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `share_link` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 插入初始网盘信息
INSERT INTO `netdiskinfo` (`share_link`) 
VALUES ('https://pan.quark.cn/');

-- 创建索引以提高查询性能
CREATE INDEX idx_phone_number ON Users (phoneNumber);
CREATE INDEX idx_phone_code ON SmsLogs (phoneNumber, code);
CREATE INDEX idx_expires_at ON SmsLogs (expiresAt);
