const Core = require('@alicloud/pop-core');
const SmsLog = require('../models/SmsLog');
require('dotenv').config();
const logger = require('../utils/logger'); // 假设您有一个日志工具

const client = new Core({
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

async function sendSms(phoneNumber, code) {
  const params = {
    PhoneNumbers: phoneNumber,
    SignName: process.env.ALIYUN_SMS_SIGN_NAME,
    TemplateCode: process.env.ALIYUN_SMS_TEMPLATE_CODE,
    TemplateParam: JSON.stringify({ code })
  };

  try {
    const result = await client.request('SendSms', params, { method: 'POST' });
    if (result.Code === 'OK') {
      await SmsLog.create({
        phoneNumber,
        code,
        sentAt: new Date(),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5分钟后过期
      });
      return true;
    }
    logger.error(`SMS sending failed: ${result.Code} - ${result.Message}`);
    return false;
  } catch (error) {
    logger.error('发送短信失败:', error);
    return false;
  }
}

module.exports = { sendSms };
