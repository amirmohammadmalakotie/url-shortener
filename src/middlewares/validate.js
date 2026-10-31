module.exports = (validationSchema , property = "body") => {
    return async (req, res, next) => {
        try {
            await validationSchema.validate(req[property], { abortEarly: false })
        } catch (err) {
            return res.status(400).json({
                errors: err.errors[0]
            })
        }
        next()
    }
}