import React, { useState } from 'react';
import { panicService } from '../../services/panic';
import { FiX, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Panic Form Component (Modal)
const PanicForm = ({ location, onClose }) => {
  const [formData, setFormData] = useState({
    panic_type: '',
    details: '',
    latitude: location?.latitude || '',
    longitude: location?.longitude || ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.latitude || !formData.longitude) {
      newErrors.location = 'Location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const response = await panicService.send(formData);
      
      if (response.status === 'success') {
        toast.success('Emergency alert sent successfully! Batman has been notified.');
        onClose();
      } else {
        toast.error(response.message || 'Failed to send alert. Please try again.');
      }
    } catch (error) {
      console.error('Send panic error:', error);
      toast.error('Failed to send alert. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Send Emergency Alert</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition duration-300"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Location Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <div className="mt-1 bg-gray-50 p-3 rounded-md text-sm">
              {formData.latitude && formData.longitude ? (
                <p>Lat: {formData.latitude}, Long: {formData.longitude}</p>
              ) : (
                <p className="text-red-600">Location not available</p>
              )}
            </div>
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>
          
          {/* Panic Type */}
          <div>
            <label htmlFor="panic_type" className="block text-sm font-medium text-gray-700">
              Emergency Type (optional)
            </label>
            <select
              id="panic_type"
              name="panic_type"
              value={formData.panic_type}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
            >
              <option value="">Select emergency type</option>
              <option value="Robbery">Robbery</option>
              <option value="Assault">Assault</option>
              <option value="Hostage">Hostage Situation</option>
              <option value="Villain Sighting">Villain Sighting</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          {/* Details */}
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">
              Emergency Details
            </label>
            <textarea
              id="details"
              name="details"
              rows={4}
              value={formData.details}
              onChange={handleChange}
              placeholder="Describe the emergency situation..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
          
          {/* Warning */}
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  This will send an immediate alert to Batman. Only use for genuine emergencies.
                </p>
              </div>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-batman-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-batman bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Sending...' : 'Send Emergency Alert'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PanicForm;