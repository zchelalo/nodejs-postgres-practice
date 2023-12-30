import boom from '@hapi/boom'
import { sequelize } from '../libs/sequelize.js'

const ProductModel = sequelize.models.Product

class ProductsService {

  constructor(){}
  
  async create(data) {
    const newProduct = await ProductModel.create(data)
    return newProduct
  }

  async find(query) {
    const options = {
      include: ['category']
    }

    const { limit, offset } = query
    if (limit && offset){
      options.limit = limit
      options.offset = offset
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
