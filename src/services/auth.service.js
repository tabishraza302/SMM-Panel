const bcrypt = require("bcryptjs");
const jwt    = require("jsonwebtoken");

const CustomError  = require("../utils/CustomError");
const User         = require("../models/User.model");

class AuthService {
    
    /**
     * Register a new user to database
     * Throws an error if user already exist with same details
     * @returns {boolean}
     */
    async Register(userData) {
        const { firstName, lastName, email, password } = userData;

        // Checking if user with this email already exists
        const existingUser = await User.findOne({ where: {email} })
        if(existingUser) throw new CustomError(409, "User already exist.");

        // Hashing password before saving
        const passwordHash = await bcrypt.hash(password, 11);

        // Saving details to database.
        await User.create({
            first_name: firstName,
            last_name: lastName,
            email,
            passwordHash
        })

        return true;
    }

    /**
     * Authenticate user login request
     * Verify user email and password. If not found gives error.
     * Upon successful verification generate JWT Token.
     * @returns JWT Token
     */
    async Login(loginData) {
        const { email, password } = loginData;

        // Check if user exist with this email
        const { id, role, passwordHash } = await User.findOne({ where : {email}, attributes: ["id", "role", "passwordHash"] });
        if(!passwordHash) throw new CustomError(200, "Incorrect credential.")

        // Compared user give password with the original password hash to verify
        const passwordMatched = await bcrypt.compare(password, passwordHash);
        if(!passwordMatched) throw new CustomError(401, "Incorrect email/password.")

        // Generate JWT token for authentication verification.
        const authToken = jwt.sign({ id, role}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        return authToken;
    }
}

module.exports = AuthService;