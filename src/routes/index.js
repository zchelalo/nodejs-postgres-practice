import express from 'express'
import passport from 'passport'

import { checkRoles } from '../middlewares/auth.handler.js'

import { router as productsRouter } from './products.router.js'
import { router as categoriesRouter } from './categories.router.js'
import { router as usersRouter } from './users.router.js'
import { router as orderRouter } from './orders.router.js'
import { router as customerRouter } from './customer.router.js'
import { router as authRouter } from './auth.router.js'
import { router as profileRouter } from './profile.router.js'

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/categories', categoriesRouter)
  router.use('/users', passport.authenticate('jwt', { session: false }), usersRouter)
  router.use('/orders', passport.authenticate('jwt', { session: false }), orderRouter)
  router.use('/customers', passport.authenticate('jwt', { session: false }), customerRouter)
  router.use('/auth', authRouter)
  router.use('/profile', passport.authenticate('jwt', { session: false }), checkRoles('admin', 'customer'), profileRouter)
}

export { routerApi }
