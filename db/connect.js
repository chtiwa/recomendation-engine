const mongoose = require('mongoose')

const connectDB = (uri) => {
  return mongoose.connect(uri, {
    useUnifiedTpology: true
  })
    .then(() => console.log("Connected to the database!!!"))
    .catch((err) => {
      console.log(err)
      exit(1)
    })
}

module.exports = connectDB