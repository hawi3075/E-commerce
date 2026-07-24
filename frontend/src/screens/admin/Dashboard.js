import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  DollarSign, ShoppingBag, Users, TrendingUp, 
  ArrowUpRight, ArrowDownRight, PackagePlus, UserCheck, RefreshCw 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 12480,
    activeOrders: 18,
    newUsers: 142
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/admin/stats');
        setStats(data);
      } catch (error) {
        console.log('Using placeholder stats until endpoint is connected');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex-1 p-8 md:p-10 bg-slate-50/60 min-h-screen text-slate-700 font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Node Status: Operational</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight italic mt-1">
            System Overview
          </h1>
        </div>

        {/* Quick Action Hub */}
        <div className="flex items-center gap-3">
          <Link 
            to="/admin/upload" 
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-purple-600/10 transition-all active:scale-[0.98]"
          >
            <PackagePlus size={16} /> Add Product
          </Link>
          <Link 
            to="/admin/users" 
            className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
          >
            <UserCheck size={16} /> Review Users
          </Link>
        </div>
      </div>

      {/* Main Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Total Sales Card */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600">
              <DollarSign size={22} />
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <ArrowUpRight size={12} /> +12.5%
            </span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Sales</p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            ${stats.totalSales.toLocaleString()}
          </h2>
        </div>

        {/* Active Orders Card */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-50 p-3 rounded-2xl text-purple-600">
              <ShoppingBag size={22} />
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
              <TrendingUp size={12} /> Live
            </span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Orders</p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            {stats.activeOrders}
          </h2>
        </div>

        {/* New Users Card */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
              <Users size={22} />
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              <ArrowUpRight size={12} /> +8%
            </span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registered Operatives</p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            {stats.newUsers}
          </h2>
        </div>

      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-[2rem] border border-slate-100 p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">
              Recent Transactions
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Real-time activity log
            </p>
          </div>
          <button className="p-2 text-slate-400 hover:text-purple-600 transition-colors">
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead>
              <tr className="border-b border-slate-100 text-[9px] text-slate-400 uppercase font-black tracking-widest">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Operative</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr>
                <td className="py-4 font-bold text-slate-800">#ORD-9021</td>
                <td className="py-4 text-slate-500">operator@luusafety.com</td>
                <td className="py-4">
                  <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase px-2.5 py-1 rounded-md">
                    Fulfilled
                  </span>
                </td>
                <td className="py-4 text-right font-black text-slate-900">$240.00</td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-slate-800">#ORD-8812</td>
                <td className="py-4 text-slate-500">john.doe@security.org</td>
                <td className="py-4">
                  <span className="bg-amber-50 text-amber-600 text-[9px] font-black uppercase px-2.5 py-1 rounded-md">
                    Pending
                  </span>
                </td>
                <td className="py-4 text-right font-black text-slate-900">$185.50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;