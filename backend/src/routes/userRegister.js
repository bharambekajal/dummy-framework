const express = require('express');
const router = express.Router();
const {userRegister,getUserByID, getUserByEmail} = require('../controller/userController/userRegister');
const { login } = require('../controller/userController/authController');

router.post('/register', userRegister)
router.get('/get/:id', getUserByID)
router.get('/get/:email', getUserByEmail)
router.post('/login',login)

module.exports = router;
