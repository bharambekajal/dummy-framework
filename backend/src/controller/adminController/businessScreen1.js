const pool = require('../../conifg/db')
const queries = require('../../conifg/queries');
const {sendLink} = require('../../conifg/sendMail');
const { sendErrorResponse } = require('../../utils/helpers/responseHandler');

const businesScreen1 = async (req, res) => {
 
  const { field1, field2, email } = req.body;

  try {
      const isEmailExist = await pool.query(
      queries.getUserByEmailId, [email]);

      const isExistUserEmail =isEmailExist.rows[0];

      if(isExistUserEmail){
        return sendErrorResponse(res,"Email already exist",409)
      }

      
      const response = await pool.query(
      queries.postBusinessScreen1Data, [field1, field2, email]);

   

     
      const userData = response.rows[0]
      const userId = userData.id;
      const registrationLink = `http://localhost:3000/register/${userId}`;

      console.log({registrationLink})

      await sendLink(email,registrationLink);

    res.status(201).json({
      message: 'Data saved successfully',
      data: userData,
    });
  } catch (error) {
    console.error('Error saving business data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = businesScreen1 


