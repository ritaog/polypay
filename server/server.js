import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import connectDb from './models/db.js'
import session from 'express-session'
import passport from 'passport'
import path from 'path'
const __dirname = path.resolve()

import saleItemRouter from './routes/saleItemRouter.js'
import userRouter from './routes/userRouter.js'
import authRoutes from './routes/auth.js'
import paymentRouter from './routes/paymentRouter.js'

const app = express()
dotenv.config({ path: './config/config.env' })

const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({ secret: 'meow-meow', resave: true, saveUninitialized: true }))
app.use(json())
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

// "connect to database"
connectDb()

/////////////////////ROUTES//////////////
//description: http://localhost:5000/
app.use('/saleItem', saleItemRouter)
app.use('/user', userRouter)
app.use('/auth', authRoutes)
app.use('/payment', paymentRouter)
app.use('/', express.static('../client/build'))
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

//Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
