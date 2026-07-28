import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  DollarSign, ShoppingBag, Users, Package, 
  TrendingUp, Clock, MapPin 
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
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Calling real backend endpoints simultaneously
      const [statsRes, ordersRes, productsRes] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/admin/orders?limit=4'),
        axios.get('/api/admin/products?limit=3')
      ]);

      setData({
        totalRevenue: statsRes.data.totalRevenue || 0,
        activeOrdersCount: statsRes.data.activeOrdersCount || statsRes.data.activeOrders || 0,
        totalCustomersCount: statsRes.data.totalCustomersCount || statsRes.data.newUsers || 0,
        inventoryItemsCount: statsRes.data.inventoryItemsCount || 0,
        recentOrders: ordersRes.data || [],
        recentProducts: productsRes.data || []
      });

      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (error) {
      console.error('Error fetching real dashboard data:', error);
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
        <p className="text-sm font-bold text-purple-600 animate-pulse">Loading Live Data...</p>
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

        {/* Live Status Badge */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200/80 shadow-sm self-start md:self-auto">
          <Clock size={16} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-600">
            Last updated: {lastUpdated || 'Just now'}
          </span>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-2xl border border-purple-500/30 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <DollarSign size={22} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <TrendingUp size={12} /> +0%
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            ${Number(data.totalRevenue).toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <TrendingUp size={12} /> +4.2%
            </span>
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
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <TrendingUp size={12} /> +8.1%
            </span>
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

      {/* Main Content Layout (Recent Orders + Inventory Stream) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders Section */}
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
                    <tr key={order._id || order.id}>
                      <td className="py-4 font-extrabold text-slate-900">
                        #{order._id ? order._id.substring(order._id.length - 6).toUpperCase() : order.id}
                      </td>
                      <td className="py-4 font-bold text-slate-800">
                        {order.user?.name || order.customer || 'Customer'}
                      </td>
                      <td className="py-4 text-slate-600 flex items-center gap-1.5">
                        <MapPin size={14} className="text-slate-400" />
                        <span>{order.shippingAddress?.address || order.location || 'N/A'}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-6 text-center text-slate-400 font-medium">
                      No recent orders available.
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
            <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
              LIVE
            </span>
          </div>

          <div className="space-y-4">
            {data.recentProducts.length > 0 ? (
              data.recentProducts.map((product) => (
                <div 
                  key={product._id || product.id}
                  className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <img 
                    src={product.image || product.images?.[0] || '/logo.webp'} 
                    alt={product.name} 
                    className="w-14 h-14 object-cover rounded-lg bg-white border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-extrabold text-slate-800">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-rose-500">
                        {product.countInStock ?? product.stock ?? 0} in stock
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-slate-400 font-medium text-xs">
                No inventory data available.
              </p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;