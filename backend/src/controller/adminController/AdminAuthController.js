const { response } = require('express');
const pool = require('../../conifg/db.js')
const queries = require('../../conifg/queries');
const { sendErrorResponse, sendSuccessResponse } = require('../../utils/helpers/responseHandler');
const { generateToken } = require('../../utils/middleware/authMiddleware');
const { messages,httpCodes } = require('../../constants/index.js')

const AdminLogin = async (req, res) => {

    const { email, password } = req.body;

    try {
      
      const admin = await pool.query(queries.getAdmin,[email])

      const adminData = admin.rows[0]
      console.log(adminData)
      
      if (!adminData) return sendErrorResponse(res,messages.USER.NOT_FOUND, httpCodes.NOT_FOUND)
      
      if (adminData.password != password) return sendErrorResponse(res, messages.AUTH.INCORRECT_PASSWORD, httpCodes.UNAUTHORIZED);

      const token = generateToken(adminData);

      return sendSuccessResponse(res,messages.AUTH.LOGIN_SUCCESS,{ user: adminData, token: token },httpCodes.CREATED)

    } catch (error) {
      console.error(error);
      return sendErrorResponse(error, messages.APP.SERVER_ERROR, httpCodes.INTERNAL_SERVER_ERROR);

    }
  };

  module.exports =  AdminLogin;
  