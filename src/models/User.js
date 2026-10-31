const { DataTypes } = require("sequelize");
const sequelize = require("./../../configs/db");
const Url = require("./Url");


const User = sequelize.define("User", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 255,
            isAlpha: {
                msg: "Your firstName is incorrect"
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 255,
            isAlpha: {
                msg: "Your lastName is incorrect"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Your email is incorrect"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    paranoid: true,
});






module.exports = User; 