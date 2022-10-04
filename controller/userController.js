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

export {
  fomrularioLogin,
  fomrularioRegistro,
  fomrularioRecuperar
}