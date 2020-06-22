const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  idCart: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})
module.exports = Users = mongoose.model('user',userSchema) 

