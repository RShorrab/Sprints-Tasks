import Joi from "joi"

const addProduct = 
{
  body: Joi.object(
    {
      title: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string(),
      categoryId: Joi.number().required(),
      images: Joi.array()
    })
}

const updateProduct = 
{
  body: Joi.object(
      {
        title: Joi.string(),
        price: Joi.number(),
        description: Joi.string(),
        categoryId: Joi.number(),
        images: Joi.array()
      }),
  params: Joi.object().required().keys({
        id: Joi.string().required()
    }),
}
const productIdParam = 
{
  params: Joi.object().required().keys(
    {
      id: Joi.number().required()
    }),
}

const rates = 
{
  params: Joi.object().required().keys(
    {
      curr: Joi.string().length(3).required()
    }),
}

let Schema =
{
  addProduct, 
  updateProduct,
  productIdParam,
  rates
}

export default Schema