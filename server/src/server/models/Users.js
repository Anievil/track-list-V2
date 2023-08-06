const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: {
    type: 'String',
    required: true,
    unique: true
  },
  password: {
    type: 'String',
    required: false,
  },
  accessToken: {
    type: 'String'
  },
  role: {
    type: 'String',
    required: true,
  },
});

const Users = mongoose.model('Users', Schema);
module.exports = Users;


