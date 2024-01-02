import boom from '@hapi/boom'
import { sequelize } from '../libs/sequelize.js'

const OrderModel = sequelize.models.Order
const OrderProductModel = sequelize.models.OrderProduct

class OrderService {

  constructor(){}

  async create(data) {
    const newOrder = await OrderModel.create(data)
    return newOrder
  }

  async addItem(data) {
    const newOrderProduct = await OrderProductModel.create(data)
    return newOrderProduct
  }

  async findByUser(userId) {
    const orders = await OrderModel.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ],
      attributes: { exclude: ['total'] }
    })
    return orders
  }

  async find() {
    const response = await OrderModel.findAll({ 
      include: ['customer'],
      attributes: { exclude: ['total'] }
    })
    return response
  }

  async findOne(id) {
    const order = await OrderModel.findByPk(id, { 
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    })
    if (!order){
      throw boom.notFound('Order no encontrada')
    }
    return order
  }
  
}

export { OrderService }
