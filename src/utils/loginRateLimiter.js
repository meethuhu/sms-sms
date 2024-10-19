const NodeCache = require('node-cache');
require('dotenv').config();

const loginAttemptCache = new NodeCache({ stdTTL: 86400 }); // 设置24小时过期

const DAILY_LOGIN_ATTEMPTS_PER_IP = parseInt(process.env.DAILY_LOGIN_ATTEMPTS_PER_IP, 10) || 10;

function canAttemptLogin(ip) {
  const attempts = loginAttemptCache.get(ip) || 0;
  if (attempts >= DAILY_LOGIN_ATTEMPTS_PER_IP) {
    return false;
  }
  loginAttemptCache.set(ip, attempts + 1);
  return true;
}

function resetLoginAttempts(ip) {
  loginAttemptCache.set(ip, 0);
}

module.exports = { canAttemptLogin, resetLoginAttempts };
