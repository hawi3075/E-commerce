import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, UserX, UserCheck, Loader2 } from 'lucide-react';

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const rawUserInfo = localStorage.getItem('userInfo');
      const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : {};
      const token = userInfo.token || localStorage.getItem('token');

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('/api/admin/users', config);
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Fallback dummy data matching design
      setUsers([
        { _id: '156c', name: 'Fahmi g', email: 'fam@gmail.com', role: 'REGULAR', createdAt: '2026-05-22', status: 'ACTIVE' },
        { _id: '593e', name: 'Abenezer Adisu', email: 'abenezerforcode@gmail.com', role: 'REGULAR', createdAt: '2026-04-27', status: 'ACTIVE' },
        { _id: '6ca3', name: 'Abebe Alemu', email: 'abebe@gmail.com', role: 'REGULAR', createdAt: '2026-04-27', status: 'ACTIVE' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u._id?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All Statuses' ? true : (u.status || 'ACTIVE') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 p-8 md:p-10 bg-slate-50/50 min-h-screen text-slate-700 font-sans">
      
      {/* Header & Stats Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Customers</h1>
          <p className="text-xs font-bold text-slate-400 mt-1">
            Manage your customers and user accounts.
          </p>
        </div>

        <div className="flex items-center gap-6 text-right">
          <div>
            <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">TOTAL USERS</div>
            <div className="text-2xl font-black text-slate-900">{users.length}</div>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">ACTIVE NOW</div>
            <div className="text-2xl font-black text-emerald-600">
              {users.filter(u => u.status !== 'SUSPENDED').length}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">NEW TODAY</div>
            <div className="text-2xl font-black text-slate-900">+0</div>
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-11 pr-4 text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
          <span>Status:</span>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs font-medium">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] text-slate-400 font-black uppercase tracking-wider">
              <th className="py-4 px-6">ID</th>
              <th className="py-4 px-6">CUSTOMER</th>
              <th className="py-4 px-6">ROLE</th>
              <th className="py-4 px-6">JOINED DATE</th>
              <th className="py-4 px-6">ACCOUNT STATUS</th>
              <th className="py-4 px-6 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-purple-600 font-bold">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    <span>Loading customers...</span>
                  </div>
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-slate-700">
                    #GB-{user._id.substring(user._id.length - 4).toUpperCase()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-extrabold text-slate-900">{user.name}</div>
                    <div className="text-[11px] font-bold text-slate-400">{user.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-[10px] font-black text-slate-600 tracking-wider">
                      🛡️ {user.role || (user.isAdmin ? 'ADMIN' : 'REGULAR')}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-600">
                    {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider ${
                      user.status === 'SUSPENDED'
                        ? 'bg-rose-50 text-rose-600 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    }`}>
                      {user.status || 'ACTIVE'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                      <UserX size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-10 text-center text-slate-400 font-medium">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;