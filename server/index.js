const express = require('express');
const path = require('path');
require('dotenv').config();

const users = require('./controllers/users');

const app = express()
const port = process.env.PORT || 3000;

console.log(process.env.BEST_CLASS);

//  Middleware
app.use(express.json());
app.use(express.static( __dirname + '/../docs/'))

//  Authentication
app.use(function(req, res, next) {
  const arr = (req.headers.authorization || "").split(" ");
  if(arr.length > 1 && arr[1] != null){
      req.userId = +arr[1];
  }
  next();
});

//  API
app.get('/hello', (req, res, next) => {
  res.send('Hello Hudson Valley! You requested ' + req.url)
})

app.use('/users', users);

app.get('*', (req, res, next) => {
    const filename = path.join(__dirname, '/../docs/index.html');
    console.log(filename);
    res.sendFile( filename );
})

app.use( (err, req, res, next) =>{
    console.log(err);
    res.status(err.status || 500).send( { message: err.message } )
} )



//  Init
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})