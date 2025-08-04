const express = require("express");
const router  = express.Router();

const AuthValidator             = require("../../validators/auth.validator");
const AuthController            = require("../../controllers/public/auth.controller");
const IsAuthenticated           = require("../../middlewares/IsAuthenticated.middleware");
const CheckValidationResult     = require("../../middlewares/CheckValidationResult.middleware");

router.post("/register", IsAuthenticated, AuthValidator.Registration, CheckValidationResult, AuthController.Register);
router.post("/login", IsAuthenticated, AuthValidator.Login, CheckValidationResult, AuthController.Login);

module.exports = router;