const express = require("express");
const router  = express.Router();

const AdminRoutes   = require("./admin/admin.routes");
const AuthRoutes    = require("./public/auth.routes");

router.use("/auth", AuthRoutes);
router.use("/admin", AdminRoutes);

module.exports = router;