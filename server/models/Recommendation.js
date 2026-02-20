const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cropRecommended: {
    type: String,
    required: true,
  },
  season: {
    type: String,
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
  },
  explanation: {
    type: String,
  },
  expectedYield: {
    type: Number,
  },
  estimatedRevenue: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
