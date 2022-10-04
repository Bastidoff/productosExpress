import Usuario from '../models/UserModel.js'

const fomrularioLogin = (req, res) => {
  res.render(`user/login`, {
    nombreVista: 'Login'
  })
}
const fomrularioRegistro = (req, res) => {
  res.render(`user/registro`, {
    nombreVista: 'Registro'
  })
}
const fomrularioRecuperar = (req, res) => {
  res.render(`user/recuperar`, {
    nombreVista: 'Recuperar'
  })
}

/* Metodos CRUD */

const crearUsuario = async (req, res) => {
  const user = await Usuario.create(req.body)
  res.json(user);
  console.log(req.body)
  console.log(`Usuario Creado`);
}

export {
  fomrularioLogin,
  fomrularioRegistro,
  fomrularioRecuperar,
  crearUsuario
}