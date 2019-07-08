let mongoose = require('mongoose')
  let EmailSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    species: String,
    primaryColor: String
  })
  module.exports = mongoose.model('EmailSchema', EmailSchema)