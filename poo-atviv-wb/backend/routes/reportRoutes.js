const express = require('express');
const { outOfStockReport } = require('../controllers/reportController');
const router = express.Router();

router.get('/out-of-stock', outOfStockReport);

module.exports = router;
