import React, { useState, useEffect } from 'react';
import { Card, Button, Select, Alert, Loader } from '../components/Common';
import { schemeService } from '../services/apiService';

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [filteredSchemes, setFilteredSchemes] = useState([]);

  const states = [
    'All States', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal',
  ];

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const response = await schemeService.getSchemes();
      setSchemes(response.data);
      setFilteredSchemes(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch schemes');
    } finally {
      setLoading(false);
    }
  };

  const handleStateFilter = (state) => {
    setSelectedState(state);
    if (state === '' || state === 'All States') {
      setFilteredSchemes(schemes);
    } else {
      const filtered = schemes.filter(scheme =>
        scheme.eligibleStates.includes(state) || scheme.eligibleStates.includes('All States')
      );
      setFilteredSchemes(filtered);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">🏛️ Government Schemes</h1>

      {error && <Alert message={error} type="error" onClose={() => setError('')} />}

      <Card className="mb-6">
        <h2 className="text-lg font-bold mb-4">Filter by State</h2>
        <select
          value={selectedState}
          onChange={(e) => handleStateFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All States</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </Card>

      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchemes.map(scheme => (
            <Card key={scheme._id} className="border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-green-700 mb-2">{scheme.schemeName}</h3>
              <p className="text-gray-700 mb-3">{scheme.description}</p>

              <div className="space-y-2 mb-4 text-sm">
                {scheme.minLandSize !== undefined && (
                  <p className="text-gray-600">
                    📏 Land Size: {scheme.minLandSize} - {scheme.maxLandSize} hectares
                  </p>
                )}
                {scheme.subsidy > 0 && (
                  <p className="text-gray-600">💰 Subsidy: {scheme.subsidy}%</p>
                )}
                <p className="text-gray-600">
                  🌱 Crops: {scheme.cropType.join(', ')}
                </p>
                <p className="text-gray-600">
                  📍 States: {scheme.eligibleStates.join(', ')}
                </p>
              </div>

              {scheme.requirements && scheme.requirements.length > 0 && (
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <p className="font-semibold text-sm mb-2">Requirements:</p>
                  <ul className="text-xs text-gray-700 list-disc list-inside">
                    {scheme.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Button variant="primary" className="w-full text-sm">
                Learn More
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-8">
          <p className="text-gray-600">No schemes found for the selected filter.</p>
        </Card>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-gray-600 text-sm">Total Schemes</p>
          <p className="text-3xl font-bold text-green-600">{schemes.length}</p>
        </Card>
        <Card>
          <p className="text-gray-600 text-sm">Matching Schemes</p>
          <p className="text-3xl font-bold text-blue-600">{filteredSchemes.length}</p>
        </Card>
        <Card>
          <p className="text-gray-600 text-sm">Avg Subsidy</p>
          <p className="text-3xl font-bold text-purple-600">
            {filteredSchemes.length > 0
              ? (filteredSchemes.reduce((acc, s) => acc + s.subsidy, 0) / filteredSchemes.length).toFixed(0)
              : 0}%
          </p>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentSchemes;
