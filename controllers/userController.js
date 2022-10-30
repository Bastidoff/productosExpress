import { Usuario } from "../models/UserModel.js"

const formularioLogin = (req, res)=>{
  res.render('auth/login')
}
const formularioRegistro = (req, res)=>{
  res.render('auth/registro', {
    nombreVista: 'Nuevo Usuario'
  })
}

const crearUsuario = async (req, res) => {
  const usuario = await Usuario.create(req.body)
  res.json(usuario)
}

const formularioRecuperar = (req, res)=>{
  res.render('auth/recuperar')
}

export {
  formularioLogin,
  formularioRegistro,
  formularioRecuperar,
  crearUsuario
}