import { Sequelize } from "sequelize";
import { dataBase } from "../config/dataBase.js";

const Usuario = dataBase.define('usuarios', {
  nombre: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  contrasena: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  confirmar: {
    type: Sequelize.STRING,
    // allowNull: false
  }
});

export default Usuario
