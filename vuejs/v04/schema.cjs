const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VSchema = new Schema({
  title: String,
  content: String,
  date: Date
})
module.exports = mongoose.model('vdb', VSchema, 'vdb')
