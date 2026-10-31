const express = require("express");
const app = express();
const passport = require("passport");
const localStrategy = require("./src/strategies/localStrategy");
const userRouter = require("./src/modules/User/user.router");
const urlsRouter = require("./src/modules/Url/url.router");
const jwtStrategy = require("./src/strategies/jwtStrategy");
const errorHandler = require("./src/middlewares/errorHandler")
const notFound = require("./src/middlewares/404");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./src/docs/openapi");

// Middlewares 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Passport 
passport.use(localStrategy)
passport.use("jwtStrategy", jwtStrategy);

//Swagger Middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Routes
app.use("/auth", userRouter);
app.use("/url", urlsRouter);



//404 middleware
app.use(notFound);

// errorHandler 
app.use(errorHandler);


module.exports = app;