import React from 'react';
import { DollarSign, ShoppingBag, Target, Download } from 'lucide-react';

const Performance = () => {
  return (
    <div className="flex-1 p-8 md:p-10 bg-slate-50/50 min-h-screen text-slate-700 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Store Performance</h1>
          <p className="text-xs font-bold text-slate-400 mt-1">
            Analyze your store performance and trends.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-900 transition-colors self-start md:self-auto">
          <Download size={16} /> Export Data
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign size={20} />
            </div>
            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-100">
              ↗ 0%
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">$0.00</div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">REVENUE</div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ShoppingBag size={20} />
            </div>
            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-100">
              ↗ Live
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">43</div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">TOTAL ORDERS</div>
        </div>

        {/* Avg Ticket Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Target size={20} />
            </div>
            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-100">
              ↗ AOV
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">$0.00</div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">AVG. TICKET</div>
        </div>

      </div>

      {/* Revenue Chart Box */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-black text-slate-900">Revenue Overview</h3>
            <p className="text-xs font-bold text-slate-400 mt-0.5">Total revenue over the last 30 days.</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-slate-900">$0.00</div>
            <div className="text-[10px] font-black text-emerald-600">↗ 0%</div>
          </div>
        </div>

        {/* Chart Area Graphic Placeholder */}
        <div className="h-64 w-full bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 font-bold text-xs">
          [ Chart Visualizer - Revenue Data ]
        </div>
      </div>

    </div>
  );
};

export default Performance;