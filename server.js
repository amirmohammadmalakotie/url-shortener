require("dotenv").config()
const sequelize = require("./configs/db") ;
const app = require("./app")
const configs = require("./configs/configs")

async function connectToDatabase () {
    try {
        await sequelize.authenticate()
        console.log("Connection to Database was successful")
    } catch(err) {
        await sequelize.close()
        console.log("Error :" ,  err) ;
    }
}

function runServer () {
    try {
        app.listen(configs.port , () => {
            console.log(`Server is running on ${configs.port} port`) ;
        })
    } catch (err)  {
        console.log("Error :" , err)
    }
}


async function Run () {
    await connectToDatabase() ;
    runServer()
} 
Run() ;