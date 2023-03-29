const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  adult: String,
  belongs_to_collection: String,
  budget: String,
  genres: String,
  homepage: String,
  id: String,
  imdb_id: String,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: String,
  poster_path: String,
  production_companies: String,
  production_countries: String,
  release_date: String,
  revenue: String,
  spoken_languages: String,
  status: String,
  title: String,
  video: String,
  vote_average: String,
  vote_count: String
})

module.exports = mongoose.model('Movie', MovieSchema)