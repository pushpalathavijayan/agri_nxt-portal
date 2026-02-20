import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/apiService';
import { Button, Input, Alert, Loader, Select } from '../components/Common';

const Register = ({ setUser, setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    state: '',
    district: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.register(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md max-h-screen overflow-y-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-2">🌾 AgRO NXT</h1>
          <p className="text-gray-600">Create Your Farmer Account</p>
        </div>

        {error && <Alert message={error} type="error" />}

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            name="fullName"
            placeholder="Raj Kumar"
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            placeholder="farmer@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            placeholder="••••••••"
            required
          />
          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            name="phone"
            placeholder="9876543210"
          />
          <Select
            label="State"
            value={formData.state}
            onChange={handleChange}
            name="state"
            options={states.map(s => ({ label: s, value: s }))}
          />
          <Input
            label="District"
            value={formData.district}
            onChange={handleChange}
            name="district"
            placeholder="District Name"
          />

          <Button variant="primary" type="submit" className="w-full mb-4">
            Register
          </Button>
        </form>

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
