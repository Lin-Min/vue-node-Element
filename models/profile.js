const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema ({
  type: {
    type: String
  },
  describes: {
    type: String
  },
  // ??
  incomes: {
    type: String,
    require: true
  },
  // ??
  expends: {
    type: String,
    require: true
  },
  // ??
  cash: {
    type: String,
    require: true
  },
  // ??
  remarks: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('profile',profileSchema) 

