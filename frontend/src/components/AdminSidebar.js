import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  CreditCard, 
  LogOut, 
  ExternalLink, 
  BarChart3, 
  MessageSquare, 
  ShieldCheck 
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

// Import logo directly from src/components/logo.webp
import logoImg from './logo.webp';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const navigationSections = [
    {
      title: 'MAIN MENU',
      items: [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'Inventory', path: '/admin/upload', icon: <Package size={20} /> },
        { name: 'Orders', path: '/admin/payments', icon: <CreditCard size={20} /> },
      ]
    },
    {
      title: 'INSIGHTS',
      items: [
        { name: 'Performance', path: '/admin/performance', icon: <BarChart3 size={20} /> },
        { name: 'Customers', path: '/admin/users', icon: <Users size={20} /> },
        { name: 'Messages', path: '/admin/messages', icon: <MessageSquare size={20} /> },
        { name: 'Go To Website', path: '/shop', icon: <ExternalLink size={20} /> },
      ]
    },
    {
      title: 'SUPER ADMIN',
      items: [
        { name: 'Admin Team', path: '/admin/team', icon: <ShieldCheck size={20} /> },
      ]
    }
  ];

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 h-screen bg-white text-slate-700 p-5 flex flex-col justify-between sticky top-0 border-r border-slate-200/80 shrink-0 font-sans overflow-hidden">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-2 mb-5">
          <img 
            src={logoImg} 
            alt="Efoy Gabeya Logo" 
            className="w-11 h-11 object-contain rounded-xl shadow-sm" 
          />
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight leading-tight">
              Efoy Gabeya
            </h2>
            <p className="text-[11px] font-black text-purple-600 uppercase tracking-widest mt-0.5">
              ADMIN CONSOLE
            </p>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-4">
          {navigationSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <p className="px-3 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">
                {section.title}
              </p>
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-150 ${
                      isActive
                        ? 'bg-purple-100/70 text-purple-700 font-extrabold'
                        : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                    }`}
                  >
                    <span className={`transition-colors ${isActive ? 'text-purple-600' : 'text-slate-400'}`}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Version & Logout */}
      <div className="pt-4 border-t border-slate-100 flex flex-col items-center gap-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut size={16} /> End Session
        </button>

        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-0.5 rounded-full">
          v2.1.0-PRO
        </span>
      </div>
    </aside>
  );
};

export default AdminSidebar;