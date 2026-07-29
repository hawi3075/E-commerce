import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const CATEGORY_COLORS = ['#059669', '#2563EB', '#9333EA', '#D97706', '#DC2626'];

const Performance = () => {
  const [data, setData] = useState({ categories: [], customerMix: { returning: 0, newCustomers: 0 } });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const rawUserInfo = localStorage.getItem('userInfo');
        const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : {};
        const token = userInfo.token || localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const res = await axios.get('/api/admin/performance', config);
        setData(res.data);
      } catch (err) {
        console.error('Error loading performance page:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, []);

  const totalCategoryValue = data.categories.reduce((acc, cat) => acc + cat.value, 0) || 1;

  return (
    <div className="flex-1 p-8 md:p-10 bg-slate-50/50 min-h-screen text-slate-700 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Performance Analytics</h1>
        <p className="text-xs font-bold text-slate-400 mt-1">
          Real-time safety equipment category breakdown and customer metrics.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-purple-600 font-bold gap-2">
          <Loader2 className="animate-spin" size={20} />
          <span>Loading live performance data...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sales by Category */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Sales by Category</h2>
            <p className="text-xs font-bold text-slate-400 mt-0.5 mb-6">
              Revenue breakdown by product category.
            </p>

            <div className="space-y-4">
              {data.categories.length > 0 ? (
                data.categories.map((cat, idx) => {
                  const percentage = Math.round((cat.value / totalCategoryValue) * 100);
                  const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
                  return (
                    <div key={cat.name} className="flex items-center justify-between font-extrabold text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
                        <span className="text-slate-800 uppercase">{cat.name}</span>
                      </div>
                      <span className="text-slate-900">{percentage}%</span>
                    </div>
                  );
                })
              ) : (
                <div className="text-xs font-bold text-slate-400">No categories found</div>
              )}
            </div>
          </div>

          {/* Customer Mix */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Customer Mix</h2>
            <p className="text-xs font-bold text-slate-400 mt-0.5 mb-6">
              Returning vs New Customers.
            </p>

            <div className="grid grid-cols-2 gap-4 text-center mt-8">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  RETURNING
                </div>
                <div className="text-3xl font-black text-emerald-600">
                  {data.customerMix.returning}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  NEW CUSTOMERS
                </div>
                <div className="text-3xl font-black text-purple-600">
                  {data.customerMix.newCustomers}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Performance;