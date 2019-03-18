//server dependencies
const express = require('express')
//creating an instanse of the server
const server = express();


server.get('/',(req,res)=>{
  res.send({bye:'alig1995'})
})

const port = process.env.PORT || 5000
server.listen(port,()=>{
  console.log(`Connected on Port ${port}`);
})