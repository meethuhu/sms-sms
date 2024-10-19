const { sendSms } = require('../services/smsService');
const { canSendSms } = require('../utils/rateLimiter');
const User = require('../models/User');
const SmsLog = require('../models/SmsLog');
const { Op } = require('sequelize');
const logger = require('../utils/logger');

async function sendCode(req, res) {
  const { phoneNumber } = req.body;
  const ip = req.ip;

  if (!canSendSms(phoneNumber, ip)) {
    return res.status(429).json({ message: '发送频率过高或已达到每日限制，请稍后再试' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    const success = await sendSms(phoneNumber, code);
    if (success) {
      res.json({ message: '验证码已发送' });
    } else {
      logger.error(`Failed to send SMS to ${phoneNumber}`);
      res.status(500).json({ message: '发送验证码失败' });
    }
  } catch (error) {
    logger.error('Error in sendCode:', error);
    res.status(500).json({ message: '发送验证码失败' });
  }
}

async function verifyCode(req, res) {
  const { phoneNumber, code } = req.body;

  const smsLog = await SmsLog.findOne({
    where: {
      phoneNumber,
      code,
      isUsed: false,
      expiresAt: { [Op.gt]: new Date() }
    }
  });

  if (!smsLog) {
    return res.status(400).json({ message: '验证码无效或已过期' });
  }

  await smsLog.update({ isUsed: true });

  const now = new Date();
  const [user, created] = await User.findOrCreate({
    where: { phoneNumber },
    defaults: { lastLoginTime: now, createdAt: now }
  });

  if (!created) {
    await user.update({ lastLoginTime: now });
  }

  res.json({ message: '验证成功' });
}

module.exports = { sendCode, verifyCode };
