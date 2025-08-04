const SuccessResponse   = require("../../utils/successResponse");
const StatusCodes        = require("../../constants/http/StatusCodes");
const AuthService       = require("../../services/public/auth.service");
const SuccessMessages    = require("../../constants/messages/SuccessMessages");

class AuthController {
    constructor() {
        this.authService = new AuthService();

        this.Login = this.Login.bind(this);
        this.Register = this.Register.bind(this);
    }

    /**
     * Handle user registration 
     * Validates user input, checks for existing user and register a new user.
     */
    async Register(req, res, next) {
        try {
            await this.authService.Register(req.body);
            return SuccessResponse(res, StatusCodes.CREATED, SuccessMessages.AUTH.USER_REGISTERED);
        } catch(error) {
            next(error);
        }
    }

    /**
     * Handle user login
     * Validates user credential and returns authentication token on success. 
     */
    async Login(req, res, next) {
        try {
            const token = await this.authService.Login(req.body);
            return SuccessResponse(res, StatusCodes.OK, SuccessMessages.AUTH.USER_LOGGED_IN, { token });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = new AuthController();