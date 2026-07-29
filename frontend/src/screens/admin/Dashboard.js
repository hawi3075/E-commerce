import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  DollarSign, ShoppingBag, Users, Package, 
  Clock, MapPin, AlertCircle 
} from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = useState({
    totalRevenue: 0,
    activeOrdersCount: 0,
    totalCustomersCount: 0,
    inventoryItemsCount: 0,
    recentOrders: [],
    recentProducts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');

    try {
      const rawUserInfo = localStorage.getItem('userInfo');
      const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : {};
      const token = userInfo.token || localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Fetch all three endpoints safely
      const [statsRes, ordersRes, productsRes] = await Promise.allSettled([
        axios.get('/api/admin/stats', config),
        axios.get('/api/admin/orders?limit=4', config),
        axios.get('/api/admin/products?limit=3', config)
      ]);

      // Extract raw data from settled promises
      const statsData = statsRes.status === 'fulfilled' ? statsRes.value.data : {};
      const ordersRaw = ordersRes.status === 'fulfilled' ? ordersRes.value.data : [];
      const productsRaw = productsRes.status === 'fulfilled' ? productsRes.value.data : [];

      // Unpack arrays safely regardless of backend return structure
      const ordersList = Array.isArray(ordersRaw) 
        ? ordersRaw 
        : (ordersRaw.orders || ordersRaw.data || []);

      const productsList = Array.isArray(productsRaw) 
        ? productsRaw 
        : (productsRaw.products || productsRaw.data || []);

      // If all three fail, display alert banner
      if (
        statsRes.status === 'rejected' && 
        ordersRes.status === 'rejected' && 
        productsRes.status === 'rejected'
      ) {
        const firstErr = statsRes.reason;
        setError(firstErr?.response?.data?.message || 'Failed to connect to backend endpoints.');
      }

      setData({
        totalRevenue: statsData.totalRevenue || 0,
        activeOrdersCount: statsData.activeOrdersCount || 0,
        totalCustomersCount: statsData.totalCustomersCount || 0,
        inventoryItemsCount: statsData.inventoryItemsCount || 0,
        recentOrders: ordersList,
        recentProducts: productsList
      });

      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.error('Error fetching dashboard metrics:', err);
      setError('Unexpected error loading dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 min-h-screen bg-slate-50/60 p-8 flex items-center justify-center">
        <p className="text-sm font-bold text-purple-600 animate-pulse">Loading Database Metrics...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 md:p-10 bg-slate-50/60 min-h-screen text-slate-700 font-sans">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Real-time performance metrics and store activity.
          </p>
        </div>

        {/* Live Status & Refresh Button */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button 
            onClick={fetchDashboardData}
            className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl hover:bg-slate-50 shadow-sm transition-colors"
          >
            Refresh Data
          </button>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200/80 shadow-sm">
            <Clock size={16} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-600">
              Last updated: {lastUpdated || 'Just now'}
            </span>
          </div>
        </div>
      </div>

      {/* Error Alert Banner */}
      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-700 text-xs font-bold">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <DollarSign size={22} />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            ${Number(data.totalRevenue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mt-2">
            TOTAL REVENUE
          </p>
        </div>

        {/* Active Orders */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <ShoppingBag size={22} />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {data.activeOrdersCount}
          </h2>
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mt-2">
            ACTIVE ORDERS
          </p>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
              <Users size={22} />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {data.totalCustomersCount}
          </h2>
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mt-2">
            TOTAL CUSTOMERS
          </p>
        </div>

        {/* Inventory Items */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <Package size={22} />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {data.inventoryItemsCount}
          </h2>
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mt-2">
            INVENTORY ITEMS
          </p>
        </div>

      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Recent Orders
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-medium">
              <thead>
                <tr className="border-b border-slate-100 text-xs text-slate-400 uppercase font-bold tracking-wider">
                  <th className="pb-4">ORDER ID</th>
                  <th className="pb-4">CUSTOMER</th>
                  <th className="pb-4">LOCATION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.recentOrders.length > 0 ? (
                  data.recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td className="py-4 font-extrabold text-slate-900">
                        #{order._id ? order._id.substring(order._id.length - 6).toUpperCase() : 'N/A'}
                      </td>
                      <td className="py-4 font-bold text-slate-800">
                        {order.user?.name || order.shippingAddress?.fullName || 'Customer'}
                      </td>
                      <td className="py-4 text-slate-600 flex items-center gap-1.5">
                        <MapPin size={14} className="text-slate-400 shrink-0" />
                        <span className="truncate max-w-[200px]">
                          {order.shippingAddress?.address || order.shippingAddress?.city || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-6 text-center text-slate-400 font-medium">
                      No orders recorded in the database yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Stream Section */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">
              Inventory Stream
            </h3>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
              LIVE
            </span>
          </div>

          <div className="space-y-4">
            {data.recentProducts.length > 0 ? (
              data.recentProducts.map((product) => (
                <div 
                  key={product._id}
                  className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <img 
                    src={product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/150'} 
                    alt={product.name} 
                    className="w-14 h-14 object-cover rounded-lg bg-white border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-extrabold text-slate-800">
                        ${Number(product.price || 0).toFixed(2)}
                      </span>
                      <span className={`text-xs font-bold ${(product.countInStock ?? product.stock ?? 0) > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {product.countInStock ?? product.stock ?? 0} in stock
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-slate-400 font-medium text-xs">
                No products found in database.
              </p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;