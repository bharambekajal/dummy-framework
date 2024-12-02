const { response } = require("express");
const pool = require("../../conifg/db.js");
const queries = require("../../conifg/queries");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/helpers/responseHandler");
const { generateToken } = require("../../utils/middleware/authMiddleware");
const { messages, httpCodes } = require("../../constants/index.js");

const getAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await pool.query(queries.getAdminByID, [id]);

    const adminData = admin.rows[0];

    console.log(adminData);

    if (!adminData)
      return sendErrorResponse(
        res,
        messages.USER.NOT_FOUND,
        httpCodes.NOT_FOUND
      );

    return sendSuccessResponse(
      res,
      messages.APP.SUCCESS,
      adminData,
      httpCodes.OK
    );
  } catch (error) {
    console.error(error);
    return sendErrorResponse(
      error,
      messages.APP.SERVER_ERROR,
      httpCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const updateAdmin = async (req, res) => {
  const adminId = req.params.id;
  const { first_name, last_name, email, phone_number } = req.body;

  try {
    const UpdatedAdmin = await pool.query(queries.updateAdminByID, [
      first_name,
      last_name,
      email,
      phone_number,
      adminId,
    ]);

    const adminData = UpdatedAdmin.rows[0];

    console.log(adminData);

    if (!adminData)
      return sendErrorResponse(
        res,
        messages.USER.NOT_FOUND,
        httpCodes.NOT_FOUND
      );

    return sendSuccessResponse(
      res,
      messages.APP.SUCCESS,
      adminData,
      httpCodes.OK
    );
  } catch (error) {
    console.error(error);
    return sendErrorResponse(
      error,
      messages.APP.SERVER_ERROR,
      httpCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {getAdmin, updateAdmin};
