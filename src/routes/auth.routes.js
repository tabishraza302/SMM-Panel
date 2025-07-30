const express = require("express");
const router  = express.Router();

const AuthValidator     = require("../validators/auth.validator");
const AuthController    = require("../controllers/auth.controller");
const ValidateRequest   = require("../middlewares/ValidateRequest.middleware");
const IsAuthenticated   = require("../middlewares/IsAuthenticated.middleware");

router.post("/register", IsAuthenticated, AuthValidator.registrationValidator, ValidateRequest, AuthController.Register);
router.post("/login", IsAuthenticated, AuthValidator.loginValidator, ValidateRequest, AuthController.Login);

module.exports = router;