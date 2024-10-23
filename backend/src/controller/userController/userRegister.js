const pool = require('../../conifg/db')
const queries = require('../../conifg/queries');
const bcrypt = require('bcrypt');
const { sendErrorResponse, sendSuccessResponse } = require('../../utils/helpers/responseHandler');
const { generateToken } = require('../../utils/middleware/authMiddleware');
const {sendLink} = require('../../conifg/sendMail');

const userRegister = async (req, res) => {
  
  try {
    const { field1, field2, number,field3, email, password, confirmPassword } = req.body;
    
      if(password !== confirmPassword){
        return sendErrorResponse(res,'Passwords should be same',400)
      }

      const existingUser = await pool.query(queries.getUserByEmailId, [email]);

      if (existingUser.rows[0]) {
        return sendErrorResponse(res,'User with given email already exist',409)
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const response = await pool.query(queries.createUser, [field1,field2,number,field3, email,hashedPassword]);

      const userId = response.rows[0].id;
      const registrationLink = `http://localhost:3000/portal/login/${userId}`;

      console.log({registrationLink})

      await sendLink(email,registrationLink);

      return sendSuccessResponse(res, 'User registered successfully', response.rows[0].id, 201);  
      
    } catch (error) {

      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getUserByID = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query(queries.getUserById, [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  const getUserByEmail = async (req, res) => {
    const { email } = req.params;
  
    try {
      const result = await pool.query(queries.getUserByEmailId, [email]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getRegisteredUserById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query(queries.getRegisteredUserById, [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };



  const getUserByNameOrUniqueId = async (req, res) => {
    const { id } = req.params;
    console.log(id)
  
    try {
      const result = await pool.query(queries.getUserByNameOrUniqueId, [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(result.rows); 
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  const getRegisteredUser = async (req, res) => {
  
    try {
      const result = await pool.query(queries.getRegisteredUser);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(result.rows); 
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const statusUpdate = async(req,res) =>{
    const { isActive } = req.body;
    const { userId } = req.params;
  
    try {
      const result = await pool.query(
        'UPDATE users SET isactive = $1 WHERE  id= $2 RETURNING *',
        [isActive, userId]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(result.rows[0]); // Return updated user
    } catch (error) {
      console.error('Error updating user status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

 
  module.exports= {userRegister,getUserByID,getUserByEmail,getRegisteredUserById,getUserByNameOrUniqueId,getRegisteredUser,statusUpdate}  