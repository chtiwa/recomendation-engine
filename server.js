require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const productsRoutes = require('./routes/products')
const errorHanlder = require('./middleware/error-handler')

app.use(express.json({ limit: "50mb" }))

app.use('/api/v1/products', productsRoutes)
app.use(errorHanlder)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, 'localhost', () => console.log(`The server is listening on port : ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()