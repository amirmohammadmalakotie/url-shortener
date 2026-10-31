const crypto = require("crypto")
const Url = require("./../models/Url")



module.exports = async () => {

    let condition = true
    while (condition) {
        const slug = crypto.randomBytes(8).toString("hex")
        const oldUrl = await Url.findOne({
            where: {
                shortUrl: slug
            } , 
            paranoid : false 
        })
        if (!oldUrl) {
            condition = false;
            return slug ;
        }
    }
}