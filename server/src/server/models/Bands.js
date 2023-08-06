const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  bandName: {
    type: 'String',
    required: true,
    unique: true,
    
  },
  bandDescription: {
    type: 'String',
    required: false,
  },
  bandProfPic: {
    type: 'String',
    required: true,
  },
});

const Bands = mongoose.model('Bands', Schema);
module.exports = Bands;


