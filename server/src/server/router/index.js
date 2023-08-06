const express = require('express');
const middlewares = require('../middlewares/basicMiddlewares')
const bandController = require('../controllers/bandController');
const albumController = require('../controllers/albumController')
const userController = require('../controllers/userController')
const hashPass = require('../middlewares/hashPass');
const checkToken = require('../middlewares/checkToken')
const router = express.Router();

router.post(
  '/registration',
  middlewares.checkNewUserName,
  hashPass,
  userController.registration,
)  

router.post(
  '/login',
  userController.login
)

router.post(
  '/editBandInfo',
  // middlewares.onlyForModerators,
  middlewares.checkBandInfo,
  bandController.editBandInfo
)

router.post(
  '/deleteAlbum',
  // middlewares.onlyForModerators,
  albumController.deleteAlbum
)

router.post(
  '/findBand',
  bandController.findBand
)

router.post(
  '/sendAlbumData',
  // middlewares.onlyForModerators,
  albumController.sendAlbumData,
  middlewares.checkAlbumName
)

router.post(
  '/getAlbumList',
  albumController.getAlbumList
)

router.post(
  '/getBandList',
  bandController.getBandList
)

router.post(
  '/postBandData',
  // middlewares.onlyForModerators,
  middlewares.checkBandName,
  bandController.postBandData,
 
)

module.exports = router;
