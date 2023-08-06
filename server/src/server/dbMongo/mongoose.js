const mongoose = require('mongoose');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..',
  'config/mongoConfig.json');
const config = require(configPath)[ env ];
let db = {}
mongoose.connect(
  `mongodb+srv://admin:12345@cluster0.d2qf3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) => {
    if (err) {
      return console.log(err);
    }
  });

mongoose.set('debug', env === 'development');

module.exports = mongoose;
