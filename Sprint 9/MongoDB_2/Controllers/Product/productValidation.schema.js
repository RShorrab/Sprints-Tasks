import Joi from "joi"

const addProduct = 
{
  body: Joi.object(
    {
      title: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string(),
    })
}

const updateProduct = 
{
  body: Joi.object(
      {
        title: Joi.string(),
        price: Joi.number(),
        description: Joi.string(),
      }),
  params: Joi.object().required().keys({
        id: Joi.string().required()
    }),
}
const productIdParam = 
{
  headers: Joi.object().required().keys(
    {
        authorization: Joi.string().required().messages({
            "any.required": "You should Sign in!"
        })
    }).options({allowUnknown: true}),
  params: Joi.object().required().keys(
    {
      id: Joi.string().required()
    }),
  
}


let Schema =
{
  addProduct, 
  updateProduct,
  productIdParam,
}

export default Schema