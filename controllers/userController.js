import { Usuario } from "../models/UserModel.js"
import {check, validationResult} from 'express-validator'

const formularioLogin = (req, res)=>{
  res.render('auth/login', {
    nombreVista: 'Iniciar Sesion'
  })
}
const formularioRegistro = (req, res)=>{
  res.render('auth/registro', {
    nombreVista: 'Nuevo Usuario'
  })
}

const crearUsuario = async (req, res) => {
  await check('nombre').notEmpty().withMessage('El campo nombre es obligatorio').run(req)
  await check('correo').isEmail().withMessage('El correo debe llevar un formato valido').run(req)
  await check('contrasena').isLength({min:5}).withMessage('La contrasena debe tener minimo 5 caracteres').run(req)
  await check('rcontrasena').equals('contrasena').withMessage('Las contrasenas no coinciden').run(req)
  
  let listadoErrores = validationResult(req)

  if(!listadoErrores.isEmpty()){
    return res.render('auth/registro', {
      nombreVista: 'Nuevo Usuario',
      errores: listadoErrores.array(),
      usuario: {
        nombre: req.body.nombre,
        correo: req.body.correo,
      }
    })
  }

  const validarUsuario = await Usuario.findOne({where: {correo:req.body.correo}})

  if(validarUsuario){
    return res.render('auth/registro', {
      nombreVista: 'Nuevo Usuario',
      errores:[{msg: 'El correo ya existe en la base de datos'}],
      usuario: {
        nombre: req.body.nombre,
        correo: req.body.correo,
      }
    })
  }
  console.log('El Correo ya esta registrado en la base de datos')
  return

  res.json(listadoErrores.array())

  const usuario = await Usuario.create(req.body)
  res.json(usuario)
}

const formularioRecuperar = (req, res)=>{
  res.render('auth/recuperar', {
    nombreVista: 'Recuperar Usuario'
  })
}

export {
  formularioLogin,
  formularioRegistro,
  formularioRecuperar,
  crearUsuario
}