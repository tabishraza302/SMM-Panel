const { body } = require("express-validator");
const MessageBuilder = require("../utils/ValidationMessagesBuilder");

const AuthValidator = {
    Registration: [
        body("firstName")
            .trim()
            .notEmpty()
            .withMessage(MessageBuilder.required("First name"))
            .isAlpha()
            .withMessage(MessageBuilder.mustBeAlpha("First name")),

        body("lastName")
            .trim()
            .notEmpty()
            .withMessage(MessageBuilder.required("Last name"))
            .isAlpha()
            .withMessage(MessageBuilder.mustBeAlpha("Last name")),

        body("email")
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage(MessageBuilder.invalid("email")),
        
        body("password")
            .trim()
            .isString()
            .isLength({ min: 6 })
            .withMessage(MessageBuilder.minLength("Password", 6)),

        body("confirmPassword")
            .trim()
            .isString()
            .isLength({min: 6})
            .custom((value, {req}) => value === req.body.password)
            .withMessage(MessageBuilder.match("Confirm Password", "Password"))
    ],

    Login: [
        body("email")
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage(MessageBuilder.invalid("email")),
        
        body("password")
            .trim()
            .isString()
            .isLength({min: 6})
            .withMessage(MessageBuilder.minLength("Password", 6))
    ]
}

module.exports = AuthValidator;