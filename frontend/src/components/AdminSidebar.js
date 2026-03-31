import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PackagePlus, Users, CreditCard, Settings, LogOut } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Upload Products', path: '/admin/upload', icon: <PackagePlus size={20} /> },
    { name: 'Manage Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'View Payments', path: '/admin/payments', icon: <CreditCard size={20} /> },
    
  ];

  return (
    <aside className="w-64 bg-slate-900 min-h-screen text-white p-6 sticky top-0">
      <div className="mb-10 px-2">
        <h2 className="text-xl font-black tracking-tighter">LUU<span className="text-blue-500">ADMIN</span></h2>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              location.pathname === item.path ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;