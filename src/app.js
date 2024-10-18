const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const netdiskRoutes = require('./routes/netdisk');
const sequelize = require('./config/database');
const NetdiskInfo = require('./models/NetdiskInfo');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/auth', authRoutes);
app.use('/api/netdisk', netdiskRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
    
    // 同步所有模型
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
