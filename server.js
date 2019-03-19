//server dependencies
const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

require('./models/User')
require('./services/passport')

mongoose
  .connect(keys.mongoURI)

//creating an instanse of the server
const server = express();

//make server use cookies and passport
server.use(
  cookieSession({
    maxAge: 30*24*60*60*100,
    keys:[keys.cookieKey]
  })
)
server.use(passport.initialize())
server.use(passport.session())


require('./routes/authRoutes')(server)
const port = process.env.PORT || 5000
server.listen(port,()=>{
  console.log(`Connected on Port ${port}`);
})