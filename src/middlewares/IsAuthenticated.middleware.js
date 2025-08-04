const jwt = require("jsonwebtoken");

const CustomError   = require("../utils/CustomError");
const StatusCodes   = require("../constants/http/StatusCodes");
const ErrorMessages  = require("../constants/messages/ErrorMessages");

/**
 * Checks if user is authenticated.
 * If user is authenticated then it returns the route as 404.
 * To prevent already authenticated user from accessing authentication routes.
 */
function IsAuthenticated(req, res, next) {
    const authHeader = req.get('authorization');
    if(!authHeader) return next();

    const token = authHeader.split(" ")[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        throw new CustomError(StatusCodes.NOT_FOUND, ErrorMessages.SYSTEM.PAGE_NOT_FOUND);
    } catch(error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) next(error);
        next();
    }
}

module.exports = IsAuthenticated;