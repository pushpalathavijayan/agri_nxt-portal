import React, { useState } from 'react';
import { Card, Button, Input, Select, Alert, Loader } from '../components/Common';
import { aiService } from '../services/apiService';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    season: '',
    soilPH: '',
    budget: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const seasons = [
    { label: 'Kharif (Monsoon)', value: 'kharif' },
    { label: 'Rabi (Winter)', value: 'rabi' },
    { label: 'Summer', value: 'summer' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await aiService.recommendCrop(formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get recommendation');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6">🌱 Crop Recommendation</h1>

      {error && <Alert message={error} type="error" onClose={() => setError('')} />}

      <Card className="mb-6">
        <h2 className="text-xl font-bold mb-4">Provide Farm Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Growing Season"
            name="season"
            value={formData.season}
            onChange={handleChange}
            options={seasons}
            required
          />
          <Input
            label="Soil pH (0-14)"
            type="number"
            step="0.1"
            name="soilPH"
            value={formData.soilPH}
            onChange={handleChange}
            min="0"
            max="14"
            required
          />
          <Input
            label="Budget (₹)"
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />

          <Button variant="primary" type="submit" className="w-full">
            Get Recommendation
          </Button>
        </form>
      </Card>

      {result && (
        <Card className="border-2 border-green-500">
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h2 className="text-2xl font-bold text-green-700 mb-2">🌾 {result.cropRecommended}</h2>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-600">Confidence Level</p>
                <p className="text-3xl font-bold text-green-600">{result.confidence}%</p>
              </div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-600 h-4 rounded-full transition-all"
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold mb-2">Why This Crop?</h3>
          <p className="text-gray-700 mb-4">{result.explanation}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Expected Yield</p>
              <p className="text-2xl font-bold text-blue-600">{result.expectedYield}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Est. Revenue</p>
              <p className="text-2xl font-bold text-green-600">{result.estimatedRevenue}</p>
            </div>
          </div>

          <Button
            variant="secondary"
            className="w-full mt-4"
            onClick={() => {
              setResult(null);
              setFormData({ season: '', soilPH: '', budget: '' });
            }}
          >
            Get Another Recommendation
          </Button>
        </Card>
      )}
    </div>
  );
};

export default CropRecommendation;
