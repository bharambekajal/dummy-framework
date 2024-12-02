const pool = require('../../conifg/db')
const queries = require('../../conifg/queries');
const {sendLink} = require('../../conifg/sendMail');
const { messages, httpCodes } = require('../../constants');
const { sendErrorResponse, sendSuccessResponse } = require('../../utils/helpers/responseHandler');

const BusinesScreen1 = async (req, res) => {
  const { name, state, number, email ,isDraft} = req.body;

  try {
    if(email){
    const isEmailExist = await pool.query(queries.getUserDraftByEmailId, [email]);
    console.log("Email existence check result:", isEmailExist.rows);  // Updated for better debugging

    // Proceed if email already exists
    if (isEmailExist.rows.length > 0) {
      return sendErrorResponse(res, messages.CUSTOM.EMAIL_ALREADY_EXISTS, httpCodes.CONFLICT);
    }
  }
    // Continue if email does not exist
    const response = await pool.query(queries.postBusinessScreen1Data, [name, state, number, email,isDraft]);
    const userData = response.rows[0];
    const userId = userData.id;
    const registrationLink = `http://localhost:3000/portal/signup/${userId}`;

    console.log("Generated registration link:", { registrationLink });

    await sendLink(email, 'registration', registrationLink);

    sendSuccessResponse(res, messages.USER.CREATE, { user: userData }, httpCodes.CREATED);
    
  } catch (error) {
   
    console.error('Error occurred:', error);
    return sendErrorResponse(res, messages.APP.SERVER_ERROR, httpCodes.INTERNAL_SERVER_ERROR);
  }
};




module.exports = BusinesScreen1 

