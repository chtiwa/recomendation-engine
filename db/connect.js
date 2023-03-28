const mongoose = require('mongoose')

const connectDB = (uri) => {
  return mongoose.connect(uri, {
    useUnifiedTopology: true
  })
    .then(() => console.log("Connected to the database!!!"))
    .catch((err) => console.log(err))
}

module.exports = connectDB