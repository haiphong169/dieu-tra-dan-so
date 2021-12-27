const mongoose = require('mongoose');

const ThonSchema = new mongoose.Schema({
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
  phuongId: {
    type: String,
    required: true,
  },
  hasAccount: {
    type: Boolean,
    default: false,
  },
});

const ThonModel = mongoose.model('thons', ThonSchema);
module.exports = ThonModel;
