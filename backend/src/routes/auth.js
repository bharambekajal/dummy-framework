const express = require('express');
const { login } = require('../controller/adminController/authController');
const router = express.Router();

router.post('/login', login);

module.exports = router;
