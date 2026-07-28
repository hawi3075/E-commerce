import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Shield, LogOut, Package, 
  Info, UserCog, History, Save, CheckCircle2 
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // Safely retrieve active user
  const storedUser = localStorage.getItem('userInfo');
  const initialUser = auth?.userInfo || auth?.user || (storedUser ? JSON.parse(storedUser) : null);

  const [user, setUser] = useState(initialUser);
  const [activeTab, setActiveTab] = useState('info'); // 'info', 'edit', 'history'

  // Edit Form States
  const [formData, setFormData] = useState({
    name: initialUser?.name || '',
    email: initialUser?.email || '',
    password: '',
    confirmPassword: ''
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!initialUser) {
      navigate('/login');
    }
  }, [initialUser, navigate]);

  const handleLogout = () => {
    if (auth?.logout) {
      auth.logout();
    } else {
      localStorage.removeItem('userInfo');
    }
    navigate('/login');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateAccount = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSaveSuccess(false);

    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
    };

    setUser(updatedUser);
    localStorage.setItem('userInfo', JSON.stringify(updatedUser));
    
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8 border-b border-slate-200 pb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              User Profile
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Manage your personal account details, security settings, and order history.
            </p>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all border border-red-200 active:scale-95"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>

        {/* Sidebar + Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="md:col-span-4 lg:col-span-3 bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-2">
            
            {/* User Mini Avatar Header */}
            <div className="p-4 mb-2 flex items-center gap-3 border-b border-slate-200">
              <div className="w-11 h-11 rounded-full bg-purple-600 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                {user?.name ? user.name.charAt(0).toUpperCase() : <User size={20} />}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-extrabold text-sm text-slate-900 truncate">
                  {user?.name || 'Account User'}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 truncate">
                  {user?.email || 'User'}
                </p>
              </div>
            </div>

            {/* Sidebar Buttons */}
            <button
              onClick={() => setActiveTab('info')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'info'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Info size={18} />
              <span>Info</span>
            </button>

            <button
              onClick={() => setActiveTab('edit')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'edit'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <UserCog size={18} />
              <span>Edit Account</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'history'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <History size={18} />
              <span>Order History</span>
            </button>

          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="md:col-span-8 lg:col-span-9 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm min-h-[420px]">
            
            {/* TAB 1: INFO */}
            {activeTab === 'info' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">
                    Account Specifications
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Overview of active profile attributes.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Full Identifier Name</span>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-extrabold text-slate-900 flex items-center gap-2">
                      <User size={16} className="text-purple-600" />
                      {user?.name || 'N/A'}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Registered Email Endpoint</span>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-extrabold text-slate-900 flex items-center gap-2">
                      <Mail size={16} className="text-purple-600" />
                      {user?.email || 'N/A'}
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Access Clearance Level</span>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-extrabold text-slate-900 flex items-center gap-2">
                      <Shield size={16} className="text-purple-600" />
                      {user?.isAdmin || user?.role === 'admin' ? 'Administrator' : 'Standard Operations User'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: EDIT ACCOUNT */}
            {activeTab === 'edit' && (
              <form onSubmit={handleUpdateAccount} className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">
                    Edit Profile Details
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Update account display credentials or security password.</p>
                </div>

                {saveSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 size={18} /> Account credentials updated successfully.
                  </div>
                )}

                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs font-bold">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-600"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">New Password (Optional)</label>
                      <input 
                        type="password" 
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  <Save size={16} /> Save Changes
                </button>
              </form>
            )}

            {/* TAB 3: ORDER HISTORY */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">
                    Order History Log
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Review active deployments and past equipment orders.</p>
                </div>

                <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                  <Package size={36} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-xs font-extrabold text-slate-600 uppercase">No prior orders recorded</p>
                  <p className="text-[11px] font-medium text-slate-400 mt-1 max-w-sm mx-auto">
                    When you complete purchases in the marketplace, order summaries and dispatch status will appear here.
                  </p>
                </div>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};

export default ProfileScreen;