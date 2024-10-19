require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const netdiskRoutes = require('./routes/netdisk');
const sequelize = require('./config/database');
const NetdiskInfo = require('./models/NetdiskInfo');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 添加 session 中间件
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // 在生产环境中应设置为 true
}));

app.use('/api/auth', authRoutes);
app.use('/api/netdisk', netdiskRoutes);
app.use('/api/admin', adminRoutes);

// 更新 /@admin 路由
app.get('/@admin', (req, res) => {
  if (req.session.isAdminAuthenticated) {
    res.sendFile(path.join(__dirname, '../public/@admin.html'));
  } else {
    res.redirect('/@password');
  }
});

// 添加 /@password 路由
app.get('/@password', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/@password.html'));
});

// 防止直接访问 @admin.html
app.get('/@admin.html', (req, res) => {
  res.redirect('/@admin');
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log('正在连接到数据库...');
    // console.log(`数据库主机: ${process.env.DB_HOST}`);
    // console.log(`数据库用户: ${process.env.DB_USER}`);
    // console.log(`数据库名称: ${process.env.DB_NAME}`);
    await sequelize.authenticate();
    console.log('数据库连接成功');
    await sequelize.sync();
    console.log('数据库同步完成');
    
    app.listen(PORT, () => {
      console.log(`服务器运行在 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('无法启动服务器:', error);
  }
}

startServer();
