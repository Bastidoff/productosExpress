// Importanto la dependencia y extrayeno la funcion de exress
import express from 'express'
import { userRouter } from './routes/userRouter.js'

// Realizando la instancia para trabajar con express
const app = express()
// Definiendo el puerto en el cual correra el servidor
const puerto = 3000

app.use('/auth', userRouter)

app.set('view engine', 'pug')
app.set('views', './views')

// Levantando el servidor en el peurto con la funcion lister de express
app.listen(puerto, ()=>{
  console.log(`Servidor corriendo en el puerto ${puerto}`)
})