const express = require('express');
const Scheme = require('../models/Scheme');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Sample schemes data
const sampleSchemes = [
  {
    schemeName: 'PM KISAN',
    description: 'Pradhan Mantri Kisan Samman Nidhi - Direct income support to farmers',
    minLandSize: 0,
    maxLandSize: 2,
    subsidy: 6000,
    eligibleStates: ['All States'],
    cropType: ['All Crops'],
    requirements: ['Own farm', 'Aadhaar', 'Bank Account'],
  },
  {
    schemeName: 'Soil Health Card Scheme',
    description: 'Free soil testing and nutrient management',
    minLandSize: 0,
    maxLandSize: 10,
    subsidy: 0,
    eligibleStates: ['All States'],
    cropType: ['All Crops'],
    requirements: ['Farm verification', 'Soil sample'],
  },
  {
    schemeName: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance for all registered farmers',
    minLandSize: 0,
    maxLandSize: 5,
    subsidy: 50,
    eligibleStates: ['All States'],
    cropType: ['Rice', 'Wheat', 'Cotton', 'Sugarcane'],
    requirements: ['Farm details', 'Crop selection', 'Premium payment'],
  },
  {
    schemeName: 'Krishi Sinchayee Yojana',
    description: 'Per drop more crop - Irrigation efficiency scheme',
    minLandSize: 0.5,
    maxLandSize: 5,
    subsidy: 80,
    eligibleStates: ['Maharashtra', 'Gujarat', 'Rajasthan', 'Karnataka'],
    cropType: ['All Crops'],
    requirements: ['Irrigation plan', 'Land survey', 'Technical approval'],
  },
  {
    schemeName: 'National Mission on Organic Farming',
    description: 'Support for organic farming practices',
    minLandSize: 0.5,
    maxLandSize: 10,
    subsidy: 60,
    eligibleStates: ['All States'],
    cropType: ['All Crops'],
    requirements: ['Organic certification plan', '3 year transition'],
  },
];

// Get all schemes (public)
router.get('/', async (req, res) => {
  try {
    let schemes = await Scheme.find();
    
    if (schemes.length === 0) {
      await Scheme.insertMany(sampleSchemes);
      schemes = await Scheme.find();
    }

    res.json(schemes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get schemes by state (public)
router.get('/state/:state', async (req, res) => {
  try {
    const schemes = await Scheme.find({
      eligibleStates: { $in: [req.params.state, 'All States'] },
    });
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check eligibility (public)
router.post('/check-eligibility', async (req, res) => {
  try {
    const { landSize, state, cropType } = req.body;
    
    const eligibleSchemes = await Scheme.find({
      minLandSize: { $lte: landSize },
      maxLandSize: { $gte: landSize },
      eligibleStates: { $in: [state, 'All States'] },
      cropType: { $in: [cropType, 'All Crops'] },
    });

    res.json({
      landSize,
      state,
      cropType,
      eligibleCount: eligibleSchemes.length,
      schemes: eligibleSchemes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
