import React, { useState, useEffect } from 'react';
import { panicService } from '../services/panic';
import { FiAlertTriangle, FiXCircle, FiCheckCircle, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

// History Page Component
const History = () => {
  const [panics, setPanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, cancelled, resolved

  // Fetch panic history
  const fetchPanicHistory = async () => {
    try {
      setLoading(true);
      const response = await panicService.getHistory();
      
      if (response.status === 'success') {
        setPanics(response.data.panics || []);
      } else {
        toast.error('Failed to load panic history');
      }
    } catch (error) {
      console.error('Fetch panic history error:', error);
      toast.error('Failed to load panic history');
    } finally {
      setLoading(false);
    }
  };

  // Cancel a panic
  const cancelPanic = async (panicId) => {
    try {
      const response = await panicService.cancel(panicId);
      
      if (response.status === 'success') {
        toast.success('Panic alert cancelled');
        // Refresh the list
        fetchPanicHistory();
      } else {
        toast.error(response.message || 'Failed to cancel panic');
      }
    } catch (error) {
      console.error('Cancel panic error:', error);
      toast.error('Failed to cancel panic');
    }
  };

  // Filter panics based on selection
  const filteredPanics = panics.filter(panic => {
    if (filter === 'all') return true;
    if (filter === 'active') return panic.status.id === 1;
    if (filter === 'cancelled') return panic.status.id === 2;
    if (filter === 'resolved') return panic.status.id === 3;
    return true;
  });

  // Load data on component mount
  useEffect(() => {
    fetchPanicHistory();
  }, []);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      1: { icon: <FiClock className="mr-1" />, class: 'bg-yellow-100 text-yellow-800' },
      2: { icon: <FiXCircle className="mr-1" />, class: 'bg-red-100 text-red-800' },
      3: { icon: <FiCheckCircle className="mr-1" />, class: 'bg-green-100 text-green-800' }
    };
    
    const config = statusConfig[status.id] || statusConfig[1];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        {config.icon}
        {status.name}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Alert History</h1>
        <p className="mt-1 text-sm text-gray-600">
          View and manage your emergency alerts
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-center">
          <span className="mr-3 text-sm font-medium text-gray-700">Filter by:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
          >
            <option value="all">All Alerts</option>
            <option value="active">Active</option>
            <option value="cancelled">Cancelled</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredPanics.length} of {panics.length} alerts
      </div>

      {/* Panics List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredPanics.length === 0 ? (
            <li className="px-4 py-5 sm:px-6">
              <div className="text-center text-gray-500">
                No alerts found
              </div>
            </li>
          ) : (
            filteredPanics.map((panic) => (
              <li key={panic.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FiAlertTriangle className="h-6 w-6 text-red-500" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium text-gray-900 mr-2">
                            {panic.panic_type || 'Emergency Alert'}
                          </h3>
                          <StatusBadge status={panic.status} />
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(panic.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {panic.latitude}, {panic.longitude}
                    </div>
                  </div>
                  
                  {panic.details && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">{panic.details}</p>
                    </div>
                  )}
                  
                  {panic.status.id === 1 && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => cancelPanic(panic.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Cancel Alert
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default History;