const { response } = require('express');
const pool = require('../../conifg/db')
const queries = require('../../conifg/queries');
const { sendErrorResponse, sendSuccessResponse } = require('../../utils/helpers/responseHandler');
const { generateToken } = require('../../utils/middleware/authMiddleware');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await pool.query(queries.getAdmin,[username])

      const userData = user.rows[0]
      
      if (!userData) return sendErrorResponse(res,'User not found',404)
      
      if (userData.password != password) return sendErrorResponse(res, 'unAuthorized', 401);

      const token = generateToken(userData);

      // return sendSuccessResponse(res,'User loggedIn successfully',{ user: userData, auth: token },200)

       res.json({ user: userData, auth: token });
    } catch (error) {
      console.error(error);
      // return sendErrorResponse(error, 'Server error', 500);
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = { login};
  