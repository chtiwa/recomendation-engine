require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./db/connect')
const moviesRoutes = require('./routes/movies')
const errorHanlder = require('./middleware/error-handler')

app.use(cors({origin:[process.env.CLIENT_URL]}))
app.use(express.json({ limit: "50mb" }))

app.use('/api/v1/movies', moviesRoutes)
app.use(errorHanlder)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`The server is listening on port : ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()