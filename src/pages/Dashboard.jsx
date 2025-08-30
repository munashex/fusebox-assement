import React, { useState } from 'react';
import PanicButton from '../components/panic/PanicButton';
import PanicForm from '../components/panic/PanicForm';
import {  FiMapPin, FiInfo } from 'react-icons/fi';

// Dashboard Page Component
const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Get current location
  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return null;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          };
          setCurrentLocation(location);
          setLocationError(null);
          resolve(location);
        },
        (error) => {
          const errorMessage =
            error.code === error.PERMISSION_DENIED
              ? 'Location access denied. Please enable location services to send precise alerts.'
              : 'Unable to retrieve your location.';
          setLocationError(errorMessage);
          resolve(null);
        },
        { timeout: 10000 }
      );
    });
  };

  // Handle panic button click
  const handlePanicClick = async () => {
    const location = await getLocation();
    if (location) {
      setShowForm(true);
    }
  };

  // Handle form close
  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Emergency Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Send an emergency alert to Batman when needed
        </p>
      </div>

      {/* Location Status */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <FiMapPin className="h-6 w-6 text-gray-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-800">Location Services</h3>
            {currentLocation ? (
              <p className="mt-1 text-sm text-gray-600">
                Location available: {currentLocation.latitude}, {currentLocation.longitude}
              </p>
            ) : locationError ? (
              <p className="mt-1 text-sm text-red-600">{locationError}</p>
            ) : (
              <p className="mt-1 text-sm text-gray-600">
                Location will be retrieved when sending an alert
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Information Card */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiInfo className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Important:</strong> Only use this system for genuine emergencies. 
              Batman will respond to legitimate alerts. False alerts may have consequences.
            </p>
          </div>
        </div>
      </div>

      {/* Panic Button */}
      <div className="text-center py-8">
        <PanicButton onClick={handlePanicClick} />
      </div>

      {/* Panic Form Modal */}
      {showForm && (
        <PanicForm 
          location={currentLocation} 
          onClose={handleFormClose} 
        />
      )}

      {/* Quick Instructions */}
      <div className="bg-gray-50 rounded-lg p-4 mt-8">
        <h3 className="font-medium text-gray-900 mb-2">How to use:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
          <li>Click the emergency button when you need assistance</li>
          <li>Allow location access when prompted</li>
          <li>Provide details about the emergency situation</li>
          <li>Submit the alert to notify Batman</li>
          <li>Wait for assistance to arrive</li>
        </ol>
      </div>
    </div>
  );
};

export default Dashboard;