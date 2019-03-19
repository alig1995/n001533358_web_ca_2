//server dependencies
const express = require('express')
require('./services/passport')


//creating an instanse of the server
const server = express();

require('./routes/authRoutes')(server)


const port = process.env.PORT || 5000
server.listen(port,()=>{
  console.log(`Connected on Port ${port}`);
})