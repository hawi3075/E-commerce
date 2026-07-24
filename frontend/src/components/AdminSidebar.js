import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, PackagePlus, Users, CreditCard, 
  Shield, LogOut, ExternalLink, ChevronRight 
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'Upload Products', path: '/admin/upload', icon: <PackagePlus size={18} /> },
    { name: 'Manage Users', path: '/admin/users', icon: <Users size={18} /> },
    { name: 'View Payments', path: '/admin/payments', icon: <CreditCard size={18} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-slate-900 min-h-screen text-slate-300 p-5 flex flex-col justify-between sticky top-0 border-r border-slate-800 shrink-0">
      <div>
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800/80">
          <div className="bg-purple-600 p-2 rounded-xl shadow-lg shadow-purple-600/20">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm font-black italic text-white uppercase tracking-wider">
              Luu<span className="text-purple-500">Admin</span>
            </h2>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
              Control Panel
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          <p className="px-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
            Main Menu
          </p>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`transition-colors ${isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight size={14} className="text-purple-400" />}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Footer Options */}
      <div className="space-y-2 pt-6 border-t border-slate-800/80">
        <Link 
          to="/shop" 
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
        >
          <span className="flex items-center gap-2.5">
            <ExternalLink size={16} /> Live Storefront
          </span>
        </Link>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all text-left"
        >
          <LogOut size={16} /> End Session
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;