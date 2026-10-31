const User = require("./User")
const Url = require("./Url");
const refreshToken = require("./RefreshToken");
const { DataTypes } = require("sequelize");


Url.belongsTo(User, {
    foreignKey: {
        name: "user_id",
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});


User.hasMany(Url, {
    foreignKey: {
        name: "user_id",
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})


User.hasOne(refreshToken, {
    foreignKey: {
        name: "user_id",
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

refreshToken.belongsTo(User, {
    foreignKey: {
        name: "user_id",
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})