const { DataTypes } = require("sequelize");
const sequelize = require("./../../configs/db");

const Url = sequelize.define("Url", {
    mainUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shortUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key: "id"
        },
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },

}, {
    timestamps: true,
    paranoid: true,
    tableName: "url"
});




module.exports = Url;