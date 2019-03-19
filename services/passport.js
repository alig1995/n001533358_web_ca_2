const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')

passport.serializeUser((user,done)=>{
  done(null,user.id)
})
//take the d and turn it back into a model
passport.deserializeUser((id,done)=>{
  User
    .findById(id)
    .then(user=>{
      done(null,user)
    })
})

//user model class
const User = mongoose.model('users')

//setup what straegy passport should use
passport.use(
  new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback',
    proxy:true
  },
  (accessToken,refreshToken,profile,done)=>{
    User.findOne({
      googleId:profile.id
    }).then((existingUser) => {
      if (existingUser) {
        //db has record with given id
        console.log('user exists');
        done(null,existingUser)
      }else{
        //id doesnt exist then make a new record

        //creetes a new model
        new User({
          googleId:profile.id
        })
        .save()
        .then((user) => {
          done(null,user)
        })
      }
     
    }).catch((err) => {
      console.log(err);
    });
  })
)