import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { label: 'Dashboard', icon: '📊', path: '/' },
    { label: 'Farm Management', icon: '🚜', path: '/farms' },
    { label: 'Crop Recommendation', icon: '🌱', path: '/recommendation' },
    { label: 'Profit Simulation', icon: '💰', path: '/profit' },
    { label: 'Government Schemes', icon: '🏛️', path: '/schemes' },
    { label: 'Sustainability', icon: '♻️', path: '/sustainability' },
    { label: 'Voice Assistant', icon: '🎤', path: '/voice' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-green-800 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">🌾 AgRO NXT</h1>
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-3 rounded-lg mb-2 transition ${
              isActive(item.path)
                ? 'bg-green-600 text-white'
                : 'hover:bg-green-700 text-gray-100'
            }`}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
