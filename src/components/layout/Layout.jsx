import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiHome, FiLogOut } from 'react-icons/fi'; 
import { FaHistory } from "react-icons/fa";

// Layout component with navigation
const Layout = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();

  // Navigation items
  const navItems = [
    { path: '/', name: 'Dashboard', icon: <FiHome className="mr-2" /> },
    { path: '/history', name: 'History', icon: <FaHistory className="mr-2" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen batman-theme">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-gray-900 font-bold">B</span>
            </div>
            <h1 className="text-xl font-bold">Batman Panic Button</h1>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center text-sm bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded transition duration-300"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center py-3 px-4 text-sm font-medium transition duration-300 ${
                    location.pathname === item.path
                      ? 'bg-gray-900 text-yellow-400'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 text-center text-sm">
        <p>Batman Panic Button System • For Commissioner Gordon's use only</p>
      </footer>
    </div>
  );
};

export default Layout;