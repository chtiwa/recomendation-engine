const express = require('express')
const router = express.Router()
const { getMoviesByPage, getMovieRecommendationV_1, getMovieRecommendationV_2 } = require('../controllers/movies')

router.route('/').get(getMoviesByPage)
router.route('/recommend_1').get(getMovieRecommendationV_1)
router.route('/recommend_2').get(getMovieRecommendationV_2)

module.exports = router