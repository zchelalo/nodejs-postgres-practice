import Joi from 'joi'

const id = Joi.number().integer()
const name = Joi.string().min(3).max(50)
const price = Joi.number().min(0)
const description = Joi.string().min(10)
const image = Joi.string().uri()
const categoryId = Joi.number().integer()

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required()
})

const updateProductSchema = Joi.object({
  name,
  price,
  description,
  image,
  categoryId
})

const getProductSchema = Joi.object({
  id: id.required(),
})

export { createProductSchema, updateProductSchema, getProductSchema }
