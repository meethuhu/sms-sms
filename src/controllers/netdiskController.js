const NetdiskInfo = require('../models/NetdiskInfo');

async function getNetdiskInfo(req, res) {
  try {
    console.log('正在获取网盘信息...');
    const netdiskInfo = await NetdiskInfo.findOne();
    console.log('查询结果:', netdiskInfo);
    
    if (netdiskInfo) {
      res.json({
        sharePassword: netdiskInfo.sharePassword,
        netdiskLink: netdiskInfo.netdiskLink
      });
    } else {
      console.log('未找到网盘信息');
      res.status(404).json({ message: '网盘信息未找到' });
    }
  } catch (error) {
    console.error('获取网盘信息失败:', error);
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
}

module.exports = { getNetdiskInfo };
