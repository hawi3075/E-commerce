import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  User, Mail, Shield, LogOut, Package, 
  Info, UserCog, History, Save, CheckCircle2, Loader2, Calendar, DollarSign
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Order History States
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');

  useEffect(() => {
    if (!initialUser) {
      navigate('/login');
    }
  }, [initialUser, navigate]);

  // Fetch Order History when tab is 'history'
  useEffect(() => {
    if (activeTab === 'history' && user) {
      const fetchOrders = async () => {
        try {
          setOrdersLoading(true);
          setOrdersError('');
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          };
          const { data } = await axios.get('/api/orders/myorders', config);
          setOrders(data);
        } catch (err) {
          setOrdersError(err.response?.data?.message || 'Failed to load order history.');
        } finally {
          setOrdersLoading(false);
        }
      };
      fetchOrders();
    }
  }, [activeTab, user]);

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

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSaveSuccess(false);

    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    try {
      setIsSubmitting(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`
        }
      };

      const updatePayload = {
        name: formData.name,
        email: formData.email,
        ...(formData.password && { password: formData.password })
      };

      const { data } = await axios.put('/api/users/profile', updatePayload, config);

      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      setSaveSuccess(true);
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="max-w-6xl mx-auto pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="mb-8 border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
              className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all border border-red-200 active:scale-95 w-full sm:w-auto"
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>

          {/* Sidebar + Main Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* SIDEBAR NAVIGATION */}
            <aside className="md:col-span-4 lg:col-span-3 bg-white p-4 rounded-3xl border border-slate-200 space-y-2 shadow-sm">
              
              {/* User Mini Avatar Header */}
              <div className="p-4 mb-2 flex items-center gap-3 border-b border-slate-100">
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
                    : 'text-slate-600 hover:bg-slate-100'
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
                    : 'text-slate-600 hover:bg-slate-100'
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
                    : 'text-slate-600 hover:bg-slate-100'
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
                    disabled={isSubmitting}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
                    Save Changes
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

                  {ordersLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="animate-spin text-purple-600 mb-2" size={32} />
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Orders...</p>
                    </div>
                  ) : ordersError ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs font-bold">
                      {ordersError}
                    </div>
                  ) : orders && orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order._id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-extrabold uppercase bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md">
                                ID: {order._id.substring(0, 10)}...
                              </span>
                              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                                order.isDelivered ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {order.isDelivered ? 'Delivered' : 'Processing'}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium pt-1">
                              <span className="flex items-center gap-1">
                                <Calendar size={13} className="text-slate-400" />
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1 font-bold text-slate-800">
                                <DollarSign size={13} className="text-purple-600" />
                                {Number(order.totalPrice || 0).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <button 
                            onClick={() => navigate(`/order/${order._id}`)}
                            className="px-4 py-2 bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm self-start sm:self-center"
                          >
                            View Details
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                      <Package size={36} className="mx-auto text-slate-300 mb-3" />
                      <p className="text-xs font-extrabold text-slate-600 uppercase">No prior orders recorded</p>
                      <p className="text-[11px] font-medium text-slate-400 mt-1 max-w-sm mx-auto">
                        When you complete purchases in the marketplace, order summaries and dispatch status will appear here.
                      </p>
                    </div>
                  )}
                </div>
              )}

            </main>

          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-black text-white pt-8 pb-6 mt-12 rounded-t-3xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center font-black text-[10px] text-white">L</div>
              <span className="text-white font-black tracking-tight">Luu Safety</span>
            </div>
            <p>© {new Date().getFullYear()} Luu Safety. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfileScreen;