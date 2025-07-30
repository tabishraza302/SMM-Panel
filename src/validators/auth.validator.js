const { body } = require("express-validator");

exports.registrationValidator = [
    body("firstName").trim().notEmpty().isAlpha().withMessage("Enter valid first Name."),
    body("lastName").trim().notEmpty().isAlpha().withMessage("Enter a valid Last Name."),
    body("email").trim().isEmail().normalizeEmail().withMessage("Enter a valid Email."),
    body("password").trim().isLength({ min: 6 }).withMessage("Enter a valid password. Minimum length should be 6."),
    body("confirmPassword").custom((value, {req}) => value === req.body.password).withMessage("Password Doesn't match.")
]

exports.loginValidator = [
    body("email").trim().isEmail().normalizeEmail().withMessage("Enter a valid email."),
    body("password").trim().isAlphanumeric().isLength({min: 6}).withMessage("Enter a valid password.")
]