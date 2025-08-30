import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';


const PanicButton = ({ onClick }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-ping absolute inline-flex h-32 w-32 rounded-full bg-red-400 opacity-75"></div>
      </div>
      
      <button
        onClick={onClick}
        className="relative inline-flex items-center justify-center p-6 bg-red-600 border border-transparent rounded-full shadow-sm text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 transform hover:scale-105"
        style={{ width: '120px', height: '120px' }}
      >
        <FiAlertTriangle className="h-12 w-12" />
      </button>
      
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-900">EMERGENCY BUTTON</p>
        <p className="text-xs text-gray-500">Press only in case of emergency</p>
      </div>
    </div>
  );
};

export default PanicButton;