const express = require("express");
const router = express.Router();
const controller = require("./user.controller")
const { registerSchema, loginSchema } = require("./user.validation");
const validator = require("../../middlewares/validate");
const passport = require("passport");


router.route("/register").post(validator(registerSchema), controller.register)
router.route("/login").post(validator(loginSchema), passport.authenticate("local", { session: false }), controller.login);
router.route("/refresh-token").post(controller.refreshToken)
router.route("/me").get(passport.authenticate('jwtStrategy', { session: false }), controller.me);
module.exports = router;