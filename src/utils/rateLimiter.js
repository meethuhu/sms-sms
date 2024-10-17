const NodeCache = require('node-cache');
require('dotenv').config();

const smsCache = new NodeCache();
const ipCache = new NodeCache({ stdTTL: 86400 }); // 设置24小时过期

const DAILY_SMS_LIMIT_PER_IP = parseInt(process.env.DAILY_SMS_LIMIT_PER_IP, 10) || 10;

function canSendSms(phoneNumber, ip) {
  const now = Date.now();
  
  // 检查手机号频率限制
  const lastSentTime = smsCache.get(phoneNumber);
  if (lastSentTime && now - lastSentTime < 60000) {
    return false;
  }
  
  // 检查IP每日限制
  const ipSentCount = ipCache.get(ip) || 0;
  if (ipSentCount >= DAILY_SMS_LIMIT_PER_IP) {
    return false;
  }
  
  // 更新缓存
  smsCache.set(phoneNumber, now);
  ipCache.set(ip, ipSentCount + 1);
  
  return true;
}

module.exports = { canSendSms };
