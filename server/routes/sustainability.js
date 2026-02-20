const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Calculate sustainability score
const calculateSustainabilityScore = (waterUsage, soilHealth, chemicalUsage) => {
  let score = 100;

  // Water usage scoring (ideal: 400-500mm per season)
  if (waterUsage < 300) score -= 5;
  else if (waterUsage > 600) score -= 15;

  // Soil health scoring
  if (soilHealth < 30) score -= 20;
  else if (soilHealth < 50) score -= 10;

  // Chemical usage scoring (lower is better)
  if (chemicalUsage > 100) score -= 25;
  else if (chemicalUsage > 50) score -= 15;

  return Math.max(score, 0);
};

// Get sustainability metrics
router.post('/calculate', authMiddleware, async (req, res) => {
  try {
    const { waterUsage, soilHealth, chemicalUsage, organicMatter, biodiversity } = req.body;

    const waterScore = Math.min((waterUsage / 500) * 100, 100);
    const soilScore = soilHealth || 65;
    const chemicalScore = Math.max(100 - (chemicalUsage / 100) * 100, 0);
    const bioScore = biodiversity || 70;

    const overallScore = calculateSustainabilityScore(waterUsage, soilHealth, chemicalUsage);
    const carbonFootprint = Math.max(100 - (waterUsage / 6 + chemicalUsage / 2 + (100 - soilHealth) / 2), 0);
    const ecoRating = overallScore > 80 ? 'Excellent' : overallScore > 60 ? 'Good' : overallScore > 40 ? 'Fair' : 'Poor';

    res.json({
      waterScore: waterScore.toFixed(1),
      soilScore: soilScore.toFixed(1),
      chemicalScore: chemicalScore.toFixed(1),
      biodiversityScore: bioScore.toFixed(1),
      overallSustainabilityScore: overallScore.toFixed(1),
      carbonFootprint: carbonFootprint.toFixed(1),
      ecoRating,
      recommendations: [
        waterScore < 60 ? 'Consider drip irrigation to reduce water usage' : '',
        soilScore < 50 ? 'Increase organic matter through composting' : '',
        chemicalScore < 50 ? 'Reduce chemical fertilizers, transition to organic' : '',
        bioScore < 60 ? 'Plant crop diversification patterns' : '',
      ].filter(Boolean),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sustainability data
router.get('/', authMiddleware, async (req, res) => {
  try {
    const mockData = {
      waterUsage: 420,
      soilHealth: 72,
      chemicalUsage: 35,
      organicMatter: 3.2,
      biodiversity: 78,
      carbonEmissions: 2.5,
    };

    res.json(mockData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
