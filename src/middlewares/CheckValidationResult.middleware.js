const { validationResult } = require("express-validator");

const CustomError   = require("../utils/CustomError");
const StatusCode    = require("../constants/http/StatusCodes");

/**
 * Middleware to check for validation errors from express-validator.
 * If any errors are found, it throws a CustomError with the first error message.
 * Otherwise, it proceeds to the next middleware.
 */
function CheckValidationResult(req, res, next) {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const firstError = errors.array({ onlyFirstError: true })[0];
        console.log({firstError}) // !TODO: To be removed latter
        throw new CustomError(StatusCode.BAD_REQUEST, firstError.msg);
    }

    next()
}

module.exports = CheckValidationResult;