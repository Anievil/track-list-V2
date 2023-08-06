const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  albumName: {
    type: 'String',
    required: true,
    unique: true
  },
  bandId: {
    type: 'String',
    required: true,
  },
  albumPic: {
    type: 'String',
    required: true,
  },
},
  {
    timestamps: true,
  });

const Albums = mongoose.model('Albums', Schema);

module.exports = Albums;
