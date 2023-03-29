require('dotenv').config()
const Movie = require('../models/Movie')
const { faker } = require('@faker-js/faker')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = ["food", "sunglasses", "cars", "phones", "fruits", "animals", "toys", "planes", "cushions", "chairs"]

const seedProducts = async () => {
  try {
    for (let i = 0; i < 100; i++) {
      await Movie.create({
        name: faker.m,
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        views: Math.floor(Math.random() * 1000),
        category: [categories[Math.floor(Math.random() * 10)], categories[Math.floor(Math.random() * 10)]]
      });
    }
    console.log("done!!!")
  } catch (error) {
    console.log(error.message)
  }
}

seedProducts()