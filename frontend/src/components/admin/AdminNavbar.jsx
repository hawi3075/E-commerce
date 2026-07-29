import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Bell, Moon, Sun, User, LogOut, Check, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isBellOpen, setIsBellOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const bellRef = useRef(null);
  const profileRef = useRef(null);

  // Load user from localStorage
  const rawUserInfo = localStorage.getItem('userInfo');
  const adminUser = rawUserInfo ? JSON.parse(rawUserInfo) : {};

  // Sync Dark/Light theme class on <html> element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const token = adminUser.token || localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const API_URL = process.env.REACT_APP_API_URL || '';
      
      const { data } = await axios.get(`${API_URL}/api/admin/messages/notifications`, config);
      setUnreadCount(data.unreadCount || 0);
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) setIsBellOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkRead = async (id, e) => {
    e.stopPropagation();
    try {
      const token = adminUser.token || localStorage.getItem('token');
      await axios.put(`/api/admin/messages/${id}/read`, {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to mark read:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      
      {/* Left Title */}
      <div className="flex items-center gap-3">
        <h2 className="text-base font-black text-slate-800 tracking-tight flex items-center gap-2">
          LUU SAFETY 
          <span className="text-[10px] font-extrabold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
            ADMIN
          </span>
        </h2>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        
        {/* 1. Dark / Light Mode Toggle */}
        <button
          onClick={() => setIsDarkMode((prev) => !prev)}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-100"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} className="text-slate-600" />}
        </button>

        {/* 2. Notification Bell Icon */}
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => setIsBellOpen(!isBellOpen)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-100 relative"
            title="Customer Messages"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Bell Dropdown */}
          {isBellOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <span className="font-extrabold text-xs text-slate-900">NEW MESSAGES</span>
                <span className="text-[10px] font-black text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                  {unreadCount} UNREAD
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => { setIsBellOpen(false); navigate('/admin/messages'); }}
                      className="p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start justify-between gap-2"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900">{item.name}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{item.message}</p>
                        <span className="text-[9px] font-semibold text-slate-400 mt-1 block">
                          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleMarkRead(item._id, e)}
                        className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Mark read"
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs font-semibold text-slate-400">
                    No unread messages
                  </div>
                )}
              </div>

              <button
                onClick={() => { setIsBellOpen(false); navigate('/admin/messages'); }}
                className="w-full p-3 text-center text-xs font-extrabold text-purple-600 hover:bg-purple-50 border-t border-slate-100 transition-colors"
              >
                View All Messages →
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-slate-200"></div>

        {/* 3. Admin Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-extrabold text-xs flex items-center justify-center uppercase shadow-sm">
              {adminUser.name ? adminUser.name.charAt(0) : <User size={15} />}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-black text-slate-800 leading-tight">
                {adminUser.name || 'Admin User'}
              </p>
              <p className="text-[10px] font-bold text-slate-400">
                {adminUser.email || 'admin@luusafety.com'}
              </p>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {/* Profile Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 p-1.5">
              <button
                onClick={() => { setIsProfileOpen(false); navigate('/admin/messages'); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-extrabold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <Bell size={14} />
                <span>Customer Messages</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-extrabold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-1"
              >
                <LogOut size={14} />
                <span>End Admin Session</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default AdminNavbar;