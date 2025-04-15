
const express = require('express');
const router = express.Router()

const {dashboardinfomation } = require('../controller/dashboardController');
const adminProtect = require('../middleware.js/adminMiddleware');

router.get("/admin" , adminProtect, dashboardinfomation )

module.exports = router 