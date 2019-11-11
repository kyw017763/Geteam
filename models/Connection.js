import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/zteam';
const connection = mongoose.createConnection(
  url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
    if (err) {
      console.log('Connected failed');
    }
    console.log('Connected successfully to server');
  },
);

export default connection;
