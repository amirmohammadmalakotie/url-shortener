const yup = require("yup");

const registerSchema = yup.object({
    firstName: yup.string().max(255).required(),
    lastName: yup.string().max(255).required(),
    email: yup.string().email("Your email is incorrect").max(255).required(),
    password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain a lowercase letter")
        .matches(/[A-Z]/, "Password must contain an uppercase letter")
        .matches(/[0-9]/, "Password must contain a number")
        .matches(/[^a-zA-Z0-9]/, "Password must contain a special character")
        .required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required()
})

const loginSchema = yup.object({
    email : yup.string().email("Your email is incorrect").required() , 
    password : yup.string().required()
})

module.exports = {
    registerSchema , 
    loginSchema
}