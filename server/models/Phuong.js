const mongoose = require('mongoose');

const PhuongSchema = new mongoose.Schema({
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
  quanId: {
    type: String,
    required: true,
  },
  hasAccount: {
    type: Boolean,
    default: false,
  },
});

const PhuongModel = mongoose.model('phuongs', PhuongSchema);
module.exports = PhuongModel;
