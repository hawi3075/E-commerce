import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import { User, Mail, ShieldCheck, LogOut, Package } from 'lucide-react';

const ProfileScreen = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 font-sans antialiased flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="max-w-[1240px] mx-auto px-4 lg:px-8 pt-24 pb-16">
          <div className="bg-white rounded-3xl p-6 lg:p-10 border border-gray-200 shadow-sm max-w-2xl mx-auto">
            
            {/* Header */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 rounded-full bg-purple-700 text-white font-black flex items-center justify-center text-2xl shadow-md">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">{user.name || 'User Profile'}</h1>
                <p className="text-xs font-bold text-purple-700 uppercase tracking-widest">Verified Customer</p>
              </div>
            </div>

            {/* Profile Info */}
            <div className="py-6 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <User className="text-purple-700" size={20} />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Full Name</p>
                  <p className="text-sm font-black text-gray-800">{user.name || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <Mail className="text-purple-700" size={20} />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Email Address</p>
                  <p className="text-sm font-black text-gray-800">{user.email || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <ShieldCheck className="text-purple-700" size={20} />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Account Status</p>
                  <p className="text-sm font-black text-emerald-600">Active & Secure</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/shop')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Package size={18} /> Continue Shopping
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-3 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileScreen;