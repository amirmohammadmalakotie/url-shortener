const jwt = require("jsonwebtoken");
const { authSecrets } = require("./../../configs/configs");

const generateAccessToken = (user) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, authSecrets.accessTokenSecret, {
        expiresIn: "15m"
    })
    return token;
}

const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user.id
    }, authSecrets.refreshTokenSecret, {
        expiresIn: "30d"
    });
};

module.exports = {
    generateAccessToken ,
    generateRefreshToken
}