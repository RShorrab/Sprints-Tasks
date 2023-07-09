import joi from "joi";

const signup =
{
    body: joi.object().required().keys(
        {
            email: joi.string().email().required(),
            password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required().messages({
                "string.pattern.base": "password must be at least 8 characters with Uppercase, Lowercase, number, special character."
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
            password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required().messages({
                "string.pattern.base": "password must be at least 8 characters with Uppercase, Lowercase, number, special character."
            }),
        })
}
const updateUser = 
{
    body: joi.object().required().keys(
        {
            email: joi.string().email().required(),
            password: joi.string().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).required().messages({
                "string.pattern.base": "password must be at least 8 characters with Uppercase, Lowercase, number, special character."
            }),
        }),
    headers: joi.object().required().keys(
        {
            authorization: joi.string().required().messages({
                "any.required": "You should Sign in!"
            })
        }).options({allowUnknown: true})
}
const deleteAccount = 
{
    headers: joi.object().required().keys(
    {
        authorization: joi.string().required().messages({
            "any.required": "You should Sign in!"
        })
    }).options({allowUnknown: true})
}
const userIdParam =
{
    params: joi.object().required().keys({
        id: joi.string().min(24).max(24).required()
    })
}

export let Schema = 
{
    signup,
    signin,
    updateUser,
    deleteAccount,
    userIdParam
}