const formularioLogin = (req, res)=>{
  res.render('auth/login')
}
const formularioRegistro = (req, res)=>{
  res.render('auth/registro', {
    nombreVista: 'Nuevo Usuario'
  })
}
const formularioRecuperar = (req, res)=>{
  res.render('auth/recuperar')
}

export {
  formularioLogin,
  formularioRegistro,
  formularioRecuperar
}