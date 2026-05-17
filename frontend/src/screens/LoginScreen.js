import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ChevronLeft, AlertCircle, Loader2, Shield } from 'lucide-react';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Adjusted to use local environment variables or your standard 5000 port
      const { data } = await axios.post('http://localhost:5000/api/users/login', { 
        email, 
        password 
      });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/shop');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid Email or Password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center py-12 overflow-hidden bg-slate-950 font-sans">
      {/* Background Image with stronger industrial feel */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd" 
          alt="Industrial Background" 
          className="w-full h-full object-cover brightness-[0.2] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-slate-950/80"></div>
      </div>

      <div className="relative z-10 w-full max-w-[420px] mx-6">
        {/* Top Branding */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-purple-600 p-3 rounded-2xl mb-4 shadow-2xl shadow-purple-600/30">
            <Shield size={28} className="text-white" />
          </div>
          <h2 className="text-xl font-black italic text-white uppercase tracking-tighter">
            Luu<span className="text-purple-600">Safety.</span>
          </h2>
        </div>

        {/* Login Card with Deep Glassmorphism */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 md:p-10 shadow-3xl rounded-[2.5rem]">
          
          <Link to="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[3px] text-slate-500 hover:text-purple-500 transition-all mb-8">
            <ChevronLeft size={14} /> Back to Hub
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">
              Authentication
            </h1>
            <p className="text-[10px] text-purple-500 font-black uppercase tracking-[0.3em] mt-3 ml-1">
              Secure Access Node
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-red-400 text-[10px] uppercase font-black tracking-widest">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form className="space-y-7" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Operator ID (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@luusafety.com"
                  className="w-full bg-white/[0.05] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-purple-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Security Key</label>
                <Link to="/forgot-password" size={14} className="text-[9px] font-black text-slate-600 hover:text-purple-500 uppercase tracking-widest transition-colors">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/[0.05] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-purple-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-slate-700"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 mt-4 shadow-2xl shadow-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} /> 
              ) : (
                <>Authorize <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-10 text-center border-t border-white/5 pt-8">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
              New Personnel? 
              <Link to="/signup" className="text-purple-500 ml-3 hover:text-purple-400 transition-colors underline decoration-purple-500/30 underline-offset-4">Join Hub</Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center mt-8 text-[9px] font-black text-slate-700 uppercase tracking-[5px]">
          © 2026 Luu Safety Systems
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;