import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Select, Alert, Loader } from '../components/Common';
import { farmService } from '../services/apiService';

const FarmManagement = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    landSize: '',
    soilPH: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    moisture: '',
  });

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    setLoading(true);
    try {
      const response = await farmService.getFarms();
      setFarms(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch farms');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await farmService.updateFarm(editingId, formData);
        setError('');
        setEditingId(null);
      } else {
        await farmService.createFarm(formData);
        setError('');
      }

      setFormData({
        farmName: '', location: '', landSize: '', soilPH: '',
        nitrogen: '', phosphorus: '', potassium: '', moisture: '',
      });
      setShowForm(false);
      fetchFarms();
    } catch (err) {
      setError(err.response?.data?.error || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (farm) => {
    setFormData(farm);
    setEditingId(farm._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await farmService.deleteFarm(id);
        fetchFarms();
      } catch (err) {
        setError(err.response?.data?.error || 'Delete failed');
      }
    }
  };

  if (loading && !showForm) return <Loader />;

  return (
    <div className="p-6">
      {error && <Alert message={error} type="error" onClose={() => setError('')} />}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">🚜 Farm Management</h1>
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              farmName: '', location: '', landSize: '', soilPH: '',
              nitrogen: '', phosphorus: '', potassium: '', moisture: '',
            });
          }}
          variant="primary"
        >
          {showForm ? 'Cancel' : '+ Add Farm'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Farm' : 'Add New Farm'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Farm Name"
              name="farmName"
              value={formData.farmName}
              onChange={handleChange}
              required
            />
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <Input
              label="Land Size (hectares)"
              type="number"
              name="landSize"
              value={formData.landSize}
              onChange={handleChange}
              required
            />
            <Input
              label="Soil pH"
              type="number"
              step="0.1"
              name="soilPH"
              value={formData.soilPH}
              onChange={handleChange}
              min="0"
              max="14"
            />
            <Input
              label="Nitrogen (%)"
              type="number"
              step="0.1"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
            />
            <Input
              label="Phosphorus (%)"
              type="number"
              step="0.1"
              name="phosphorus"
              value={formData.phosphorus}
              onChange={handleChange}
            />
            <Input
              label="Potassium (%)"
              type="number"
              step="0.1"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
            />
            <Input
              label="Moisture (%)"
              type="number"
              step="0.1"
              name="moisture"
              value={formData.moisture}
              onChange={handleChange}
            />
            <div className="md:col-span-2">
              <Button variant="primary" type="submit" className="w-full">
                {editingId ? 'Update Farm' : 'Create Farm'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {farms.map(farm => (
          <Card key={farm._id}>
            <h3 className="text-xl font-bold text-green-700 mb-2">{farm.farmName}</h3>
            <div className="space-y-1 text-sm mb-4">
              <p className="text-gray-600">📍 <strong>{farm.location}</strong></p>
              <p className="text-gray-600">📏 Land Size: <strong>{farm.landSize} hectares</strong></p>
              <p className="text-gray-600">🧪 pH: <strong>{farm.soilPH}</strong></p>
              <p className="text-gray-600">🌿 N-P-K: <strong>{farm.nitrogen}-{farm.phosphorus}-{farm.potassium}</strong></p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleEdit(farm)}
                variant="secondary"
                className="flex-1 text-sm"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(farm._id)}
                variant="danger"
                className="flex-1 text-sm"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {farms.length === 0 && !showForm && (
        <Card className="text-center py-8">
          <p className="text-gray-600">No farms added yet. Click "Add Farm" to create one.</p>
        </Card>
      )}
    </div>
  );
};

export default FarmManagement;
