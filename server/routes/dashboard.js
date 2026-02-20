const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Mock dashboard data
router.get('/', authMiddleware, async (req, res) => {
  try {
    const dashboardData = {
      weather: {
        temperature: 28,
        humidity: 65,
        rainfall: 45,
        windSpeed: 12,
        condition: 'Partly Cloudy',
      },
      recommendedCrop: {
        crop: 'Rice',
        season: 'Kharif',
        confidence: 85,
      },
      profitPrediction: {
        expectedRevenue: 85000,
        expectedExpense: 35000,
        expectedProfit: 50000,
      },
      riskIndicator: {
        level: 'Medium',
        score: 45,
        factors: ['Weather variability', 'Market price fluctuation'],
      },
      soilHealth: {
        pH: 6.8,
        nitrogen: 45,
        phosphorus: 38,
        potassium: 42,
        rating: 'Good',
      },
      marketPrices: [
        { crop: 'Rice', price: 2500, trend: 'up' },
        { crop: 'Wheat', price: 2800, trend: 'stable' },
        { crop: 'Maize', price: 1800, trend: 'down' },
        { crop: 'Tomato', price: 1200, trend: 'up' },
      ],
      farmsCount: 2,
      totalArea: 5.5,
    };

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
