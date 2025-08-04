const StatusCodes = require("../constants/http/StatusCodes");

/**
 * Sends standardized JSON response for successful request handled
 */
function SuccessResponse(res, statusCode = StatusCodes.OK, message="", data, ) {
    return res.status(statusCode).json({
        status: "success",
        message,
        data
    });
}

module.exports = SuccessResponse;