const ServerError = require('../../errors/ServerError');
const bcrypt = require('bcrypt');
const mongo = require('mongoose')
const Users = require('../../models/Users');

module.exports.passwordCompare = async (pass1, pass2) => {
  console.log(pass1)
  console.log(pass2)
    const passwordCompare = await bcrypt.compare(pass1, pass2);
    console.log('ok')
    if ( !passwordCompare) {
      console.log('Wrong password')
      throw new ServerError('Wrong password');
    }
  };

  module.exports.updateUser = async (data, userId) => {
    const id = mongo.Types.ObjectId(userId)
    const userData = data
    delete userData._id
    console.log(id)
    console.log(userData)
    console.log(data)
    Users.findOneAndUpdate({_id: id}, userData, (err) =>(console.log(err)))
    
 
  };