import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    // State for real data
    const [stats, setStats] = useState({
        totalSales: 0,
        activeOrders: 0,
        newUsers: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // You will create this backend route next
                const { data } = await axios.get('/api/admin/stats');
                setStats(data);
            } catch (error) {
                console.error("Error fetching dashboard stats", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="flex-1 p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-black uppercase tracking-tight mb-10">Admin Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Total Sales Card */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Total Sales</p>
                    <h2 className="text-4xl font-black text-blue-600">${stats.totalSales.toLocaleString()}</h2>
                </div>

                {/* Active Orders Card */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Active Orders</p>
                    <h2 className="text-4xl font-black text-slate-900">{stats.activeOrders}</h2>
                </div>

                {/* New Users Card */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">New Users</p>
                    <h2 className="text-4xl font-black text-slate-900">{stats.newUsers}</h2>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;