const jwt = require('jsonwebtoken');
const mongo = require('mongoose')
const AuthorisationError = require('../errors/AuthorisationError')
const ServerError = require('../errors/ServerError')
// const db = require('../models/index');
const _ = require('lodash');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const userQueries = require('./queries/userQueries');
const CONSTANTS = require('../../constants');

module.exports.login = async (req, res, next) => {
    try {
      const foundUser = await Users.aggregate([
        {
          $match: { "name": req.body.name }
        },
        {
          $project: {
            name: 1,
            password: 1,
            accessToken: 1,
            role: 1
          },
        },
      ]);
      console.log(foundUser)
      await userQueries.passwordCompare(req.body.password, foundUser[0].password);
      const accessToken = jwt.sign({
        name: foundUser[0].firstName,
        userId: foundUser[0]._id,
        role: foundUser[0].role,
      }, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
      await userQueries.updateUser({ accessToken }, foundUser[0]._id);
      res.send({ token: accessToken, userData: foundUser });
    } catch (err) {
      next(new AuthorisationError());
    }
  };

  module.exports.registration = async (req, res, next) => {
    try {
      const newUser = new Users({
        name: req.body.name,
        password: req.hashPass,
        role: req.body.role
      })
      console.log(newUser)
      newUser.save()
      res.sendStatus(200);
    } catch (err) {
      next(new ServerError());
    }
  };