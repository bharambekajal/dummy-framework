const express = require('express');
const router = express.Router();
const {userRegister,getUserByID, getUserByEmail,getRegisteredUserById,getUserByNameOrUniqueId,getRegisteredUser,statusUpdate} = require('../controller/userController/userRegister');
const { login ,forgotPassword,resetPassword} = require('../controller/userController/authController');


router.post('/register', userRegister)
router.get('/get/:id', getUserByID)
router.get('/get/:email', getUserByEmail)
router.get('/getUser/:id', getRegisteredUserById)
router.post('/login',login)
router.get('/search/:id',getUserByNameOrUniqueId)
router.get('/allUser',getRegisteredUser)
router.patch('/:userId/status',statusUpdate)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:id/:token',resetPassword)

module.exports = router;
