const mongoose = require('mongoose');

const Notes = mongoose.model('Notes', {
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
})
module.exports = Notes;