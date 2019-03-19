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
server.get('/api/logout',(req,res)=>{
  req.logout()
  res.send(req.user)
})
server.get('/api/current_user',(req,res)=>{
  // res.send(req.session)
  res.send(req.user)
})
}