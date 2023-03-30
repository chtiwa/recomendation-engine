const Movie = require('./models/Movie')
const asyncWrapper = require('./middleware/async-wrapper')
const BaseError = require('./middleware/error-handler')


function calculateDistance(movie1, movie2) {
  // due to weird data by kaggle
  // redo backend names and movie schema
  const movie1Genres = JSON.parse(movie1.genres.replace(/'/g, '"')).map((genre) => genre.name)
  const movie2Genres = JSON.parse(movie2.genres.replace(/'/g, '"')).map((genre) => genre.name)

  const union = [...movie1Genres, ...movie2Genres]
  const intersection = movie1Genres.filter((genre) => movie2Genres.includes(genre))

  const distance = Math.sqrt(union.map((genre) => intersection.includes(genre) ? Math.pow(Number(movie1.vote_average) - Number(movie2.vote_average)) : 0).reduce((sum, x) => sum + x, 0))
  return 1 / (1 + distance)
}

const getMovieRecommendationV_1 = asyncWrapper(async (req, res) => {
  const movie = await Movie.findById(req.query.movie_id)
  if (!movie) {
    throw new BaseError("The movie doesn't exist", 404)
  }

  const movies = await Movie.find({ _id: { $ne: movie._id } }).limit(100)
  const distances = movies.map((otherMovie) => ({ movie: otherMovie, distance: calculateDistance(movie, otherMovie) }))

  distances.sort((a, b) => b.distance - a.distance)

  const recommendations = distances.map((distance) => distance.movie)
  res.status(200).json({ success: true, movies: recommendations })

})

const getMovieRecommendationV_2 = asyncWrapper(async (req, res) => {
  const movies = await Movie.aggregate([
    {
      $match: {
        // "vote_average": { $not: { $type: "string" } }, 
        // "vote_count": { $not: { $type: "string" } },
        // "genres.name": req.query.genres, genres type is false when the  data was uploaded
        "_id": { $ne: req.query._id }
      }
    },
    {
      $project: {
        original_title: 1,
        vote_average: 1,
        vote_count: 1,
        overview: 1,
        release_date: 1,
        genres: 1,
        runtime: 1,
        distance: {
          $sqrt: {
            $add: [
              { $pow: [{ $subtract: [Number(req.query.vote_average), { $toDecimal: "$vote_average" }] }, 2] },
              { $pow: [{ $subtract: [Number(req.query.vote_count), { $toDecimal: "$vote_count" }] }, 2] },
              { $pow: [{ $subtract: [Number(req.query.runtime), { $toDecimal: "$runtime" }] }, 2] },
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
      $limit: 10
    }
  ])

  res.status(200).json({ success: true, movies: movies })
})

const getMoviesByPage = asyncWrapper(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10
  const skip = limit * (parseInt(req.query.page || 1))
  const movies = await Movie.find({}, {
    fields: {
      original_title: 1,
      vote_average: 1,
      vote_count: 1,
      overview: 1,
      release_date: 1,
      genres: 1,
      runtime: 1
    },
    limit: limit,
    skip: skip,
    sort: { _id: 1 }
  })

  res.status(200).json({ success: true, movies: movies })
})


module.exports = { getMovieRecommendationV_1, getMoviesByPage, getMovieRecommendationV_2 }