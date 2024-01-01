import express from 'express'
import passport from 'passport'

import { ProductsService } from '../services/product.service.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } from '../schemas/product.schema.js'

const router = express.Router()
const service = new ProductsService()

router.get('/', validatorHandler(queryProductSchema, 'query'), async (req, res, next) => {
  try {
    const products = await service.find(req.query)
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newProduct = await service.create(body)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await service.update(id, body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      await service.delete(id)
      res.status(201).json({id})
    } catch (error) {
      next(error)
    }
  }
)

export { router }
