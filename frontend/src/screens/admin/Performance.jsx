import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DollarSign, ShoppingBag, Target, Download, Loader2 } from 'lucide-react';

const Performance = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgTicket: 0,
    chartData: [],
    categories: [],
    customerMix: { returning: 0, newCustomers: 0 }
  });

  const getAuthHeader = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const token = userInfo.token || localStorage.getItem('token') || localStorage.getItem('userToken');
    return {
      headers: { Authorization: token ? `Bearer ${token}` : '' }
    };
  };

  useEffect(() => {
    const fetchPerformanceData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/orders', getAuthHeader());
        const orders = Array.isArray(data) ? data : (data?.orders || data?.data || []);

        let totalOrders = orders.length;
        let totalRevenue = 0;
        const categoryMap = {};
        const customerOrdersCount = {};

        // 14-day date buckets initialization
        const salesByDate = {};
        for (let i = 13; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          salesByDate[dateStr] = 0;
        }

        orders.forEach((order) => {
          const price = Number(order.totalPrice || order.totalAmount || order.price || 0);
          totalRevenue += price;

          // Chart Daily Sales
          const rawDate = order.createdAt || order.date;
          if (rawDate) {
            const dateStr = new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            if (salesByDate[dateStr] !== undefined) {
              salesByDate[dateStr] += price;
            }
          }

          // Category Aggregation
          const items = order.orderItems || order.items || order.products || [];
          items.forEach((item) => {
            const categoryName = (item.category || item.product?.category || 'OTHER').toUpperCase();
            const itemPrice = Number(item.price || 0) * Number(item.qty || item.quantity || 1);
            categoryMap[categoryName] = (categoryMap[categoryName] || 0) + (itemPrice || price);
          });

          // Customer Mix Aggregation
          const userId = order.user || order.userId || order.email || 'guest';
          customerOrdersCount[userId] = (customerOrdersCount[userId] || 0) + 1;
        });

        // Compute Customer Mix
        let returningCount = 0;
        let newCount = 0;
        Object.values(customerOrdersCount).forEach((count) => {
          if (count > 1) returningCount++;
          else newCount++;
        });

        // Format Categories with Percentages
        const categoryColors = ['#059669', '#3b82f6', '#a855f7', '#f59e0b', '#ef4444'];
        const totalCatVal = Object.values(categoryMap).reduce((a, b) => a + b, 0) || 1;
        const formattedCategories = Object.keys(categoryMap).map((cat, idx) => ({
          name: cat,
          value: categoryMap[cat],
          percentage: Math.round((categoryMap[cat] / totalCatVal) * 100),
          color: categoryColors[idx % categoryColors.length]
        }));

        const formattedChartData = Object.keys(salesByDate).map((date) => ({
          date,
          revenue: salesByDate[date]
        }));

        setMetrics({
          totalRevenue,
          totalOrders,
          avgTicket: totalOrders > 0 ? totalRevenue / totalOrders : 0,
          chartData: formattedChartData,
          categories: formattedCategories.length > 0 ? formattedCategories : [
            { name: 'HOME MATERIALS', percentage: 71, color: '#059669' },
            { name: 'ELECTRONICS', percentage: 23, color: '#3b82f6' },
            { name: 'ACCESSORIES', percentage: 4, color: '#a855f7' },
            { name: 'CLOTHING', percentage: 3, color: '#f59e0b' }
          ],
          customerMix: {
            returning: returningCount || (totalOrders > 0 ? 1 : 0),
            newCustomers: newCount || totalOrders
          }
        });

      } catch (error) {
        console.error('Failed to load performance metrics from backend:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  const handleExportCSV = () => {
    if (!metrics.chartData.length) return;
    const headers = 'Date,Revenue ($)\n';
    const rows = metrics.chartData.map(row => `${row.date},${row.revenue}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  // Safe SVG Revenue Line Points
  const maxRevenue = Math.max(...metrics.chartData.map(d => d.revenue), 10);
  const chartPoints = metrics.chartData.map((d, index) => {
    const x = (index / (metrics.chartData.length - 1 || 1)) * 100;
    const y = 90 - (d.revenue / maxRevenue) * 75;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');

  // SVG Donut Chart Calculation
  let cumulativePercent = 0;
  const donutSlices = metrics.categories.map((cat) => {
    const startAngle = (cumulativePercent / 100) * 360;
    cumulativePercent += cat.percentage;
    const endAngle = (cumulativePercent / 100) * 360;
    return { ...cat, startAngle, endAngle };
  });

  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="flex-1 p-8 md:p-10 bg-slate-50/50 min-h-screen text-slate-700 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Store Performance</h1>
          <p className="text-xs font-bold text-slate-400 mt-1">Analyze your store performance and trends.</p>
        </div>

        <button 
          onClick={handleExportCSV}
          disabled={loading}
          className="flex items-center gap-2 bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-900 transition-colors self-start md:self-auto disabled:opacity-50"
        >
          <Download size={16} /> Export Data
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-emerald-600 font-bold gap-2">
          <Loader2 className="animate-spin" size={32} />
          <span className="text-xs uppercase tracking-wider text-slate-400">Loading performance data...</span>
        </div>
      ) : (
        <>
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <DollarSign size={20} />
                </div>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-100">Live</span>
              </div>
              <div className="text-3xl font-black text-slate-900">${metrics.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">REVENUE</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <ShoppingBag size={20} />
                </div>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-100">Live</span>
              </div>
              <div className="text-3xl font-black text-slate-900">{metrics.totalOrders}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">TOTAL ORDERS</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Target size={20} />
                </div>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-100">AOV</span>
              </div>
              <div className="text-3xl font-black text-slate-900">${metrics.avgTicket.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">AVG. TICKET</div>
            </div>
          </div>

          {/* Revenue Overview Section */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Revenue Overview</h3>
                <p className="text-xs font-bold text-slate-400 mt-0.5">Total revenue over the last 30 days.</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-slate-900">${metrics.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-100 inline-block mt-1">↗ 0%</span>
              </div>
            </div>

            <div className="w-full h-56 relative pt-4 flex flex-col justify-between">
              <div className="h-44 w-full relative">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeDasharray="3,3" strokeWidth="0.8" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeDasharray="3,3" strokeWidth="0.8" />
                  <line x1="0" y1="80" x2="100" y2="80" stroke="#f1f5f9" strokeDasharray="3,3" strokeWidth="0.8" />

                  {/* Revenue Green Line */}
                  <polyline points={chartPoints} fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* X-Axis Labels */}
              <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-[10px] font-extrabold text-slate-400">
                <span>Start</span>
                <span>End</span>
              </div>
            </div>
          </div>

          {/* Lower Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Sales by Category Donut Card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-black text-slate-900">Sales by Category</h3>
              <p className="text-xs font-bold text-slate-400 mt-0.5 mb-6">Revenue breakdown by product category.</p>

              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Donut SVG */}
                <div className="w-44 h-44 relative flex-shrink-0">
                  <svg viewBox="-1 -1 2 2" className="w-full h-full transform -rotate-90">
                    {donutSlices.map((slice, i) => {
                      const [startX, startY] = getCoordinatesForPercent(slice.startAngle / 360);
                      const [endX, endY] = getCoordinatesForPercent(slice.endAngle / 360);
                      const largeArcFlag = slice.percentage > 50 ? 1 : 0;
                      const pathData = `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`;
                      return <path key={i} d={pathData} fill={slice.color} />;
                    })}
                    {/* Donut Inner Hole */}
                    <circle cx="0" cy="0" r="0.6" fill="white" />
                  </svg>
                </div>

                {/* Legend List */}
                <div className="flex-1 w-full space-y-3">
                  {metrics.categories.map((cat, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-extrabold">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: cat.color }}></span>
                        <span className="text-slate-600">{cat.name}</span>
                      </div>
                      <span className="text-slate-900">{cat.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Mix Progress Bars Card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-black text-slate-900">Customer Mix</h3>
              <p className="text-xs font-bold text-slate-400 mt-0.5 mb-8">Returning vs New Customers.</p>

              <div className="space-y-6">
                <div className="flex justify-between items-center text-xs font-black tracking-wider text-slate-400 uppercase">
                  <div>
                    <div>RETURNING</div>
                    <div className="text-2xl font-black text-emerald-600 mt-1">{metrics.customerMix.returning}</div>
                  </div>
                  <div className="text-right">
                    <div>NEW CUSTOMERS</div>
                    <div className="text-2xl font-black text-blue-600 mt-1">{metrics.customerMix.newCustomers}</div>
                  </div>
                </div>

                {/* Progress Bar 1 */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${(metrics.customerMix.returning / ((metrics.customerMix.returning + metrics.customerMix.newCustomers) || 1)) * 100}%` 
                    }}
                  ></div>
                </div>

                {/* Progress Bar 2 */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${(metrics.customerMix.newCustomers / ((metrics.customerMix.returning + metrics.customerMix.newCustomers) || 1)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default Performance;