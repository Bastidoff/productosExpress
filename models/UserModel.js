import { Sequelize } from "sequelize";
import { dataBase } from "../config/dataBase.js";

const Usuario = dataBase.define('usuarios', {
  nombre: {
    type: Sequelize.STRING,
  },
  correo: {
    type: Sequelize.STRING,
  },
  contrasena: {
    type: Sequelize.STRING,
  },
  ccontrasena: {
    type: Sequelize.STRING,
  }
});

export {
  Usuario
}