const express = require('express');
const router = express.Router();
const { getNetdiskInfo } = require('../controllers/netdiskController');

router.get('/info', getNetdiskInfo);

module.exports = router;
