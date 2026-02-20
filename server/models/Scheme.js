const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  schemeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  minLandSize: {
    type: Number,
  },
  maxLandSize: {
    type: Number,
  },
  subsidy: {
    type: Number,
  },
  eligibleStates: [String],
  cropType: [String],
  requirements: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Scheme', schemeSchema);
