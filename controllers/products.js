const Product = require('../models/Product')
const asyncWrapper = require('../middleware/async-wrapper')
const BaseError = require('../middleware/error-handler')

const getProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find()
  res.status(200).json(products)
})

module.exports = { getProducts }
