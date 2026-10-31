const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require('./../models/User');
const { authSecrets } = require("./../../configs/configs");



module.exports = new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: authSecrets.accessTokenSecret
}, async (payload, done) => {
    const user = await User.findOne({
        where: {
            id: payload.id,
            email: payload.email
        },
        attributes: {
            exclude: ["password"]
        },
        raw: true
    });
    if (!user) {
        return done(null, false)
    }
    return done(null, user);
})