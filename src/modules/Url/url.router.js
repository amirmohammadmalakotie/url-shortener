const express = require("express");
const router = express.Router();
const controller = require("./url.controller");
const passport = require("passport");
const validate = require("../../middlewares/validate");
const { createUrlSchema, removeAndRecoverUrlSchema, showUrlSchema } = require("./url.validation")

router
    .route("/create")
    .post(passport.authenticate("jwtStrategy", { session: false }), validate(createUrlSchema), controller.create)

router.route("/remove/:id")
    .delete(passport.authenticate("jwtStrategy", { session: false }), validate(removeAndRecoverUrlSchema, "params"), controller.remove)

router.route("/recover/:id")
    .put(passport.authenticate("jwtStrategy", { session: false }), validate(removeAndRecoverUrlSchema, "params"), controller.recover)

router.route("/:key").get(validate(showUrlSchema, "params"), controller.useUrl)

module.exports = router;