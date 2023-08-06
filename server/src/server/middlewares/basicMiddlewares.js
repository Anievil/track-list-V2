const Bands = require('../models/Bands');
const Users = require('../models/Users');
const Albums = require('../models/Albums')
const mongo = require('mongoose')
const ApplicationError = require('../errors/ApplicationError')
const NameError = require('../errors/NameError')
const AuthorisationError = require('../errors/AuthorisationError')
const CONSTANTS = require('../../constants')

module.exports.checkBandInfo = (req, res, next) => {
  if (req.body.bandName === '')
    delete req.body.bandName
  if (req.body.bandDescription === '')
    delete req.body.bandDescription
  if (req.body.bandProfPic === '')
    delete req.body.bandProfPic
  next();
};

module.exports.checkBandName = async (req, res, next) => {
  const bands = await Bands.aggregate([
    {
      $match: { bandName: req.body.bandName }
    },
    {
      $project: {
        bandName: 1,
        bandDescription: 1,
        bandProfPic: 1
      },
    },
  ]);

  if(bands[0] == undefined){
    next();
  }
  else{
    next(new NameError());
  }
};

module.exports.checkAlbumName = async (req, res, next) => {
  const album = await Users.aggregate([
    {
      $match: { albumName: req.body.albumName }
    },
    {
      $project: {
        albumName: 1,
        bandId: 1,
        albumPic: 1
      },
    },
  ]);

  if(album[0] == undefined){
    next();
  }
  else{
    next(new NameError('Такий альбом вже існує'));
  }
};

// module.exports.onlyForModerators = (req, res, next) => {
//   console.log(req.tokenData.role)
//   console.log(CONSTANTS.MODER)
//   if (req.tokenData.role === CONSTANTS.MODER) {
//     next();
//   } else {
//     return next(new ApplicationError('this page only for administrator'));
//   }
// };

module.exports.checkNewUserName = async (req, res, next) => {
  const foundUser = await Users.aggregate([
    {
      $match: { "name": req.body.name }
    },
    {
      $project: {
        password: 1,
        accessToken: 1,
        role: 1
      },
    },
  ]);

  if(foundUser[0] == undefined){
    next();
  }
  else{
    next(new AuthorisationError('Користувач с таким ім\'ям вже існує'));
  }
};