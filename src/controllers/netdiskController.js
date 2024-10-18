const NetdiskInfo = require('../models/NetdiskInfo');

async function getNetdiskInfo(req, res) {
  try {
    const netdiskInfo = await NetdiskInfo.findOne();
    
    if (netdiskInfo) {
      res.json({
        password: netdiskInfo.password,
        share_link: netdiskInfo.share_link
      });
    } else {
      res.status(404).json({ message: '网盘信息未找到' });
    }
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
}

module.exports = { getNetdiskInfo };
