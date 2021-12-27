const mongoose = require('mongoose');

const QuanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  population: {
    type: Number,
    default: 0,
  },
  tinhId: {
    type: String,
    required: true,
  },
  hasAccount: {
    type: Boolean,
    default: false,
  },
});

const QuanModel = mongoose.model('quans', QuanSchema);
module.exports = QuanModel;
