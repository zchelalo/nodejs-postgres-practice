import boom from '@hapi/boom'
import { sequelize } from '../libs/sequelize.js'

const CustomerModel = sequelize.models.Customer

class CustomerService {
  constructor(){}

  async create(data) {
    const newCustomer = await CustomerModel.create(data, {
      include: ['user']
    })
    return newCustomer
  }

  async find() {
    const response = await CustomerModel.findAll({
      include: ['user']
    })
    return response
  }

  async findOne(id) {
    const customer = await CustomerModel.findByPk(id, { include: ['user'] })
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
