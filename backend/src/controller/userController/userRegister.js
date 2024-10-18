const pool = require('../../conifg/db')
const queries = require('../../conifg/queries');
const bcrypt = require('bcrypt');
const { sendErrorResponse, sendSuccessResponse } = require('../../utils/helpers/responseHandler');
const { generateToken } = require('../../utils/middleware/authMiddleware');
const {sendLink} = require('../../conifg/sendMail');

const userRegister = async (req, res) => {
  
  try {
    const { field1, field2, email, password, confirmPassword } = req.body;
    
      if(password !== confirmPassword){
        return sendErrorResponse(res,'Passwords should be same',400)
      }

      const existingUser = await pool.query(queries.getUserByEmailId, [email]);

      if (existingUser.rows[0]) {
        return sendErrorResponse(res,'User with given email already exist',409)
      }


      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
  
      // const {rows} = await pool.query(queries.createUser, [field1,field2, email,password]);


      const response = await pool.query(queries.createUser, [field1,field2, email,hashedPassword]);


         
      const userData = response.rows[0]
      const userId = userData.id;
      const registrationLink = `http://localhost:3000/user/login/${userId}`;

      console.log({registrationLink})

      await sendLink(email,registrationLink);


      // const token = generateToken(rows[0]);
      // res.json({ user: userData, auth: token });
      // return sendSuccessResponse(res, 'User registered successfully', {data: rows[0], token}, 201);  
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
  module.exports= {userRegister,getUserByID,getUserByEmail}  