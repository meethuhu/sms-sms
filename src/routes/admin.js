const express = require('express');
const router = express.Router();
const { updateNetdiskInfo, getUsers, login } = require('../controllers/adminController');

// 添加管理员身份验证中间件
const adminAuthMiddleware = (req, res, next) => {
  if (req.session.isAdminAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: '未经授权' });
  }
};

router.post('/login', login);
router.post('/update-netdisk', adminAuthMiddleware, updateNetdiskInfo);
router.get('/users', adminAuthMiddleware, getUsers);

module.exports = router;
