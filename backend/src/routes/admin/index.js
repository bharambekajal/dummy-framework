const { Router } = require('express');
const {AdminLogin, getAdmin,updateAdmin } = require('../../controller/index.js');
const { endpoints } = require('../../constants/endpoints.js');

const adminRouter = Router();

adminRouter.post(endpoints.LOGIN, AdminLogin);
adminRouter.get(endpoints.GET_ADMIN, getAdmin);
adminRouter.put(endpoints.UPDATE_ADMIN, updateAdmin);

// adminRouter.get(endpoints.LOGOUT, logoutUser);

module.exports = { adminRouter };
