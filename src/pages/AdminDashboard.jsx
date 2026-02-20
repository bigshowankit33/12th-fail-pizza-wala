import { useState, useEffect } from 'react';
import { Search, Clock, CheckCircle, Truck, ChefHat, XCircle, RefreshCw, ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/orders/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(orderId);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedOrder = await response.json();
      
      // Update the order in the local state
      setOrders(orders.map(order => 
        order._id === orderId ? updatedOrder.order : order
      ));
      
      setOpenDropdown(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'Preparing': { color: 'bg-blue-100 text-blue-800', icon: ChefHat },
      'Out for Delivery': { color: 'bg-purple-100 text-purple-800', icon: Truck },
      'Delivered': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'Cancelled': { color: 'bg-red-100 text-red-800', icon: XCircle },
    };
    
    const config = statusConfig[status] || statusConfig['Pending'];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon size={12} />
        {status}
      </span>
    );
  };

  const getStatusOptions = (currentStatus) => {
    const allStatuses = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
    return allStatuses.filter(status => status !== currentStatus);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const filteredOrders = orders.filter(order =>
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order._id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-heading font-bold text-gray-900">
                12th Fail Pizza Wala - Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">Manage and track all orders</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
              <button
                onClick={fetchOrders}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-red text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <RefreshCw size={18} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <ChefHat className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{pendingOrders}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by customer name or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <XCircle className="text-red-500 flex-shrink-0" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-gray-500">
                          #{order._id?.slice(-8).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">
                          {order.customerDetails?.name || order.customerName || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          {order.items?.map((item, index) => (
                            <span key={index} className="text-sm text-gray-600">
                              {item.quantity}x {item.name}
                              {index < order.items.length - 1 && ', '}
                            </span>
                          )) || 'No items'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-gray-900">
                          ₹{order.totalPrice?.toLocaleString() || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <button
                            onClick={() => setOpenDropdown(openDropdown === order._id ? null : order._id)}
                            disabled={updatingStatus === order._id}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                          >
                            {updatingStatus === order._id ? (
                              <span className="flex items-center gap-1">
                                <RefreshCw size={12} className="animate-spin" />
                                Updating...
                              </span>
                            ) : (
                              <>
                                {getStatusBadge(order.status)}
                                <ChevronDown size={14} />
                              </>
                            )}
                          </button>
                          
                          {/* Dropdown Menu */}
                          {openDropdown === order._id && (
                            <div className="absolute z-10 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                              {getStatusOptions(order.status).map((option) => (
                                <button
                                  key={option}
                                  onClick={() => updateOrderStatus(order._id, option)}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <Search className="text-gray-300 mb-3" size={48} />
                        <p className="text-gray-500 font-medium">No orders found</p>
                        <p className="text-gray-400 text-sm mt-1">
                          {searchTerm ? 'Try a different search term' : 'Orders will appear here'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-4 text-center text-sm text-gray-500">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
