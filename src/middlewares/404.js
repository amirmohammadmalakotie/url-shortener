module.exports = async (req , res , next) => {
    try {
        return res.status(404).json({
            message  : "404 Not Found"
        })
    } catch(err) {
        next(err)
    }
}