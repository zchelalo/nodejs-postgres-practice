import Joi from 'joi'
import { createUserSchema, updateUserSchema } from './user.schema.js'

const id = Joi.number().integer()
const name = Joi.string().min(3).max(30)
const lastName = Joi.string()
const phone = Joi.string()

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  user: createUserSchema
})

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  user: updateUserSchema
})

const getCustomerSchema = Joi.object({
  id: id.required(),
})

export { createCustomerSchema, updateCustomerSchema, getCustomerSchema }