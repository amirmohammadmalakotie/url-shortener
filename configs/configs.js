require("dotenv").config();

module.exports = {
    database: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    },
    port: process.env.PORT || 6000,
    authSecrets: {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    } , 
    host : process.env.HOST , 
    protocol : process.env.PROTOCOL
}