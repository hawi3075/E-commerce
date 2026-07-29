import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, CheckCircle, Trash2, Loader2 } from 'lucide-react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const rawUserInfo = localStorage.getItem('userInfo');
      const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : {};
      const token = userInfo.token || localStorage.getItem('token');

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('/api/admin/messages', config);
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const rawUserInfo = localStorage.getItem('userInfo');
      const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : {};
      const token = userInfo.token || localStorage.getItem('token');
      await axios.put(`/api/admin/messages/${id}/read`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, status: 'READ' } : m)));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const rawUserInfo = localStorage.getItem('userInfo');
      const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : {};
      const token = userInfo.token || localStorage.getItem('token');
      await axios.delete(`/api/admin/messages/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="flex-1 p-8 md:p-10 bg-slate-50/50 min-h-screen text-slate-700 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Customer Messages</h1>
        <p className="text-xs font-bold text-slate-400 mt-1">
          Manage and respond to inquiries from the contact form.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs font-medium">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] text-slate-400 font-black uppercase tracking-wider">
              <th className="py-4 px-6">USER</th>
              <th className="py-4 px-6">MESSAGE</th>
              <th className="py-4 px-6">STATUS</th>
              <th className="py-4 px-6">DATE</th>
              <th className="py-4 px-6 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-purple-600 font-bold">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    <span>Loading messages...</span>
                  </div>
                </td>
              </tr>
            ) : messages.length > 0 ? (
              messages.map((msg) => (
                <tr key={msg._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mt-0.5">
                        <User size={16} />
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900">{msg.name || msg.user?.name}</div>
                        <div className="text-[11px] font-bold text-slate-400">{msg.email || msg.user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-800 max-w-xs truncate">
                    {msg.message}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider ${
                      msg.status === 'NEW' 
                        ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                      {msg.status || 'READ'}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-600">
                    🕒 {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : msg.date}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {msg.status === 'NEW' && (
                        <button 
                          onClick={() => handleMarkAsRead(msg._id)}
                          className="p-1.5 border rounded-lg text-slate-600 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
                          title="Mark as Read"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(msg._id)}
                        className="p-1.5 border rounded-lg text-slate-600 hover:text-rose-600 hover:border-rose-200 transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-slate-400 font-medium">
                  No messages found in database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;