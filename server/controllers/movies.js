const Movie = require('../models/Movie')
const asyncWrapper = require('../middleware/async-wrapper')
const BaseError = require('../errors/base-error')


function calculateDistance(movie1, movie2) {
  // due to weird data by kaggle
  const movie1Genres = movie1.Genre.split(',').map((genre) => genre)
  const movie2Genres = movie2.Genre.split(',').map((genre) => genre)

  const union = [...movie1Genres, ...movie2Genres]
  const intersection = movie1Genres.filter((genre) => movie2Genres.includes(genre))

  const calcGenre = union.map((genre) => intersection.includes(genre) ? Math.pow(Number(movie1.vote_average) - Number(movie2.vote_average), 2) : 0).reduce((sum, x) => sum + x, 0)
  const calcIMDB_Rating = Math.pow(Number(movie1.IMDB_Rating) - Number(movie1.IMDB_Rating), 2)
  const calcMeta_score = Math.pow(Number(movie1.Meta_score) - Number(movie1.Meta_score), 2)
  const distance = Math.sqrt(calcGenre + calcIMDB_Rating + calcMeta_score)
  return 1 / (1 + distance)
}

const getMovieRecommendationV_1 = asyncWrapper(async (req, res) => {

  // const movie = await Movie.findById(req.query.movie_id)
  const regex = new RegExp(req.query.title, 'i')
  const query = { Series_Title: { $regex: regex } }
  const movie = await Movie.findOne(query)
  if (!movie) {
    throw new BaseError("The movie doesn't exist", 404)
  }

  const movies = await Movie.find({ _id: { $ne: movie._id } }, {
    Poster_Link: 1,
    Series_Title: 1,
    Released_Year: 1,
    Runtime: 1,
    Genre: 1,
    IMDB_Rating: 1,
    Meta_score: 1,
    _id: 1
  }).limit(50)
  const distances = movies.map((otherMovie) => ({ movie: otherMovie, distance: calculateDistance(movie, otherMovie) }))

  distances.sort((a, b) => b.distance - a.distance)
  // the limit of the movies per page
  const limit = parseInt(req.query.limit) || 10
  const skip = limit * (parseInt(req.query.page || 1))
  const totalPages = Math.ceil(movies.length / limit)

  const recommendations = distances.map((distance) => distance.movie)
  res.status(200).json({ success: true, movies: recommendations, totalPages: totalPages, page: req.query.page })

})

const getMovieRecommendationV_2 = asyncWrapper(async (req, res) => {
  const movies = await Movie.aggregate([
    {
      $match: {
        // "vote_average": { $not: { $type: "string" } }, 
        // "vote_count": { $not: { $type: "string" } },
        // kaggle has got weird genre "Action, Drama" so the filtering based on the genre is off
        // "Genre": req.query.Genre, 
        "_id": { $ne: req.query.movie_id }
      }
    },
    {
      $project: {
        Poster_Link: 1,
        Series_Title: 1,
        Released_Year: 1,
        Runtime: 1,
        Genre: 1,
        IMDB_Rating: 1,
        Meta_score: 1,
        _id: 1,
        distance: {
          $sqrt: {
            $add: [
              { $pow: [{ $subtract: [Number(req.query.IMDB_Rating), { $toDecimal: "$IMDB_Rating" }] }, 2] },
              { $pow: [{ $subtract: [Number(req.query.Meta_score), { $toDecimal: "$Meta_score" }] }, 2] }
            ]
          }
        }
      }
    }, {
      $match: {
        distance: { $ne: null }
      }
    }, {
      $sort: { distance: 1 }
    }, {
      $limit: 20
    }
  ])

  res.status(200).json({ success: true, movies: movies })
})

const getMoviesByPage = asyncWrapper(async (req, res) => {
  const limit = parseInt(req.query.limit) || 20
  const skip = limit * (parseInt(req.query.page || 1))
  const totalPages = Math.ceil(await Movie.countDocuments() / limit)
  const movies = await Movie.find({}, {
    Poster_Link: 1,
    Series_Title: 1,
    Released_Year: 1,
    Runtime: 1,
    Genre: 1,
    IMDB_Rating: 1,
    Meta_score: 1,
    _id: 1
  }).skip(skip).limit(limit).sort({ _id: -1 })


  res.status(200).json({ success: true, movies: movies, totalPages: totalPages, page: req.query.page })
})


module.exports = { getMovieRecommendationV_1, getMoviesByPage, getMovieRecommendationV_2 }