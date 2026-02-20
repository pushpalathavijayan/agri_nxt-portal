import React, { useState } from 'react';
import { Card, Button, Input, Select, Alert, Loader } from '../components/Common';
import { aiService } from '../services/apiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ProfitSimulation = () => {
  const [formData, setFormData] = useState({
    landSize: '',
    cropType: '',
    investmentCost: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const crops = [
    { label: 'Rice', value: 'Rice' },
    { label: 'Wheat', value: 'Wheat' },
    { label: 'Maize', value: 'Maize' },
    { label: 'Tomato', value: 'Tomato' },
    { label: 'Potato', value: 'Potato' },
    { label: 'Cotton', value: 'Cotton' },
    { label: 'Sugarcane', value: 'Sugarcane' },
    { label: 'Soybean', value: 'Soybean' },
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
      const response = await aiService.calculateProfit(formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to calculate profit');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !result) return <Loader />;

  const chartData = result ? [
    { name: 'Investment', value: parseInt(formData.investmentCost) },
    { name: 'Profit', value: parseInt(result.profit.replace('₹', '').replace(/,/g, '')) },
  ] : [];

  const COLORS = ['#ef4444', '#16a34a'];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6">💰 Profit Simulation</h1>

      {error && <Alert message={error} type="error" onClose={() => setError('')} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">Simulation Inputs</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Land Size (hectares)"
              type="number"
              step="0.1"
              name="landSize"
              value={formData.landSize}
              onChange={handleChange}
              required
            />
            <Select
              label="Crop Type"
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              options={crops}
              required
            />
            <Input
              label="Investment Cost (₹)"
              type="number"
              name="investmentCost"
              value={formData.investmentCost}
              onChange={handleChange}
              required
            />

            <Button variant="primary" type="submit" className="w-full">
              Simulate Profit
            </Button>
          </form>
        </Card>

        {result && (
          <Card className="border-2 border-green-500">
            <h2 className="text-xl font-bold mb-4">📊 Results</h2>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-gray-600">Expected Yield</p>
                <p className="text-2xl font-bold text-blue-600">{result.expectedYield}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-purple-600">{result.revenue}</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-gray-600">Profit</p>
                <p className="text-2xl font-bold text-green-600">{result.profit}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded">
                <p className="text-sm text-gray-600">Profit Margin</p>
                <p className="text-2xl font-bold text-orange-600">{result.profitMargin}</p>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <p className="text-sm text-gray-600">Risk Level: {result.riskLevel}</p>
                <p className="text-2xl font-bold text-red-600">{result.riskScore}/100</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {result && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-lg font-bold mb-4">Investment vs Profit</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value}`} />
                <Bar dataKey="value" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h2 className="text-lg font-bold mb-4">Financial Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ₹${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfitSimulation;
