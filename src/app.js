const express   = require("express");
const cors      = require("cors");
const helmet    = require("helmet");

const AuthRoutes        = require("./routes/auth.routes");
const ErrorHandler      = require("./middlewares/ErrorHandler.middleware");
const NotFoundHandler   = require("./middlewares/NotFoundHandler.middleware");

const app = express();

app.use(helmet()); 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.ORIGIN | "*", credentials: true }))

// Routes
app.use("/auth", AuthRoutes);
app.use(NotFoundHandler); // Handles 404 routes


// Error Handler
app.use(ErrorHandler)

module.exports = app;