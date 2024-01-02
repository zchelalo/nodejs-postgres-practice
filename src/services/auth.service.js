import boom from '@hapi/boom'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

import { config } from '../config/config.js'
import { UserService } from './user.service.js'

const service = new UserService()

class AuthService {
  constructor(){}

  async getUser(email, password) {
    const user = await service.findByEmail(email)

    if (!user){
      throw boom.unauthorized()
    }

    const passwordValida = await bcrypt.compare(password, user.password)

    if (!passwordValida){
      throw boom.unauthorized()
    }

    delete user.dataValues.password
    return user
  }

  async signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '2h' })
    return token
  }

  async sendMail(email){
    const user = await service.findByEmail(email)

    if (!user){
      throw boom.unauthorized()
    }

    const transporter = nodemailer.createTransport({
      host: config.EMAIL_SERVER,
      port: config.EMAIL_PORT,
      secure: config.EMAIL_SECURE,
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
      }
    })

    let info = await transporter.sendMail({
      from: '"Aplicación" <eduardosaavedra687@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Correo de recuperación de contraseña", // Subject line
      text: "Recupere su contraseña dandole al siguiente link", // plain text body
      html: "<b>Recupere su contraseña dandole al siguiente link</b>", // html body
    })

    // console.log("Message sent: %s", info.messageId)
    return { msg: 'Correo enviado' }
  }

}

export { AuthService }
