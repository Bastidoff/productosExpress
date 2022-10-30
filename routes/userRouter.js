import express from 'express'

const userRouter = express.Router()

userRouter.get('/login', (req, res)=>{
  res.send('Vista Login')
})
userRouter.get('/registro', (req, res)=>{
  res.send('Vista registro')
})
userRouter.get('/recuperar', (req, res)=>{
  res.send('Vista recuperar')
})

export {
  userRouter
}