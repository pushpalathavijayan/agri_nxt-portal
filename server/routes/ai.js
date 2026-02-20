const express = require('express');
const Recommendation = require('../models/Recommendation');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Mock AI Logic for Crop Recommendation
const getRecommendedCrop = (season, soilPH, budget) => {
  const crops = {
    kharif: ['Rice', 'Maize', 'Soybean', 'Millet'],
    rabi: ['Wheat', 'Barley', 'Chickpea', 'Lentil'],
    summer: ['Tomato', 'Cucumber', 'Watermelon', 'Muskmelon'],
  };

  const selectedCrops = crops[season] || crops.kharif;
  
  let recommendation = selectedCrops[0];
  let confidence = 75;

  if (soilPH > 6 && soilPH < 7.5) {
    recommendation = selectedCrops[0];
    confidence = 85;
  } else if (soilPH > 5 && soilPH <= 6) {
    recommendation = selectedCrops[1];
    confidence = 80;
  } else {
    recommendation = selectedCrops[2];
    confidence = 70;
  }

  if (budget < 10000) {
    confidence = Math.max(confidence - 10, 50);
  }

  return {
    crop: recommendation,
    confidence,
    explanation: `Based on ${season} season, soil pH of ${soilPH}, and budget of ₹${budget}, ${recommendation} is recommended.`,
  };
};

// Crop Recommendation
router.post('/recommend', authMiddleware, async (req, res) => {
  try {
    const { season, soilPH, budget } = req.body;

    const recommendation = getRecommendedCrop(season, soilPH, budget);

    const rec = new Recommendation({
      userId: req.userId,
      cropRecommended: recommendation.crop,
      season,
      confidence: recommendation.confidence,
      explanation: recommendation.explanation,
      expectedYield: Math.random() * 5 + 3,
    });

    await rec.save();

    res.json({
      cropRecommended: recommendation.crop,
      confidence: recommendation.confidence,
      explanation: recommendation.explanation,
      expectedYield: `${(Math.random() * 5 + 3).toFixed(2)} tons/hectare`,
      estimatedRevenue: `₹${(Math.random() * 100000 + 50000).toFixed(0)}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mock AI Logic for Profit Calculation
const calculateProfit = (landSize, cropType, investmentCost) => {
  const cropYieldMap = {
    'Rice': { yield: 4.5, pricePerUnit: 2500 },
    'Wheat': { yield: 3.5, pricePerUnit: 2800 },
    'Maize': { yield: 5, pricePerUnit: 1800 },
    'Tomato': { yield: 40, pricePerUnit: 1000 },
    'Potato': { yield: 25, pricePerUnit: 1500 },
    'Cotton': { yield: 1.5, pricePerUnit: 5500 },
    'Sugarcane': { yield: 60, pricePerUnit: 300 },
    'Soybean': { yield: 2, pricePerUnit: 4200 },
  };

  const cropData = cropYieldMap[cropType] || { yield: 4, pricePerUnit: 2500 };
  
  const totalYield = landSize * cropData.yield;
  const revenue = totalYield * cropData.pricePerUnit;
  const profit = revenue - investmentCost;
  const profitMargin = ((profit / revenue) * 100).toFixed(2);
  
  const riskScore = Math.random() * 30 + 20;

  return {
    totalYield: totalYield.toFixed(2),
    revenue: revenue.toFixed(0),
    profit: profit.toFixed(0),
    profitMargin,
    riskScore: riskScore.toFixed(1),
  };
};

// Profit Simulation
router.post('/profit', authMiddleware, async (req, res) => {
  try {
    const { landSize, cropType, investmentCost } = req.body;

    const profitData = calculateProfit(landSize, cropType, investmentCost);

    res.json({
      expectedYield: `${profitData.totalYield} tons`,
      revenue: `₹${profitData.revenue}`,
      profit: `₹${profitData.profit}`,
      profitMargin: `${profitData.profitMargin}%`,
      riskScore: profitData.riskScore,
      riskLevel: profitData.riskScore < 30 ? 'Low' : profitData.riskScore < 50 ? 'Medium' : 'High',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
