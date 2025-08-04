const CustomError   = require("./customError");
const StatusCodes    = require("../constants/http/StatusCodes");
const ErrorMessage  = require("../constants/messages/ErrorMessages");

function NotFoundHandler() {
    throw new CustomError(StatusCodes.NOT_FOUND, ErrorMessage.SYSTEM.PAGE_NOT_FOUND);
}

module.exports = NotFoundHandler;