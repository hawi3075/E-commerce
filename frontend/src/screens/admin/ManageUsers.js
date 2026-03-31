import React from 'react';
import { UserCircle, ShieldAlert, Trash2 } from 'lucide-react';

const ManageUsers = () => {
  const users = [
    { id: 1, name: "Amanuel Tekle", email: "aman@example.com", role: "Customer", status: "Active" },
    { id: 2, name: "Sintayehu G.", email: "sinta@example.com", role: "Admin", status: "Active" },
    { id: 3, name: "Unknown User", email: "test@test.com", role: "Customer", status: "Banned" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen w-full">
      <h1 className="text-2xl font-black text-slate-900 mb-8 uppercase">Manage System Users</h1>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="p-6">User</th>
              <th className="p-6">Role</th>
              <th className="p-6">Status</th>
              <th className="p-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t border-slate-50">
                <td className="p-6 flex items-center gap-3">
                  <UserCircle className="text-slate-300" />
                  <div>
                    <p className="font-bold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </td>
                <td className="p-6 font-bold">{user.role}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${user.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-6 flex gap-2">
                  <button className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-orange-500 hover:text-white transition-all"><ShieldAlert size={14}/></button>
                  <button className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-red-600 hover:text-white transition-all"><Trash2 size={14}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;