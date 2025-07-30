const CustomError = require("../utils/CustomError");

function NotFoundHandler(req, res, next) {
    throw new CustomError(404, "Page not found!");
}

module.exports = NotFoundHandler;