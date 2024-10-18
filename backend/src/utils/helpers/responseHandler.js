const sendSuccessResponse = (
    response,
    responseMessage,
    responseData = null,
    statusCode = 200,
) => {
    return response.status(statusCode).json({
        status: 'success',
        message: responseMessage || 'Success result',
        data: responseData
    });
};

const sendErrorResponse = (
    response,
    responseMessage,
    statusCode = 500
) => {
    return response.status(statusCode).json({
        status: 'error',
        message: responseMessage || 'Server error'
    });
}; 

module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
};