const Post = require('../models/Post')
const asyncWrapper = require('../middleware/async-wrapper')
const BaseError = require('../middleware/error-handler')

const getPosts = asyncWrapper(async (req, res) => {
  let posts = null
  if (posts === null) {
    throw BaseError('Unauthorized', 401)
  }
  res.status(200).json()
})

module.exports = { getPosts }
