const NetdiskInfo = require('../models/NetdiskInfo');
const User = require('../models/User');
const { Op } = require('sequelize');
const moment = require('moment-timezone');
const { canAttemptLogin, resetLoginAttempts } = require('../utils/loginRateLimiter');
require('dotenv').config();

exports.login = (req, res) => {
    const ip = req.ip;
    if (!canAttemptLogin(ip)) {
        return res.status(429).json({ success: false, message: '登录尝试次数过多，请稍后再试' });
    }

    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
        req.session.isAdminAuthenticated = true;
        resetLoginAttempts(ip); // 重置尝试次数
        res.json({ success: true });
    } else {
        res.json({ success: false, message: '密码错误' });
    }
};

exports.updateNetdiskInfo = async (req, res) => {
    try {
        const { share_link } = req.body;
        await NetdiskInfo.update({ share_link }, { where: {} });
        res.json({ message: '网盘信息更新成功' });
    } catch (error) {
        console.error('更新网盘信息失败:', error);
        res.status(500).json({ message: '更新网盘信息失败' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 50;
        const sortBy = req.query.sortBy || 'createdAt';  // 默认排序字段改为 createdAt
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const offset = (page - 1) * pageSize;

        let whereClause = {};
        if (startDate && endDate) {
            whereClause[sortBy] = {
                [Op.between]: [
                    moment.tz(startDate, "Asia/Shanghai").startOf('day').toDate(),
                    moment.tz(endDate, "Asia/Shanghai").endOf('day').toDate()
                ]
            };
        }

        const { count, rows } = await User.findAndCountAll({
            attributes: ['id', 'phoneNumber', 'lastLoginTime', 'createdAt'],
            where: whereClause,
            order: [[sortBy, 'DESC']],
            limit: pageSize,
            offset: offset
        });

        res.json({
            users: rows,
            totalPages: Math.ceil(count / pageSize)
        });
    } catch (error) {
        console.error('获取用户列表失败:', error);
        res.status(500).json({ message: '获取用户列表失败' });
    }
};
