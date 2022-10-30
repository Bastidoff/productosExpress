import express from 'express'
import { formularioLogin, formularioRegistro, formularioRecuperar } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/login', formularioLogin )
userRouter.get('/registro', formularioRegistro)
userRouter.get('/recuperar', formularioRecuperar)

export {
  userRouter
}