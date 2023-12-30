import boom from '@hapi/boom'
import { Op } from 'sequelize'
import { sequelize } from '../libs/sequelize.js'

const ProductModel = sequelize.models.Product

class ProductsService {

  constructor(){}
  
  async create(data) {
    const newProduct = await ProductModel.create(data)
    return newProduct
  }

  async find(query) {
    const { limit, offset, price, price_min, price_max } = query

    const options = {
      include: ['category'],
      where: {}
    }

    if (limit && offset){
      options.limit = limit
      options.offset = offset
    }

    if (price){
      options.where.price = price
    }
    else if (price_min && price_max){
      options.where.price = {
        [Op.between]: [price_min, price_max]
      }
    }

    const products = await ProductModel.findAll(options)
    return products
  }

  async findOne(id) {
    const product = await ProductModel.findByPk(id, { include: ['category'] })
    if (!product){
      throw boom.notFound('Producto no encontrado')
    }
    return product
  }

  async update(id, changes) {
    const product = await this.findOne(id)
    const response = await product.update(changes)
    return response
  }

  async delete(id) {
    const product = await this.findOne(id)
    await product.destroy()
    return { id }
  }

}

export { ProductsService }
