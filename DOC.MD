# 短信验证码登录系统开发文档

## 项目概述

本项目是一个基于短信验证码的登录系统，包含用户登录、管理员后台等功能。系统使用 Node.js 和 Express 框架开发，使用 MySQL 数据库存储数据，并集成了阿里云短信服务。

## 技术栈

- 后端：Node.js, Express
- 数据库：MySQL
- ORM：Sequelize
- 前端：HTML, CSS, JavaScript
- HTTP 客户端：Axios
- 短信服务：阿里云短信

## 项目结构
```
project-root/
│
├── public/
│ ├── css/
│ ├── js/
│ ├── @admin.html
│ ├── @password.html
│ └── index.html
│
├── src/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── app.js
│
├── .env
├── combined_setup.sql
└── package.json
```

## 主要功能模块

1. 用户登录（短信验证码）
2. 管理员登录
3. 用户查询
4. 网盘信息管理

## 数据库设计

主要表结构：

1. Users：存储用户信息
2. SmsLogs：存储短信发送记录
3. NetdiskInfo：存储网盘信息

详细的表结构请参考 `combined_setup.sql` 文件。

## API 接口

### 用户相关

- POST /api/auth/send-code：发送短信验证码
- POST /api/auth/verify-code：验证短信验证码

### 管理员相关

- POST /api/admin/login：管理员登录
- GET /api/admin/users：获取用户列表
- POST /api/admin/update-netdisk：更新网盘信息

### 网盘相关

- GET /api/netdisk/info：获取网盘信息

## 安全措施

1. 短信发送频率限制
2. 管理员登录尝试次数限制
3. Session 认证
4. 环境变量管理敏感信息

## 部署说明

1. 安装 Node.js 和 MySQL
2. 克隆项目代码
3. 运行 `npm install` 安装依赖
4. 配置 `.env` 文件
5. 执行 `combined_setup.sql` 初始化数据库
6. 运行 `node src/app.js` 启动服务器

## 注意事项

- 确保 `.env` 文件中的敏感信息安全
- 定期更新依赖包以修复潜在的安全漏洞
- 在生产环境中启用 HTTPS
- 定期备份数据库

文档最后更新时间：[当前日期]