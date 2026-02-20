const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  farmName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  landSize: {
    type: Number,
    required: true,
  },
  soilPH: {
    type: Number,
    min: 0,
    max: 14,
  },
  nitrogen: {
    type: Number,
  },
  phosphorus: {
    type: Number,
  },
  potassium: {
    type: Number,
  },
  moisture: {
    type: Number,
  },
  cropHistory: [{
    cropName: String,
    season: String,
    yield: Number,
    date: Date,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Farm', farmSchema);
