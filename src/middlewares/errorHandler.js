module.exports = (err , req , res , next) => {
    if(err) {
        return res.status(500).json({
            message : "INTERNAL SERVER ERROR" , 
            error : err.message
        })
    }
}