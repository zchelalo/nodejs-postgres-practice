import express from 'express'

import { CustomerService } from '../services/customer.service.js'
import { validatorHandler } from '../middlewares/validator.handler.js'
import { updateCustomerSchema, createCustomerSchema, getCustomerSchema } from '../schemas/customer.schema.js'

const router = express.Router()
const service = new CustomerService()

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find()
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const category = await service.findOne(id)
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newCategory = await service.create(body)
      res.status(201).json(newCategory)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const category = await service.update(id, body)
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
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