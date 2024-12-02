const { express } = require("express");
const pool = require("../../conifg/db");
const bcrypt = require("bcrypt");
const queries = require("../../conifg/queries");
const { sendErrorResponse, sendSuccessResponse } = require("../../utils/helpers/responseHandler");
const { generateToken } = require("../../utils/middleware/authMiddleware");
const { sendLink } = require("../../conifg/sendMail");
const jwt = require("jsonwebtoken");
const { messages, httpCodes } = require("../../constants");

const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(queries.getUserByEmailId, [email]);
    const userData = user.rows[0];
    console.log(userData);

    if (!userData) {
      return sendErrorResponse(
        res,
        messages.USER.NOT_FOUND,
        httpCodes.NOT_FOUND
      );
    }

    if (!userData.is_active) {
      return sendErrorResponse(
        res,
        messages.AUTH.ACCOUNT_INACTIVE,
        httpCodes.FORBIDDEN
      );
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, userData.password);
    if (!validPassword) {
      return sendErrorResponse(
        res,
        messages.AUTH.INCORRECT_PASSWORD,
        httpCodes.UNAUTHORIZED
      );
    }

    // Generate token
    const token = generateToken(userData);

    // Send success response with user data and token
    res.json({ user: userData, user_token: token });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(
      res,
      messages.APP.SERVER_ERROR,
      httpCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    console.log(`Email given: ${email}`);

    const user = await pool.query(queries.getUserByEmailId, [email]);
    const userData = user.rows[0];

    if (!userData) {
      return sendErrorResponse(
        res,
        messages.USER.NOT_FOUND,
        httpCodes.NOT_FOUND
      );
    }

    const token = generateToken(userData); 
    const userId = userData.id;
    const registrationLink = `http://localhost:3000/reset-password/${userId}/${token}`;

    console.log({ registrationLink });

    await sendLink(email,'passwordReset', registrationLink); 
  
    return sendSuccessResponse(res,messages.EMAIL.SENT, {link: registrationLink},httpCodes.OK)
    
  } catch (error) {
    console.error("Error in forgotPassword function:", error);
    return sendErrorResponse(
      res,
      messages.APP.SERVER_ERROR,
      httpCodes.INTERNAL_SERVER_ERROR
    );
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
        "UPDATE users SET password = $1 WHERE id = $2 RETURNING *",
        [hashedPassword, id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Send success response with the updated user details
      res.status(200).json({
        message: "Password updated successfully",
        user: result.rows[0],
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
};

module.exports = { UserLogin, forgotPassword, resetPassword };
