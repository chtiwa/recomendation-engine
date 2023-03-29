const Movie = require('../models/Movie')
const asyncWrapper = require('../middleware/async-wrapper')
const BaseError = require('../middleware/error-handler')


const getMovieRecommendation = asyncWrapper(async (req, res) => {
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
        distance: {
          $sqrt: {
            $add: [
              { $pow: [{ $subtract: [Number(req.query.vote_average), { $toDecimal: "$vote_average" }] }, 2] },
              { $pow: [{ $subtract: [Number(req.query.vote_count), { $toDecimal: "$vote_count" }] }, 2] },
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
      $limit: 50
    }
  ])

  res.status(200).json({ success: true, movies: movies })
})

const getMoviesByPage = asyncWrapper(async (req, res) => {
  const limit = 10
  const skip = limit * (parseInt(req.query.page || 1))
  const movies = await Movie.find({}, {
    fields: {
      Series_Title: 1,
      Released_Year: 1,
      Runtime: 1,
      Genre: 1,
      Overview: 1
    },
    limit: limit,
    skip: skip,
    sort: { _id: 1 }
  })

  res.status(200).json({ success: true, movies: movies })
})


module.exports = { getMovieRecommendation, getMoviesByPage }