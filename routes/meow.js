const express = require('express');
const Publication = require('./../models/publication');
const meowRounter = new express.Router();
const routeGuard = require('./../middleware/route-guard');

meowRounter.get('/create', routeGuard, (req, res) => {
  res.render('meow-create');
});

meowRounter.post('/create', routeGuard, (req, res, next) => {
  const { message } = req.body;
  Publication.create({
    message,
    creator: req.user._id
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = meowRounter;
