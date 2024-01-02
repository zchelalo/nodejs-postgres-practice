import Joi from 'joi'

const email = Joi.string().email()
const password = Joi.string().min(8)
const token = Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
const newPassword = Joi.string().min(8)

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required()
})

const recoverySchema = Joi.object({
  email: email.required()
})

const changePasswordSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required()
})

export { loginSchema, recoverySchema, changePasswordSchema }
