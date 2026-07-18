import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const AboutScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-16 px-6 font-sans text-slate-700">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ================= LEFT COLUMN: INFO CARDS ================= */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-600">
              <MessageSquare size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Communications</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
              Get in Touch
            </h1>
            <p className="text-xs text-slate-400 font-medium max-w-sm leading-relaxed">
              Have questions about bulk safety procurement or system integrations? Drop a line to our deployment center.
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="space-y-3 pt-6 lg:pt-0">
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-purple-600">
                <Mail size={16} />
              </div>
              <div>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest block">Email Us</span>
                <span className="text-xs font-bold text-slate-800">support@luusafety.com</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-purple-600">
                <Phone size={16} />
              </div>
              <div>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest block">Call Center</span>
                <span className="text-xs font-bold text-slate-800">+1 (555) 019-2834</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-purple-600">
                <MapPin size={16} />
              </div>
              <div>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest block">HQ Operations</span>
                <span className="text-xs font-bold text-slate-800">Industrial District, Suite 400</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE FORM ================= */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 animate-bounce">
                <Send size={24} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">Transmission Complete</h3>
              <p className="text-xs text-slate-400 max-w-xs font-medium">
                Your communication file has been logged. An operations specialist will respond shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-[10px] font-bold text-purple-600 uppercase tracking-wider pt-2 hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 placeholder-slate-400/70 focus:outline-none focus:border-purple-400 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 placeholder-slate-400/70 focus:outline-none focus:border-purple-400 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Subject Tiers</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="Bulk Procurement / Technical Inquiry"
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 placeholder-slate-400/70 focus:outline-none focus:border-purple-400 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Analytical Message</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Describe your inquiry requirements explicitly..."
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 placeholder-slate-400/70 focus:outline-none focus:border-purple-400 focus:bg-white transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold uppercase tracking-wider text-xs py-3.5 rounded-xl transition-all shadow-md shadow-purple-600/10 hover:shadow-purple-600/25 active:scale-[0.99] flex items-center justify-center gap-2 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Syncing Connection...</span>
                ) : (
                  <>
                    <Send size={13} />
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

export default AboutScreen;