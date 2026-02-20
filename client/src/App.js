import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FarmManagement from './pages/FarmManagement';
import CropRecommendation from './pages/CropRecommendation';
import ProfitSimulation from './pages/ProfitSimulation';
import GovernmentSchemes from './pages/GovernmentSchemes';
import Sustainability from './pages/Sustainability';
import VoiceAssistant from './pages/VoiceAssistant';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        <div className="flex-1">
          <Navbar user={user} onLogout={handleLogout} />
          <div className={isAuthenticated ? 'min-h-screen bg-gray-50' : ''}>
            <Routes>
              <Route path="/login" element={<Login setUser={setUser} setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/register" element={<Register setUser={setUser} setIsAuthenticated={setIsAuthenticated} />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/farms"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <FarmManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recommendation"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <CropRecommendation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profit"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ProfitSimulation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/schemes"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <GovernmentSchemes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sustainability"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Sustainability />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/voice"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <VoiceAssistant />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
