const yup = require("yup");


const createUrlSchema = yup.object({
    mainUrl: yup
        .string()
        .required("URL is required")
        .url("Please enter a valid URL")
        .max(255, "URL is too long")
        .test(
            "protocol",
            "Only HTTP and HTTPS URLs are allowed",
            (value) => {
                if (!value) return true;

                return ["http:", "https:"].includes(
                    new URL(value).protocol
                );
            }
        )
});

const removeAndRecoverUrlSchema = yup.object({
    id : yup.number().integer().positive().required()
})

const showUrlSchema = yup.object({
    key : yup.string().required()
})

module.exports = {
    createUrlSchema , 
    removeAndRecoverUrlSchema , 
    showUrlSchema
}