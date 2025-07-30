const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");

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
        throw new CustomError(404, "Page not found.")
    } catch(error) {
        if(error.statusCode === 404) next(error);
        next();
    }
}

module.exports = IsAuthenticated;