import express from 'express';
import { userRoute } from './router/userRouter.js';
import { dataBase } from './config/dataBase.js';
const app = express();
const puerto = 3000;

try {
  await dataBase.authenticate();
  dataBase.sync()
  console.log(`Coneccion exitosa a la base de datos`)
} catch (error) {
  console.log(`No es posible acceder a la base de datos`)
  console.log(`Motivo: ${error}`)
}

app.set('view engine', 'pug')
app.set('views', './views')
app.set(express.static('public'))
app.use(userRoute);

app.use(express.urlencoded({extended: true}));

app.listen(puerto, ()=>{
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
