import boom from '@hapi/boom'
import { sequelize } from '../libs/sequelize.js'

const UserModel = sequelize.models.User

class UserService {
  constructor(){}

  async create(data) {
    const newUser = await UserModel.create(data)
    return newUser
  }

  async find() {
    const response = await UserModel.findAll()
    return response
  }

  async findOne(id) {
    const user = await UserModel.findByPk(id)
    if (!user){
      throw boom.notFound('Usuario no encontrado')
    }
    return user
  }

  async update(id, changes) {
    const user = await this.findOne(id)
    const response = await user.update(changes)
    return response
  }z

  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy()
    return { id }
  }
}

export { UserService }
