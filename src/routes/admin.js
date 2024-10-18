const express = require('express');
const router = express.Router();
const { updateNetdiskInfo, getUsers } = require('../controllers/adminController');

router.post('/update-netdisk', updateNetdiskInfo);
router.get('/users', getUsers);

module.exports = router;
