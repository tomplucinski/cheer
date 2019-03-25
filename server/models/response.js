const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  response: {
    type: String
  },
  polarResponse: {
    type: String
  },
  rateResponse: {
    type: Number
  },
  score: {
    type: Number
  },
  questionText: {
    type: String
  },
  userSlackId: {
    type: String
  }
})

module.exports = mongoose.model('response', responseSchema)
