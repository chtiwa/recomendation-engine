const express = require('express')
const router = express.Router()
const { getMoviesByPage, getMovieRecommendation } = require('../controllers/movies')

router.route('/').get(getMoviesByPage)
router.route('/recommend').get(getMovieRecommendation)

module.exports = router