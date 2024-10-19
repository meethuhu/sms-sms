# 短信验证码登录系统

## 项目概述

这是一个基于 Node.js 和 Express 框架开发的短信验证码登录系统。系统提供用户登录、管理员后台等功能，使用 MySQL 数据库存储数据，并集成了阿里云短信服务。

## 主要文件及其作用

### 配置文件
- `.env`: 存储环境变量，包括数据库连接信息、API密钥等敏感信息。
- `.dockerignore`: 指定在构建 Docker 镜像时要忽略的文件和目录。

### 数据库
- `setup.sql`: 数据库初始化脚本，包含创建表和初始数据的 SQL 语句。

### 模型
- `src/models/User.js`: 定义用户模型，包含用户信息的数据结构。
- `src/models/SmsLog.js`: 定义短信日志模型，记录短信发送的相关信息。

### 控制器
- `src/controllers/authController.js`: 处理用户认证相关的逻辑，如发送和验证短信验证码。
- `src/controllers/adminController.js`: 处理管理员相关的操作，如用户查询和网盘信息管理。

### 工具
- `src/utils/logger.js`: 日志工具，用于记录应用程序的各种日志信息。

### 前端
- `public/@password.html`: 管理员登录页面的 HTML 文件。

## 安装和设置

1. 克隆仓库：   ```
   git clone [仓库URL]   ```

2. 安装依赖：   ```
   npm install   ```

3. 初始化数据库：
   使用 `setup.sql` 脚本创建必要的数据库和表。

4. 启动应用：   ```
   npm start   ```
