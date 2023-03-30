const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  Poster_link: String,
  Series_Title: String,
  Release_Year: String,
  Certificate: String,
  Runtime: String,
  Genre: String,
  IMDB_Rating: String,
  Overview: String,
  Meta_score: String,
  Director: String,
  Star1: String,
  Star2: String,
  Star3: String,
  Star4: String,
  No_of_Votes: String,
})

module.exports = mongoose.model('Movie', MovieSchema)