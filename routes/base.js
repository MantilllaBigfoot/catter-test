'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/route-guard');
const Publication = require('./../models/publication');

router.get('/', (req, res, next) => {
  Publication.find()
    //gets the creator Object ID and the corresponding user
    //fetches documents from the user collection and gets the user with the ObjectId
    //replaces the values of the "publications.creator" with the user object
    .populate('creator')
    .sort({ createdAt: -1 }) //sorts the data to the newest first
    .then((publications) => {
      res.render('home', { publications });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

module.exports = router;
