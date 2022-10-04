import express from 'express';
import { fomrularioLogin, fomrularioRegistro, fomrularioRecuperar, crearUsuario } from '../controller/userController.js';
const userRoute = express.Router();

userRoute.get('/login', fomrularioLogin );
userRoute.get('/registro', fomrularioRegistro );
userRoute.post('/registro', crearUsuario );
userRoute.get('/recuperar', fomrularioRecuperar );

export {
  userRoute
}