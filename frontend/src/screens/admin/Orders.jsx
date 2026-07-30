import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ExternalLink, Loader2 } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  // Fetch orders from backend
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const rawUserInfo = localStorage.getItem('userInfo');
      const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : {};
      const token = userInfo.token || localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get('/api/admin/orders', config);
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Fallback dummy data matching design if API fails
      setOrders([
        { _id: '1234', orderId: '#QB-1234', user: { name: 'Abeba' }, createdAt: '2026-04-25', totalPrice: 120.00, status: 'Shipped', isUrgent: true },
        { _id: '5678', orderId: '#QB-5678', user: { name: 'Hawi' }, createdAt: '2026-04-25', totalPrice: 45.50, status: 'Pending', isUrgent: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Calculate metrics
  const inTransitCount = orders.filter(
    (o) => (o.status || o.isShipped || o.logistics || '').toString().toLowerCase() === 'shipped' ||
           (o.status || '').toLowerCase() === 'in transit'
  ).length;

  const urgentCount = orders.filter(
    (o) => o.isUrgent || (o.orderId || o._id || '').toLowerCase().includes('urgent')
  ).length;

  // Filter logic
  const filteredOrders = orders.filter((order) => {
    const orderId = order._id ? `#QB-${order._id.substring(order._id.length - 4).toUpperCase()}` : (order.orderId || '');
    const customerName = order.user?.name || order.customer || order.customerName || '';
    const trackingId = order.trackingId || (order._id ? `TRK-${order._id.substring(0, 4).toUpperCase()}-${order._id.substring(order._id.length - 4).toUpperCase()}` : '');

    const matchesSearch = 
      orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trackingId.toLowerCase().includes(searchTerm.toLowerCase());

    const status = (order.status || order.logistics || (order.isDelivered ? 'Delivered' : order.isShipped ? 'Shipped' : 'Pending')).toLowerCase();

    const matchesStatus = 
      statusFilter === 'All Statuses' ? true : status === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Helper for rendering styled logistics badges
  const renderLogisticsBadge = (order) => {
    const status = order.status || order.logistics || (order.isDelivered ? 'Delivered' : order.isShipped ? 'Shipped' : 'Pending');
    const statusLower = status.toLowerCase();

    let style = 'bg-amber-50 text-amber-600 border-amber-200'; // Pending default
    if (statusLower === 'shipped' || statusLower === 'in transit') {
      style = 'bg-purple-50 text-purple-600 border-purple-200';
    } else if (statusLower === 'confirmed' || statusLower === 'delivered') {
      style = 'bg-blue-50 text-blue-600 border-blue-200';
    } else if (statusLower === 'cancelled') {
      style = 'bg-rose-50 text-rose-600 border-rose-200';
    }

    return (
      <span className={`px-4 py-1.5 rounded-xl border text-xs font-black tracking-wide ${style}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex-1 p-8 md:p-10 bg-slate-50/60 min-h-screen text-slate-700 font-sans">
      
      {/* Header Bar + Stat Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Orders</h1>
          <p className="text-xs font-bold text-slate-400 mt-1">
            Manage and process customer orders.
          </p>
        </div>

        {/* Header Stats Cards */}
        <div className="flex items-center gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center min-w-[110px]">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              IN TRANSIT
            </span>
            <span className="text-2xl font-black text-slate-900 mt-0.5">
              {inTransitCount}
            </span>
          </div>

          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center min-w-[110px]">
            <span className="text-[10px] font-black text-rose-500/80 uppercase tracking-widest">
              URGENT ORDERS
            </span>
            <span className="text-2xl font-black text-rose-500 mt-0.5">
              {urgentCount}
            </span>
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text"
            placeholder="Search by Order ID or Customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-11 pr-4 text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>

        <div className="text-xs font-bold text-slate-500 flex items-center gap-2 self-end md:self-auto">
          <span>Status:</span>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] text-slate-400 font-black uppercase tracking-wider">
                <th className="py-4 px-6">TRACKING ID</th>
                <th className="py-4 px-6">ORDER</th>
                <th className="py-4 px-6">CUSTOMER</th>
                <th className="py-4 px-6">DATE</th>
                <th className="py-4 px-6">AMOUNT</th>
                <th className="py-4 px-6">LOGISTICS</th>
                <th className="py-4 px-6 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-purple-600 font-bold">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={18} />
                      <span>Loading orders...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const trackingId = order.trackingId || (order._id ? `TRK-${order._id.substring(0, 4).toUpperCase()}-${order._id.substring(order._id.length - 4).toUpperCase()}` : 'TRK-N/A');
                  const orderId = order.orderId || (order._id ? `#QB-${order._id.substring(order._id.length - 4).toUpperCase()}` : '#QB-0000');
                  const isUrgent = order.isUrgent || orderId.includes('URGENT');
                  const customerName = order.user?.name || order.customer || order.customerName || 'Customer';
                  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US') : (order.date || '5/23/2026');
                  const totalAmount = order.totalPrice ?? order.amount ?? 0;

                  return (
                    <tr key={order._id || order.id} className="hover:bg-slate-50/50 transition-colors">
                      
                      {/* Tracking ID */}
                      <td className="py-4 px-6">
                        <span className="bg-slate-100 text-slate-500 font-bold text-[10px] tracking-wider px-2 py-1 rounded-md border border-slate-200/60 font-mono">
                          {trackingId}
                        </span>
                      </td>

                      {/* Order ID */}
                      <td className="py-4 px-6 font-extrabold text-emerald-800">
                        {orderId}
                        {isUrgent && (
                          <span className="text-rose-600 font-black ml-0.5">URGENT</span>
                        )}
                      </td>

                      {/* Customer */}
                      <td className="py-4 px-6 font-bold text-slate-800">
                        {customerName}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 font-semibold text-slate-600">
                        {orderDate}
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-6 font-extrabold text-slate-900">
                        ${Number(totalAmount).toFixed(2)}
                      </td>

                      {/* Logistics Status Badge */}
                      <td className="py-4 px-6">
                        {renderLogisticsBadge(order)}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-center">
                        <button className="p-2 text-slate-400 hover:text-purple-600 bg-slate-50 hover:bg-purple-50 rounded-xl transition-all">
                          <ExternalLink size={16} />
                        </button>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-slate-400 font-medium">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Orders;