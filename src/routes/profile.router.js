import express from 'express'

import { OrderService } from '../services/order.service.js'

const router = express.Router()
const service = new OrderService()

router.get('/mis-ordenes', async (req, res, next) => {
  try {
    const user = req.user
    const orders = await service.findByUser(user.sub)
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

export { router }
