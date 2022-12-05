require('dotenv').config()
require('express-async-errors')

const path = require('path')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const BadRequest = require('./errors/BadRequest')

// middlewares
const customErrorHandler = require('./middleware/customErrorHandler')
const notfound = require('./middleware/Notfound')


app.use(express.json())
app.use(cors())
app.use(cookieParser())



const port = process.env.PORT || 5000



app.use(customErrorHandler)
app.use(notfound)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () =>
      console.log(`Server is listening on port: ${port}...`)
    )
  } catch (error) {
    throw new BadRequest('Cannot Connect to db')
  }
}
// start()