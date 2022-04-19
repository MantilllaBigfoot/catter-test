const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      maxlength: 300,
      trim: true //spaces at beginning and end are removed
    },
    creator: {
      //objectId of another document
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User' //refers to the collection of the users => User Model
    }
  },
  {
    timestamps: true //created at...
  }
);

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;
