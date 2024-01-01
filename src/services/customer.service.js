import boom from '@hapi/boom'
import { sequelize } from '../libs/sequelize.js'

const CustomerModel = sequelize.models.Customer
const UserModel = sequelize.models.User

class CustomerService {
  constructor(){}

  async create(data) {
    const newCustomer = await CustomerModel.create(data, {
      include: ['user']
    })
    delete newCustomer.user.dataValues.password

    return newCustomer
  }

  async find() {
    const response = await CustomerModel.findAll({
      include: [{
        model: UserModel,
        as: 'user',
        attributes: { exclude: ['password'] }
      }]
    })
    return response
  }

  async findOne(id) {
    const customer = await CustomerModel.findByPk(id, { 
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: { exclude: ['password'] }
        }, 
        'orders'
      ] 
    })

    if (!customer){
      throw boom.notFound('Customer no encontrado')
    }
    return customer
  }

  async update(id, changes) {
    const customer = await this.findOne(id)
    const response = await customer.update(changes)
    return response
  }

  async delete(id) {
    const customer = await this.findOne(id)
    await customer.destroy()
    return { id }
  }
}

export { CustomerService }
