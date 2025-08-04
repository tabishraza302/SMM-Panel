const express   = require("express");
const cors      = require("cors");
const helmet    = require("helmet");

const Routes            = require("./routes/index");
const ErrorResponse     = require("./utils/errorResponse");
const NotFoundHandler   = require("./utils/NotFoundHandler");

const app = express();

app.use(helmet()); 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.ORIGIN | "*", credentials: true }))

// Routes
app.use(Routes);
app.use(ErrorResponse) // Catches error thrown by application and sends standardized response.
app.use(NotFoundHandler); // Handles 404 routes

module.exports = app;