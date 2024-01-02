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

  async sendRecovery(email){
    const user = await service.findByEmail(email)

    if (!user){
      throw boom.unauthorized()
    }

    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.JWT_RECOVERY_SECRET, { expiresIn: '10m' })
    const link = `http://myfrontend.com/recovery?${token}`

    const userUpdated = await service.update(user.id, { recoveryToken: token })

    let info = {
      from: `"Aplicación" <${config.EMAIL_USER}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Correo de recuperación de contraseña", // Subject line
      html: `<b>Recupere su contraseña ingresando al siguiente link</b><br /><a href="${link}">Recovery</a>`, // html body
    }

    const respuesta = await this.sendMail(info)
    return respuesta
  }

  async changePassword(token, newPassword){
    try {
      const payload = jwt.verify(token, config.JWT_RECOVERY_SECRET)
      const user = await service.findOneWithRecovery(payload.sub)
      if (user.recoveryToken !== token){
        throw boom.unauthorized()
      }
      const userUpdated = await service.update(user.id, { recoveryToken: null, password: newPassword })
      return { message: 'Contraseña actualizada correctamente' }
    } catch (error) {
      throw boom.unauthorized()
    }
  }

  async sendMail(infoMail){
    const transporter = nodemailer.createTransport({
      host: config.EMAIL_SERVER,
      port: config.EMAIL_PORT,
      secure: config.EMAIL_SECURE,
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
      }
    })

    let info = await transporter.sendMail(infoMail)

    // console.log("Message sent: %s", info.messageId)
    return { msg: 'Correo enviado' }
  }

}

export { AuthService }
