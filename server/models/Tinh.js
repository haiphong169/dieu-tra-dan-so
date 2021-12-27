const mongoose = require('mongoose');

const TinhSchema = new mongoose.Schema({
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
  hasAccount: {
    type: Boolean,
    default: false,
  },
});

const TinhModel = mongoose.model('tinhs', TinhSchema);
module.exports = TinhModel;
