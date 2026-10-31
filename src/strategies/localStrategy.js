const User = require("../models/User");
const bcrypt = require("bcrypt")
const localStrategy = require("passport-local").Strategy;

module.exports = new localStrategy({
    usernameField: "email",
    passwordField: "password"
},
    async (email, password, done) => {
        try {
            const user = await User.findOne({
                where: {
                    email
                },
                raw: true
            })
            if (!user) {
                return done(null, false, {
                    message: "Email or password is incorrect"
                });
            }
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return done(null, false, {
                    message: "Email or password is incorrect"
                })
            }
            delete user.password;
            
            return done(null, user);
        } catch (err) {
            return done(err)
        }
    })