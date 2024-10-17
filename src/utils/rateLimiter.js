const NodeCache = require('node-cache');

const smsCache = new NodeCache();
const ipCache = new NodeCache();

function canSendSms(phoneNumber, ip) {
  const now = Date.now();
  
  // 检查手机号频率限制
  const lastSentTime = smsCache.get(phoneNumber);
  if (lastSentTime && now - lastSentTime < 60000) {
    return false;
  }
  
  // 检查IP频率限制
  const ipSentCount = ipCache.get(ip) || 0;
  if (ipSentCount >= 5) {
    return false;
  }
  
  // 更新缓存
  smsCache.set(phoneNumber, now);
  ipCache.set(ip, ipSentCount + 1, 600); // 10分钟过期
  
  return true;
}

module.exports = { canSendSms };
