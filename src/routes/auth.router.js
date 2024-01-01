import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { loginSchema } from '../schemas/auth.schema.js'

const router = express.Router()

router.post('/login', validatorHandler(loginSchema, 'body'), passport.authenticate('local', { session: false }), async (req, res, next) => {
  try {
    const user = req.user
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '2h' })

    res.json({ 'token': token })
  } catch (error) {
    next(error)
  }
})

export { router }