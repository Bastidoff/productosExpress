import Sequelize from 'sequelize';

const dataBase = new Sequelize('db_user', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

export {
  dataBase
}