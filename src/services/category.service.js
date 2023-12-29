import boom from '@hapi/boom'
import { sequelize } from '../libs/sequelize.js'

const CategoryModel = sequelize.models.Category

class CategoryService {

  constructor(){}
  
  async create(data) {
    const newCategory = await CategoryModel.create(data)
    return newCategory
  }

  async find() {
    // const categories = await CategoryModel.findAll({
    //   include: ['products']
    // })
    const categories = await CategoryModel.findAll()
    return categories
  }

  async findOne(id) {
    const category = await CategoryModel.findByPk(id, { include: ['products'] })
    if (!category){
      throw boom.notFound('Categoría no encontrado')
    }
    return category
  }

  async update(id, changes) {
    const category = await this.findOne(id)
    const response = await category.update(changes)
    return response
  }

  async delete(id) {
    const category = await this.findOne(id)
    await category.destroy()
    return { id }
  }

}

export { CategoryService }
