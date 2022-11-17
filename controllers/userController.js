import { Usuario } from "../models/UserModel.js";
import { check, validationResult } from "express-validator";
import { generarId, enviarCorreo } from "../helper/funciones.js";

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

  enviarCorreo(usuario);

  res.render("templates/usuarioCreado", {
    nombreVista: "Confirmacion Usuario",
    mensaje:
      "Revisa tu correo electrónico para confirmar la creación de usuario",
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
      nombreVista: "Confirmación Usuario",
      mensaje:
        "Activación de usuario correcta. Por favor iniciar sesión",
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
