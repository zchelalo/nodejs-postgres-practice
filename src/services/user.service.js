import boom from '@hapi/boom'

import { sequelize } from '../libs/sequelize.js'

const UserModel = sequelize.models.User

class UserService {
  constructor(){}

  async create(data) {
    const newUser = await UserModel.create(data)
    delete newUser.dataValues.password

    return newUser
  }

  async find() {
    const response = await UserModel.findAll({
      include: ['customer'],
      // attributes: ['id', 'email', 'role', 'createdAt']
      attributes: { exclude: ['password'] }
    })
    return response
  }

  async findOne(id) {
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ['password'] }
    })
    if (!user){
      throw boom.notFound('Usuario no encontrado')
    }
    return user
  }

  async findByEmail(email) {
    const user = await UserModel.findOne({
      where: { email }
    })
    return user
  }

  async update(id, changes) {
    const user = await this.findOne(id)
    const response = await user.update(changes)
    return response
  }

  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy()
    return { id }
  }
}

export { UserService }
