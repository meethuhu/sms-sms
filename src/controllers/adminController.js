const NetdiskInfo = require('../models/NetdiskInfo');
const User = require('../models/User');
const { Op } = require('sequelize');

exports.updateNetdiskInfo = async (req, res) => {
    try {
        const { share_link, password } = req.body;
        await NetdiskInfo.update({ share_link, password }, { where: {} });
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
        const sortBy = req.query.sortBy || 'lastLoginTime';
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const offset = (page - 1) * pageSize;

        let whereClause = {};
        if (startDate && endDate) {
            whereClause[sortBy] = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        const { count, rows } = await User.findAndCountAll({
            attributes: ['phoneNumber', 'lastLoginTime', 'createdAt'],
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
