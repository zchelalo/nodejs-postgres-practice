import Joi from 'joi'

const email = Joi.string().email()
const password = Joi.string().min(8)

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required()
})

const recoverySchema = Joi.object({
  email: email.required()
})

export { loginSchema, recoverySchema }
