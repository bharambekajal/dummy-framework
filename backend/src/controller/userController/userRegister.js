const pool = require('../../conifg/db')
const queries = require('../../conifg/queries');
const bcrypt = require('bcrypt');
const { sendErrorResponse, sendSuccessResponse } = require('../../utils/helpers/responseHandler');
const { generateToken } = require('../../utils/middleware/authMiddleware');
const {sendLink} = require('../../conifg/sendMail');
const { messages, httpCodes } = require('../../constants');

const userRegister = async (req, res) => {
  
  try {
    const { name, state, number,city,occupation, email, password, confirmPassword ,is_updated} = req.body;
    
      if(password !== confirmPassword){
        return sendErrorResponse(res,'Passwords should be same',400)
      }

      const existingUser = await pool.query(queries.getUserByEmailId, [email]);

      if (existingUser.rows[0]) {
        return sendErrorResponse(res,'User with given email already exist',409)
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const response = await pool.query(queries.createUser, [name,state,number,city,occupation, email,hashedPassword,is_updated]);

      const userId = response.rows[0].id;
      const registrationLink = `http://localhost:3000/portal/login/${userId}`;

      console.log({registrationLink})

      await sendLink(email,'login',registrationLink);

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
    const { id, searchtype } = req.params;
  
    try {
      let result;
      if (searchtype === 'id') {
        result = await pool.query(queries.getUserByEmailId, [id]);
      } else if (searchtype === 'name') {
        // Adding wildcards for partial matching
        result = await pool.query(queries.getUserByName, [`%${id}%`]);
      } else {
        return res.status(400).json({ message: 'Invalid search type' });
      }
  
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
    const { is_active } = req.body;
    const { userId } = req.params;
  
    try {
      const result = await pool.query(
        'UPDATE users SET is_active = $1 WHERE  id= $2 RETURNING *',
        [is_active, userId]
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

  const updateUser = async (req, res) => {

    const userId = req.params.id;
    const { name, state, number, email, city, occupation } = req.body;
  
    try {
    
      const updatedUser = await pool.query(queries.updateUserByID, [
        name,
        state,
        number,
        city,
        occupation,
        email,
        userId,
      ]);
  
      const userData = updatedUser.rows[0];
  
      console.log(userData);
  
      if (!userData) {
        return sendErrorResponse(
          res,
          messages.USER.NOT_FOUND,
          httpCodes.NOT_FOUND
        );
      }
  
      return sendSuccessResponse(
        res,
        messages.APP.SUCCESS,
        userData,
        httpCodes.OK
      );
    } catch (error) {
      console.error("Error updating user:", error);
      return sendErrorResponse(
        res,
        messages.APP.SERVER_ERROR,
        httpCodes.INTERNAL_SERVER_ERROR
      );
    }
  };

  const getUserDraft = async (req, res) => {
  
    try {
      const result = await pool.query(queries.getUserDraft);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'No drafts found' });
      }
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching drafts:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const updateUserDraft = async (req, res) => {
    const userId = req.params.id;
    const { name, state, number, email } = req.body;
  
    try {
      // Check if email is already in use by another draft
      if (email) {
        const isEmailExist = await pool.query(queries.getUserDraftByEmailId, [email]);
        console.log("Email existence check result:", isEmailExist.rows);
  
        if (isEmailExist.rows.length > 0 && isEmailExist.rows[0].id !== parseInt(userId, 10)) {
          return sendErrorResponse(res, messages.CUSTOM.EMAIL_ALREADY_EXISTS, httpCodes.CONFLICT);
        }
      }
  
      // Update user draft details in the database
      const updatedUser = await pool.query(queries.updateUserDraft, [
        name,
        state,
        number,
        email,
        false,   // Assuming this parameter represents `isDraft`
        userId
      ]);

      const userData = updatedUser.rows[0];
    
      const registrationLink = `http://localhost:3000/portal/signup/${userId}`;
  
      console.log("Generated registration link:", { registrationLink });
  
      await sendLink(email, 'registration', registrationLink);

  
      if (!userData) {
        return sendErrorResponse(res, messages.USER.NOT_FOUND, httpCodes.NOT_FOUND);
      }
  
      return sendSuccessResponse(res, messages.APP.SUCCESS, { user: userData }, httpCodes.OK);
    } catch (error) {
      console.error("Error updating user draft:", error);
      return sendErrorResponse(res, messages.APP.SERVER_ERROR, httpCodes.INTERNAL_SERVER_ERROR);
    }
  };

  const deleteUserDraft = async (req, res) => {
    const userId = req.params.id;
  console.log(userId)
    try {
      // Check if the draft exists in the `user_draft` table
      const draftCheck = await pool.query(
        'SELECT * FROM users_draft WHERE id = $1',
        [userId]
      );
  
      if (draftCheck.rowCount === 0) {
        return res.status(404).json({ message: 'Draft not found for the given user ID' });
      }
  
      const deleteResult = await pool.query(
        'DELETE FROM users_draft WHERE id = $1 RETURNING *',
        [userId]
      );
  
      if (deleteResult.rowCount === 0) {
        return res.status(404).json({ message: 'Failed to delete the draft' });
      }
  
      res.status(200).json({
        message: 'Draft deleted successfully',
        deletedDraft: deleteResult.rows[0],
      });
    } catch (error) {
      console.error('Error deleting user draft:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
 
  module.exports= {deleteUserDraft,updateUserDraft,getUserDraft,updateUser,userRegister,getUserByID,getUserByEmail,getRegisteredUserById,getUserByNameOrUniqueId,getRegisteredUser,statusUpdate}  