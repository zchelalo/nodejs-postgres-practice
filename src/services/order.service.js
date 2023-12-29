import boom from '@hapi/boom'
import { sequelize } from '../libs/sequelize.js'

const OrderModel = sequelize.models.Order

class OrderService {

  constructor(){}

  async create(data) {
    const newOrder = await OrderModel.create(data)
    return newOrder
  }

  async find() {
    const response = await OrderModel.findAll({ include: ['customer'] })
    return response
  }

  async findOne(id) {
    const order = await OrderModel.findByPk(id, { 
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    })
    if (!order){
      throw boom.notFound('Order no encontrada')
    }
    return order
  }
  
}

export { OrderService }
