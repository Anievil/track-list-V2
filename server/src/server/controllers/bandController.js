const Bands = require('../models/Bands');
const mongo = require('mongoose')
const ServerError = require('../errors/ServerError')
// const db = require('../models/index');
const _ = require('lodash');

module.exports.editBandInfo = async (req, res, next) => {
  try {
    const id = mongo.Types.ObjectId(req.body._id)
    const bandData = req.body
    delete bandData._id
    console.log(id)
    console.log(bandData)
    Bands.findOneAndUpdate({_id: id}, bandData, (err) =>(console.log(err)))
  } catch (err) {
    next(new ServerError('Server error, you cant edit band'))
  }
};

module.exports.postBandData = async (req, res, next) => {
  try {
    const newBand = new Bands({
      bandName: req.body.bandName,
      bandDescription: req.body.bandDescription,
      bandProfPic: req.body.bandProfPic
    })
    newBand.save()
    res.sendStatus(200)
  } catch (err) {
    next(new ServerError('Server error, you cant create new band'))
    res.sendStatus(500)
  }
};

module.exports.getBandList = async (req, res, next) => {
  try {
    const bands = await Bands.find()
    res.send(bands);
  } catch (err) {
    next(new ServerError('Server error, you cant get band list'))
  }
};

module.exports.findBand = async (req, res, next) => {
  try {
    const value = req.body.value ? req.body.value : mongo.Types.ObjectId(req.body._id)
    const name = req.body.value ? "bandName" : "_id"
    const bands = await Bands.aggregate([
      {
        $match: { [name]: value }
      },
      {
        $project: {
          bandName: 1,
          bandDescription: 1,
          bandProfPic: 1
        },
      },
    ]);
    res.send(bands);
  } catch (err) {
    next(new ServerError('Server error, you cant find this band'))
  }
};