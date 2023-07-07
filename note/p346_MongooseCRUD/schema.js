const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  albumId: Number,
  id: Number,
  title: String,
  url: String,
  thumbnailUrl: String
})

module.exports = mongoose.model('mycol', schema, 'mycol')
