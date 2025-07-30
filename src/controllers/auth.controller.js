const ApiResponse = require("../utils/ApiResponse");
const AuthService = require("../services/auth.service");

class AuthController {
    constructor() {
        this.authService = new AuthService();

        this.Login      = this.Login.bind(this);
        this.Register   = this.Register.bind(this);
    }

    /**
     * Handle user registration 
     * Validates user input, checks for existing user and register a new user.
     * @returns Json response on success, passes error to middleware on failure.
     */
    async Register(req, res, next) {
        try {
            await this.authService.Register(req.body);
            return ApiResponse(res, 201, "success", "Registration successful.")
        } catch(error) {
            next(error);
        }
    }

    /**
     * Handle user login
     * Validates user credential and returns authentication token on success. 
     * @returns Json response on success, passes error to middleware on failure.
     */
    async Login(req, res, next) {
        try {
            const token = await this.authService.Login(req.body);
            return ApiResponse(res, 200, "success", "Login successful.", { token })
        } catch(error) {
            next(error);
        }
    }
}

module.exports = new AuthController();