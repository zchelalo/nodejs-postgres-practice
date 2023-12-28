import { User, UserSchema } from './user.model.js'
import { Customer, CustomerSchema } from './customer.model.js'

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))

  Customer.associate(sequelize.models)
}

export { setupModels }