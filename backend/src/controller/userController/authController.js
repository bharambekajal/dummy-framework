const { express } = require('express');
const pool = require('../../conifg/db');
const bcrypt = require('bcrypt');
const queries = require('../../conifg/queries');
const { sendErrorResponse } = require('../../utils/helpers/responseHandler');
const { generateToken } = require('../../utils/middleware/authMiddleware')
const {sendLink} = require('../../conifg/sendMail');
const jwt = require('jsonwebtoken');

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
    
  const forgotPassword = async (req,res)=>{
    const {email} = req.body;
    console.log(email)

      const user = await pool.query(queries.getUserByEmailId,[email])

      const token = generateToken(user.rows[0])

      const userId = user.rows[0].id;
      const registrationLink = `http://localhost:3000/reset-password/${userId}/${token}`;

      console.log({registrationLink})

      await sendLink(email,registrationLink);

      if(!user){
        return res.send({status:"user not defined"})
      }
    };
    const resetPassword = async (req, res) => {
      const { id, token } = req.params;
      const { password } = req.body;
    
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ status: "Error with token" });
        }
    
        try {
          // Hash the new password
          const hashedPassword = await bcrypt.hash(password, 10);
    
          // Execute the update query with proper parameters
          const result = await pool.query(
            'UPDATE users SET password = $1 WHERE id = $2 RETURNING *',
            [hashedPassword, id]
          );
    
          if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
          }
    
          // Send success response with the updated user details
          res.status(200).json({
            message: 'Password updated successfully',
            user: result.rows[0],
          });
        } catch (error) {
          console.error('Database error:', error);
          res.status(500).json({ message: 'Server error' });
        }
      });
    };
  
    
      
  module.exports = { login ,forgotPassword,resetPassword};
  