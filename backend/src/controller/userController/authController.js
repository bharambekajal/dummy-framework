const { response } = require('express');
const pool = require('../../conifg/db');
const bcrypt = require('bcrypt');
const queries = require('../../conifg/queries');
const { sendErrorResponse } = require('../../utils/helpers/responseHandler');
const { generateToken } = require('../../utils/middleware/authMiddleware')

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await pool.query(queries.getUserByEmailId,[email])

      const userData = user.rows[0]
      
      if (!userData) return sendErrorResponse(res,'User not found',404);

      const validPassword = await bcrypt.compare(password, userData.password);
      if (!validPassword) return sendErrorResponse(res,'Invalid username or password',400);

      const token = generateToken(userData);

      res.json({ user: userData, user_token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = { login };
  