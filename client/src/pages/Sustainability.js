import React, { useState } from 'react';
import { Card, Button, Input, Alert, Loader } from '../components/Common';
import { sustainabilityService } from '../services/apiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const Sustainability = () => {
  const [formData, setFormData] = useState({
    waterUsage: '420',
    soilHealth: '72',
    chemicalUsage: '35',
    organicMatter: '3.2',
    biodiversity: '78',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await sustainabilityService.calculate(formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to calculate sustainability');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !result) return <Loader />;

  const chartData = result ? [
    { name: 'Water', score: parseFloat(result.waterScore) },
    { name: 'Soil', score: parseFloat(result.soilScore) },
    { name: 'Chemical', score: parseFloat(result.chemicalScore) },
    { name: 'Biodiversity', score: parseFloat(result.biodiversityScore) },
  ] : [];

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-yellow-600';
      case 'Poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">♻️ Sustainability Scoring</h1>

      {error && <Alert message={error} type="error" onClose={() => setError('')} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">Input Farm Data</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Water Usage (mm/season)"
              type="number"
              step="10"
              name="waterUsage"
              value={formData.waterUsage}
              onChange={handleChange}
            />
            <Input
              label="Soil Health Score (0-100)"
              type="number"
              name="soilHealth"
              value={formData.soilHealth}
              onChange={handleChange}
              min="0"
              max="100"
            />
            <Input
              label="Chemical Usage (kg/hectare)"
              type="number"
              step="5"
              name="chemicalUsage"
              value={formData.chemicalUsage}
              onChange={handleChange}
            />
            <Input
              label="Organic Matter (%)"
              type="number"
              step="0.1"
              name="organicMatter"
              value={formData.organicMatter}
              onChange={handleChange}
            />
            <Input
              label="Biodiversity Score (0-100)"
              type="number"
              name="biodiversity"
              value={formData.biodiversity}
              onChange={handleChange}
              min="0"
              max="100"
            />

            <Button variant="primary" type="submit" className="w-full">
              Calculate Sustainability
            </Button>
          </form>
        </Card>

        {result && (
          <Card className="border-2 border-green-500">
            <h2 className="text-xl font-bold mb-4">🌍 Sustainability Report</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Overall Score</p>
                <p className={`text-4xl font-bold ${getRatingColor(result.ecoRating)}`}>
                  {result.overallSustainabilityScore}/100
                </p>
                <p className={`text-lg font-semibold mt-2 ${getRatingColor(result.ecoRating)}`}>
                  {result.ecoRating}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Carbon Footprint Score</p>
                <p className="text-2xl font-bold text-blue-600">{result.carbonFootprint}/100</p>
                <p className="text-xs text-gray-600 mt-1">Lower is better</p>
              </div>

              {result.recommendations && result.recommendations.length > 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="font-semibold text-sm mb-2">💡 Recommendations:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx}>✓ {rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-lg font-bold mb-4">Component Scores</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h2 className="text-lg font-bold mb-4">Individual Metrics</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span className="font-semibold text-sm">Water Score</span>
                <span className="text-lg font-bold text-blue-600">{result.waterScore}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="font-semibold text-sm">Soil Score</span>
                <span className="text-lg font-bold text-green-600">{result.soilScore}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <span className="font-semibold text-sm">Chemical Score</span>
                <span className="text-lg font-bold text-purple-600">{result.chemicalScore}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                <span className="font-semibold text-sm">Biodiversity Score</span>
                <span className="text-lg font-bold text-yellow-600">{result.biodiversityScore}</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Sustainability;
