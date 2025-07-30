/**
 * Sends standardized error response 
 */
function ErrorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message    = err.message || "Internal server error."

    // !TODO: To be removed latter
    console.log({ err });

    return res.status(statusCode).json({
        status: "error",
        message
    })
}

module.exports = ErrorHandler;