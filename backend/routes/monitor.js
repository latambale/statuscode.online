const express = require('express');
const monitorController = require('../controllers/monitorController');
const router = express.Router();

router.post('/', monitorController.addMonitor);
router.post('/check', monitorController.checkUrl);
router.delete('/:id', monitorController.deleteMonitor);

module.exports = router;
