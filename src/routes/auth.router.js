import express from 'express'
import passport from 'passport'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { loginSchema, recoverySchema } from '../schemas/auth.schema.js'
import { AuthService } from '../services/auth.service.js'

const router = express.Router()
const service = new AuthService()

router.post('/login', validatorHandler(loginSchema, 'body'), passport.authenticate('local', { session: false }), async (req, res, next) => {
  try {
    const token = await service.signToken(req.user)

    res.json({ 'token': token })
  } catch (error) {
    next(error)
  }
})

router.post('/recovery', validatorHandler(recoverySchema, 'body'), async (req, res, next) => {
  try {
    const { email } = req.body
    const respuesta = await service.sendMail(email)
    res.json(respuesta)
  } catch (error) {
    next(error)
  }
})

export { router }