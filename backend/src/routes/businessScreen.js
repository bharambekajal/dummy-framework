const express = require('express');
const router = express.Router();
const businesScreen1= require('../controller/adminController/businessScreen1')

router.post('/businesScreens',businesScreen1)

module.exports = router;