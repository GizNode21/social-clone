const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { environment } = require("./config");
const ValidationError = require("sequelize");
const isProduction = environment === "production";
const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet sets a variety of headers to better secure
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// set the _csrf token and create req.csrf token method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use(routes);

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource not found";
    err.errors = ["The requested resource couldn't be found"];
    err.status = 404;
    next(err);
});

app.use((err, _req, _res, next) => {
    // check if error is a sequelize error
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message)
        err.title = "Validation error";
    }
    next(err);
});

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.log(err);
    res.json({
        title: err.title || "Server error",
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});


module.exports = app;