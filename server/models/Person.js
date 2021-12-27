const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  locationId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  cccd: {
    type: String,
    default: 'N/A',
  },
  hometown: {
    type: String,
    required: true,
  },
  dctht: {
    type: String,
    required: true,
  },
  dctt: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    default: 'Không',
  },
  education: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
});

const PersonModel = mongoose.model('person', PersonSchema);
module.exports = PersonModel;
