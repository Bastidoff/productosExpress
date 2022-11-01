import { Usuario } from "../models/UserModel.js";
import { check, validationResult } from "express-validator";
import nodemailer from 'nodemailer';

const authenticated = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1c914447d06a9c",
    pass: "f8e6f834fdbc42"
  }
});

const enviarCorreo = async (usuario) =>{

  const {nombre, correo, contrasena, token} = usuario

  await authenticated.sendMail({
    from: 'proyectonodejs@developer.com',
    sender: 'Jaime Zapata Valencia',
    to: correo,
    subject: 'Creacion de usuario',
    html:
    `
      <h1 style="color: red; text-align: center;">Bienvenido a Proyectos Node JS</h1>
      <h2>Hola ${nombre}</h2>
      <h3>Instrucciones de activacion</h3>
      <ul>
        <li>Correo: ${correo}</li>
        <li>Contrasena: ${contrasena}</li>
      </ul>

      <p>Para confirmar usuario dar click en el enlace adjunto a este correo</p>
      <p><a href="http://localhost:3000/auth/confirmarUsuario/${token}">Activar usuario</a></p>
    `
  })
}


const generarId = () =>
  Math.random().toString(32).substring(2) + Date.now().toString(32);

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    nombreVista: "Iniciar Sesion",
  });
};
const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    nombreVista: "Nuevo Usuario",
  });
};

const crearUsuario = async (req, res) => {
  await check("nombre")
    .notEmpty()
    .withMessage("El campo nombre es obligatorio")
    .run(req);
  await check("correo")
    .isEmail()
    .withMessage("El correo debe llevar un formato valido")
    .run(req);
  await check("contrasena")
    .isLength({ min: 5 })
    .withMessage("La contrasena debe tener minimo 5 caracteres")
    .run(req);
  await check("rcontrasena")
    .equals("contrasena")
    .withMessage("Las contrasenas no coinciden")
    .run(req);

  let listadoErrores = validationResult(req);

  if (!listadoErrores.isEmpty()) {
    return res.render("auth/registro", {
      nombreVista: "Nuevo Usuario",
      errores: listadoErrores.array(),
      usuario: {
        nombre: req.body.nombre,
        correo: req.body.correo,
      },
    });
  }
  const { nombre, correo, contrasena } = req.body;

  const validarUsuario = await Usuario.findOne({ where: { correo } });

  if (validarUsuario) {
    return res.render("auth/registro", {
      nombreVista: "Nuevo Usuario",
      errores: [{ msg: "El correo ya existe en la base de datos" }],
      usuario: {
        nombre: req.body.nombre,
        correo: req.body.correo,
      },
    });
  }

  const usuario = await Usuario.create({
    nombre,
    correo,
    contrasena,
    token: generarId(),
  });

  enviarCorreo(usuario)

  res.render("templates/usuarioCreado", {
    nombreVista: "Confirmacion Usuario",
    mensaje:
      "Revisa tu correo electronico para confirmar la creacion de usuario",
  });
};

const formularioRecuperar = (req, res) => {
  res.render("auth/recuperar", {
    nombreVista: "Recuperar Usuario",
  });
};

const activarUsuario = async (req, res) => {

  const {token} = req.params
  const usuario = await Usuario.findOne({where: {token}})

  if(usuario){
    usuario.token = null;
    usuario.estado = true;
    await usuario.save();
    return res.render("templates/usuarioCreado", {
      nombreVista: "Confirmacion Usuario",
      mensaje:
        "Activacion de usuario correcta. Por favor iniciar sesion",
    });
  }

  res.render("templates/usuarioCreado", {
    nombreVista: "Confirmacion Usuario",
    mensaje:
      "No se pudo activar la cuenta. Token errado o expirado",
  });
}

export {
  formularioLogin,
  formularioRegistro,
  formularioRecuperar,
  crearUsuario,
  activarUsuario
};
