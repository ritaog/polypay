import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js'
import session from 'express-session'
import passport from 'passport'


import vendorRouter from './routes/vendorRouter.js'
import authRoutes from './routes/auth.js'

const app = express()
const PORT = process.env.PORT || 5000

dotenv.config({ path: './config/config.env' })
app.use(session({ secret: 'cats' }))
app.use(json())
app.use(cors())

app.use(passport.initialize())
app.use(passport.session())

// "connect to database"
connectDb()

/////////////////////ROUTES//////////////
//description: http://localhost:5000/api
app.use('/vendor', vendorRouter)
app.use('/auth', authRoutes)

//Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
