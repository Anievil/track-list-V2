const Albums = require('../models/Albums');
const mongo = require('mongoose')
const ServerError = require('../errors/ServerError')
const _ = require('lodash');
const { model } = require('../models/Albums');

module.exports.deleteAlbum = async (req, res, next) => {
  try {
    Albums.findOneAndDelete({
      _id: req.body._id}
    ,(err) =>(console.log(err)))
    res.sendStatus(200)
  } catch (err) {
    next(new ServerError('Server error, you cant delete album'))
  }
};

module.exports.sendAlbumData = async (req, res, next) => {
  try {
    const newAlbum = new Albums({
      albumName: req.body.albumName,
      bandId: req.body.bandId,
      albumPic: req.body.albumPic
    })
    console.log(newAlbum)
    newAlbum.save()
    res.sendStatus(200)
  } catch (err) {
    next(new ServerError('Server error, you cant add new album'))
  }
};

module.exports.getAlbumList = async (req, res, next) => {
  try {
    const albums = await Albums.aggregate([
      {
        $match: { "bandId": req.body.bandId }
      },
      { 
        $project: {
        albumName: 1,
        bandId: 1,
        albumPic: 1,
      },
    }
    ]); 
    res.send(albums);
  } catch (err) {
    next(new ServerError('Server error, you cant get albums'))
  }
};