import Joi from 'joi'

const id = Joi.number().integer()
const name = Joi.string().min(3).max(50)
const price = Joi.number().min(0)
const description = Joi.string().min(10)
const image = Joi.string().uri()
const categoryId = Joi.number().integer()

const limit = Joi.number().integer()
const offset = Joi.number().integer()

const price_min = Joi.number().min(0)
const price_max = Joi.number().min(0)

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
  id: id.required()
})

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max
  // price_max: price_max.when('price_min', {
  //   is: Joi.number().min(0).required(),
  //   then: Joi.required()
  // })
})
.with('price_min', 'price_max')
.with('price_max', 'price_min')

export { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
