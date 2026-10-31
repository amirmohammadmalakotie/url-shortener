const { DataTypes } = require("sequelize");
const sequelize = require("../../configs/db");

const refreshToken = sequelize.define("refreshToken" , {
    user_id : {
        type : DataTypes.INTEGER , 
        allowNull : false , 
        references : {
            model : "users" , 
            key : "id"
        } , 
        onDelete : "CASCADE" , 
        onUpdate : "CASCADE"
    } , 
    token : {
        type : DataTypes.STRING , 
        allowNull : false 
    }
} , {
    timestamps : false , 
}) ;


module.exports = refreshToken