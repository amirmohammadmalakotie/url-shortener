const { Sequelize } = require("sequelize");
const { database } = require("./configs")
const sequelize = new Sequelize(database.database, database.username, database.password, {
    host: database.host,
    dialect: database.dialect,
    logging: false
});



module.exports = sequelize;
require("./../src/models/associations")