import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Crown, Shield, Users, Save, Loader2 } from 'lucide-react';

const AdminTeam = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All roles');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [modifiedRoles, setModifiedRoles] = useState({});

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const rawUserInfo = localStorage.getItem('userInfo');
      const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : {};
      const token = userInfo.token || localStorage.getItem('token');

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('/api/admin/users', config);
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching team:', error);
      setUsers([
        { _id: '1', name: 'Fahmi g', email: 'fam@gmail.com', role: 'REGULAR', status: 'ACTIVE', updatedAt: '2026-05-22' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleRoleChange = (id, newRole) => {
    setModifiedRoles((prev) => ({ ...prev, [id]: newRole }));
  };

  const handleSaveRole = async (user) => {
    const newRole = modifiedRoles[user._id];
    if (!newRole) return;

    try {
      const rawUserInfo = localStorage.getItem('userInfo');
      const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : {};
      const token = userInfo.token || localStorage.getItem('token');

      await axios.put(
        `/api/admin/users/${user._id}/role`,
        { role: newRole, isAdmin: newRole !== 'REGULAR' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, role: newRole, updatedAt: new Date().toISOString() } : u))
      );
      setModifiedRoles((prev) => {
        const copy = { ...prev };
        delete copy[user._id];
        return copy;
      });
      alert('Role updated successfully!');
    } catch (error) {
      alert('Failed to update role');
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'All roles' ? true : u.role === roleFilter;
    const matchesStatus = statusFilter === 'All status' ? true : (u.status || 'ACTIVE') === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="flex-1 p-8 md:p-10 bg-slate-50/50 min-h-screen text-slate-700 font-sans">
      
      {/* Banner */}
      <div className="bg-emerald-50/60 border border-emerald-100 p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-[10px] font-black tracking-widest uppercase mb-1">
            <Crown size={14} /> SUPER ADMIN MODE
          </div>
          <h1 className="text-2xl font-black text-slate-900">Admin Team & Access Control</h1>
          <p className="text-xs font-bold text-slate-500 mt-0.5">
            Manage admin accounts and control who can access platform-level tools.
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
          Signed in as <span className="text-slate-900 font-extrabold">Super Admin</span>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">ALL USERS</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{users.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <Users size={18} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">ADMINS</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              {users.filter(u => u.role === 'ADMIN').length || 4}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Shield size={18} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">SUPER ADMINS</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              {users.filter(u => u.role === 'SUPER_ADMIN').length || 1}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Crown size={18} />
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-11 pr-4 text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-500 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <span>ROLE FILTER</span>
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none"
            >
              <option value="All roles">All roles</option>
              <option value="REGULAR">REGULAR</option>
              <option value="ADMIN">ADMIN</option>
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span>STATUS FILTER</span>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none"
            >
              <option value="All status">All status</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs font-medium">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] text-slate-400 font-black uppercase tracking-wider">
              <th className="py-4 px-6">CUSTOMER</th>
              <th className="py-4 px-6">CURRENT ROLE</th>
              <th className="py-4 px-6">ASSIGN ROLE</th>
              <th className="py-4 px-6">STATUS</th>
              <th className="py-4 px-6">LAST SAVED</th>
              <th className="py-4 px-6 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-purple-600 font-bold">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    <span>Loading team members...</span>
                  </div>
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const currentRole = user.role || 'REGULAR';
                const selectedRole = modifiedRoles[user._id] || currentRole;

                return (
                  <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-extrabold text-slate-900">{user.name}</div>
                      <div className="text-[11px] font-bold text-slate-400">{user.email}</div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-[10px] font-black text-slate-600 tracking-wider">
                        {currentRole}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <select 
                        value={selectedRole}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer"
                      >
                        <option value="REGULAR">REGULAR</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                      </select>
                    </td>

                    <td className="py-4 px-6">
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full text-[10px] font-black tracking-wider">
                        {user.status || 'ACTIVE'}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-bold text-slate-600">
                      {new Date(user.updatedAt || user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>

                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => handleSaveRole(user)}
                        disabled={!modifiedRoles[user._id]}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          modifiedRoles[user._id]
                            ? 'bg-emerald-800 text-white hover:bg-emerald-900 cursor-pointer'
                            : 'bg-emerald-800/40 text-white/70 cursor-not-allowed'
                        }`}
                      >
                        <Save size={14} /> Save
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="py-10 text-center text-slate-400 font-medium">
                  No accounts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTeam;