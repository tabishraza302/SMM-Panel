const jwt = require("jsonwebtoken");

const CustomError   = require("../utils/CustomError");
const UserRoles     = require("../constants/enums/UserRoles");
const StatusCodes    = require("../constants/http/StatusCodes");
const ErrorMessages  = require("../constants/messages/ErrorMessages");

/**
 * Middleware to authorize admin users based on JWT.
 */
function IsAdmin(req, res, next) {
    try {
        const authHeader = req.get("authorization");
        if (!authHeader) throw new CustomError(StatusCodes.UNAUTHORIZED, ErrorMessages.AUTH.FAILED);

        const token = authHeader.split(" ")[1];
        if (!token) throw new CustomError(StatusCodes.UNAUTHORIZED, ErrorMessages.AUTH.FAILED);

        const { role, id } = jwt.verify(token, process.env.JWT_SECRET);
        
        if (role !== UserRoles.ADMIN) throw new CustomError(StatusCodes.FORBIDDEN, ErrorMessages.AUTH.DENIED);

        res.locals.userId = id;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = IsAdmin;