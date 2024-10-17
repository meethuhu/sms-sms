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

    // 检查 NetdiskInfo 表是否为空，如果为空则插入初始数据
    const count = await NetdiskInfo.count();
    if (count === 0) {
      await NetdiskInfo.create({
        sharePassword: 'gNTv',
        netdiskLink: 'https://pan.quark.cn/s/57e3e9071826'
      });
      console.log('初始网盘信息已插入');
    }

    app.listen(PORT, () => {
      console.log(`服务器运行在 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('无法启动服务器:', error);
  }
}

startServer();
