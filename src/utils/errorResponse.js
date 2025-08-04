const StatusCodes    = require("../constants/http/StatusCodes");
const ErrorMessages  = require("../constants/messages/ErrorMessages");

/**
 * Sends standardized error response 
 */
function ErrorResponse(err, req, res, next) {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message    = err.message || ErrorMessages.SYSTEM.SERVER_ERROR;

    // !TODO: To be removed latter
    console.log({ err });

    return res.status(statusCode).json({
        status: "error",
        message
    });
}

module.exports = ErrorResponse;