require('dotenv').config()
const Product = require('../models/Product')
const { faker } = require('@faker-js/faker')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedProducts = async () => {
  try {
    for (let i = 0; i < 100; i++) {
      await Product.create({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        views: Math.floor(Math.random() * 1000)
      });
    }
    console.log("done!!!")
  } catch (error) {
    console.log(error.message)
  }
}

seedProducts()