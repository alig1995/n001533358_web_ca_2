const passport = require('passport')

module.exports=(server)=>{
  //pass the user to google
server.get(
  '/auth/google',
  passport.authenticate('google',{
    scope:['profile','email']
  })
)
server.get('/auth/google/callback', passport.authenticate('google'))
}