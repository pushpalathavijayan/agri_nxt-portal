import React, { useState, useEffect } from 'react';
import { Card, Button, Loader, Alert } from '../components/Common';
import { dashboardService } from '../services/apiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardService.getDashboard();
      setDashboardData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  const chartData = dashboardData?.marketPrices || [];

  return (
    <div className="p-6 space-y-6">
      {error && <Alert message={error} type="error" />}

      <h1 className="text-3xl font-bold text-green-700 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Temperature</p>
            <p className="text-3xl font-bold text-green-600">{dashboardData?.weather?.temperature}°C</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Humidity</p>
            <p className="text-3xl font-bold text-blue-600">{dashboardData?.weather?.humidity}%</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Rainfall</p>
            <p className="text-3xl font-bold text-blue-700">{dashboardData?.weather?.rainfall}mm</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Wind Speed</p>
            <p className="text-3xl font-bold text-gray-600">{dashboardData?.weather?.windSpeed} km/h</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold text-green-700 mb-4">🌱 Recommended Crop</h2>
          <p className="text-2xl font-bold text-green-600 mb-2">{dashboardData?.recommendedCrop?.crop}</p>
          <p className="text-sm text-gray-600 mb-2">Season: {dashboardData?.recommendedCrop?.season}</p>
          <p className="text-sm text-gray-600">Confidence: {dashboardData?.recommendedCrop?.confidence}%</p>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-green-700 mb-4">💰 Profit Prediction</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Expected Revenue: <span className="font-bold text-green-600">₹{dashboardData?.profitPrediction?.expectedRevenue}</span></p>
            <p className="text-sm text-gray-600">Expected Expense: <span className="font-bold text-red-600">₹{dashboardData?.profitPrediction?.expectedExpense}</span></p>
            <p className="text-lg text-gray-600">Expected Profit: <span className="font-bold text-green-700">₹{dashboardData?.profitPrediction?.expectedProfit}</span></p>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-green-700 mb-4">⚠️ Risk Indicator</h2>
          <p className="text-2xl font-bold text-orange-600 mb-2">{dashboardData?.riskIndicator?.level}</p>
          <p className="text-sm text-gray-600 mb-2">Risk Score: {dashboardData?.riskIndicator?.score}</p>
          <ul className="text-xs text-gray-600 list-disc list-inside">
            {dashboardData?.riskIndicator?.factors?.map((factor, idx) => (
              <li key={idx}>{factor}</li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-green-700 mb-4">🧪 Soil Health</h2>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">pH: <span className="font-bold text-green-600">{dashboardData?.soilHealth?.pH}</span></p>
            <p className="text-gray-600">Nitrogen: <span className="font-bold">{dashboardData?.soilHealth?.nitrogen}%</span></p>
            <p className="text-gray-600">Phosphorus: <span className="font-bold">{dashboardData?.soilHealth?.phosphorus}%</span></p>
            <p className="text-gray-600">Potassium: <span className="font-bold">{dashboardData?.soilHealth?.potassium}%</span></p>
            <p className="text-gray-600 mt-2">Rating: <span className="font-bold text-green-600">{dashboardData?.soilHealth?.rating}</span></p>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-bold text-green-700 mb-4">📈 Market Prices</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crop" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <p className="text-gray-600 text-sm">Total Farms</p>
          <p className="text-3xl font-bold text-green-600">{dashboardData?.farmsCount}</p>
        </Card>
        <Card>
          <p className="text-gray-600 text-sm">Total Area</p>
          <p className="text-3xl font-bold text-green-600">{dashboardData?.totalArea} hectares</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
