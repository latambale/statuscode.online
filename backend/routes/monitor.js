const express = require('express');
const monitorController = require('../controllers/monitorController');
const router = express.Router();

router.post('/', monitorController.startMonitoring);
router.post('/check', monitorController.checkUrl);

module.exports = router;
