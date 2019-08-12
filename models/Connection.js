const mongoose = require('mongoose');

let url = 'mongodb://localhost:27017/zteam';
let connection = mongoose.createConnection(url, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true}, function(err) {
  if(err){
    console.log("Connected failed");
  }
  console.log("Connected successfully to server");
});

module.exports = connection;