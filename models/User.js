const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
  googleId:{
    type:String
  }
})

//create the user model class
mongoose.model('users',UserSchema)