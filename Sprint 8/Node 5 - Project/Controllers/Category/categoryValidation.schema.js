import Joi from "joi"

const addCategory = 
{
  body: Joi.object({
      name: Joi.string().min(3).required(),
      image: Joi.string().required().messages({
        "any.required":"image link is required, you can use this link for now.. https://placeimg.com/640/480/any"
      })
    })
}

const updateCategory = 
{
  body: Joi.object({
        name: Joi.string().min(3),
      }),
  params: Joi.object().required().keys({
        id: Joi.string().required()
    }),
}
const categoryIdParam = 
{
  params: Joi.object().required().keys(
    {
      id: Joi.number().required()
    }),
}


let Schema =
{
  addCategory, 
  updateCategory,
  categoryIdParam,
}

export default Schema