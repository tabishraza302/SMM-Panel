/**
 * Sends standardized JSON response
 */
function ApiResponse(res, statusCode=200, status="success", message="", data) {
    return res.status(statusCode).json({
        status,
        message,
        data
    })
}

module.exports = ApiResponse;