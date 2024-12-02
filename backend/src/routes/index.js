const { Router } = require('express');
const { endpoints } = require('../constants/index.js');
const { adminRouter } = require('./admin/index.js');
const { BusinesScreen1Router } = require('./businessScreen/index.js');
const {UserRouter} =  require('./user/index.js');
const { verifyToken } = require('../utils/middleware/authMiddleware.js');

const router = Router();

router.use(endpoints.ADMIN, adminRouter);

router.use(endpoints.SCREENS,verifyToken, BusinesScreen1Router);

router.use(endpoints.USER,UserRouter)

module.exports= { router };
