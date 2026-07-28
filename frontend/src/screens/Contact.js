import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Send, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Points directly to Express server on port 5000
      const response = await axios.post('http://localhost:5000/api/contact', formData);

      if (response.status === 200 || response.data.success) {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Contact submit error:', error);
      setIsSubmitting(false);
      setErrorMessage(
        error.response?.data?.message || 'Server endpoint not found. Please verify backend is running on port 5000.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-16 px-6 font-sans text-slate-700">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ================= LEFT COLUMN: INFO CARDS ================= */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-600">
              <MessageSquare size={22} />
              <span className="text-xs font-bold uppercase tracking-widest">Communications</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">
              Get in Touch
            </h1>
            <p className="text-sm text-slate-500 font-medium max-w-sm leading-relaxed">
              Have questions about bulk safety procurement or system integrations? Drop a line to our deployment center.
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="space-y-4 pt-6 lg:pt-0">
            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-purple-600">
                <Mail size={20} />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Email Us</span>
                <span className="text-sm font-extrabold text-slate-800">support@luusafety.com</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-purple-600">
                <Phone size={20} />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Call Center</span>
                <span className="text-sm font-extrabold text-slate-800">+1 (555) 019-2834</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-purple-600">
                <MapPin size={20} />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">HQ Operations</span>
                <span className="text-sm font-extrabold text-slate-800">Industrial District, Suite 400</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE FORM ================= */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-center">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-bold flex items-center gap-3">
              <AlertCircle size={20} />
              <span>{errorMessage}</span>
            </div>
          )}

          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 animate-bounce">
                <Send size={32} />
              </div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide">Transmission Complete</h3>
              <p className="text-sm text-slate-500 max-w-sm font-medium leading-relaxed">
                Your communication file has been logged. An operations specialist will respond shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs font-extrabold text-purple-700 uppercase tracking-wider pt-2 hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Subject Tiers</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="Bulk Procurement / Technical Inquiry"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Analytical Message</label>
                <textarea 
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Describe your inquiry requirements explicitly..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-black uppercase tracking-wider text-sm py-4 rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    <span>Syncing Connection...</span>
                  </div>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Dispatch Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactScreen;