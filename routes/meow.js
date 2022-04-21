const express = require('express');
const Publication = require('./../models/publication');
const routeGuard = require('./../middleware/route-guard');
const fileUpload = require('./../middleware/file-upload');
const meowRouter = new express.Router();

meowRouter.get('/create', routeGuard, (req, res) => {
  res.render('meow-create');
});

meowRouter.post(
  '/create',
  routeGuard,
  fileUpload.single('picture'), //name of the input in the hbs file
  (req, res, next) => {
    const { message } = req.body;
    let picture;
    if (req.file) {
      picture = req.file.path;
    }
    Publication.create({
      message,
      picture,
      creator: req.user._id
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        next(err);
      });
  }
);

meowRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Publication.findById(id)
    .populate('creator')
    .then((publication) => {
      res.render('meow-single', { publication });
    })
    .catch((err) => {
      next(err);
    });
});

meowRouter.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Publication.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = meowRouter;
