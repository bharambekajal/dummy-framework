const jwt = require('jsonwebtoken');
const { sendErrorResponse } = require('../helpers/responseHandler');
const dotenv = require('dotenv');

dotenv.config();

// const verifyToken = (req, res, next) => {
//   let token = req.headers['authorization'];
//   if (token) {
//     token = token.split(' ')[1];
//     jwt.verify(token, jwtKey, (err, valid) => {
//       if (err) {
//         res.status(401).send({ response: "Please provide valid token" })
//       }
//       else {
//         next();
//       }
//     })
//   }
//   else {
//     res.status(400).send({ response: "Please add token with header" })
//   }
// }


const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        token = token.split(' ')[1];
        if (!token) return sendErrorResponse(res, 'Token not provided', 401);
        
        console.log(process.env.ACCESS_TOKEN_SECRET)

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        next();
    } catch (err) {
      console.log(err)
        return sendErrorResponse(res, err.message, 401);
    }
};

const generateToken = (data, expires_in) => {
  try { 
    const token = jwt.sign(
        { user: data },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: expires_in || process.env.ACCESS_TOKEN_EXPIRY }
    );
    return token;
  } catch (error) {
    return sendErrorResponse(res, err.message);
  }
};

module.exports = {
  verifyToken,
  generateToken
};
