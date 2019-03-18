//server dependencies
const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./config/keys')


//creating an instanse of the server
const server = express();

//setup what straegy passport should use
passport.use(
  new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback'
  },
  (accessToken,refreshToken,profile,done)=>{
    console.log('Access Token:',accessToken);
    console.log('Refresh Token:',refreshToken);
    console.log('Profile:',profile);
  })
)
//pass the user to google
server.get(
  '/auth/google',
  passport.authenticate('google',{
    scope:['profile','email']
  })
)
server.get('/auth/google/callback', passport.authenticate('google'))
const port = process.env.PORT || 5000
server.listen(port,()=>{
  console.log(`Connected on Port ${port}`);
})