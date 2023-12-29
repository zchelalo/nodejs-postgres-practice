import Joi from 'joi'

const id = Joi.number().integer()
const customerId = Joi.number().integer()

const createOrderSchema = Joi.object({
  customerId: customerId.required()
})

const getOrderSchema = Joi.object({
  id: id.required(),
})

export { createOrderSchema, getOrderSchema }
