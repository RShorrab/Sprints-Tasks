import joi from "joi";

const signup =
{
    body: joi.object().required().keys(
        {
            email: joi.string().email().required(),
            password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/)).required().messages({
                "string.pattern.base": "password must be 8 characters with Uppercase, Lowercase, number, special character."
            }),
            re_password: joi.string().valid(joi.ref('password')).required().messages({
                "any.only": "Passwords didn't match!"
            })
        })
}
const signin = 
{
    body: joi.object().required().keys(
        {
            email: joi.string().email().required(),
            password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/)).required().messages({
                "string.pattern.base": "password must be 8 characters with Uppercase, Lowercase, number, special character."
            }),
        })
}

export let Schema = 
{
    signup,
    signin
}