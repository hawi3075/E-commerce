import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ChevronLeft, AlertCircle } from 'lucide-react';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen w-full relative flex items-start justify-center pt-28 pb-12 overflow-hidden bg-slate-950 font-sans">
      
      {/* 1. BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/8961555/pexels-photo-8961555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Industrial Background" 
          className="w-full h-full object-cover brightness-[0.4] grayscale-[10%]"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* 2. NEUTRAL LOGIN BOX */}
      <div className="relative z-10 w-full max-w-[380px] mx-6">
        <div className="bg-white/[0.07] backdrop-blur-3xl border border-white/10 p-6 md:p-8 shadow-2xl rounded-xl">
          
          <Link to="/" className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-500 transition-colors mb-4">
            <ChevronLeft size={12} /> Home
          </Link>

          <div className="mb-6 text-center">
            <h1 className="text-2xl font-black text-white uppercase tracking-[0.2em] leading-none">Login</h1>
            <div className="w-8 h-1 bg-blue-600 mt-2 mx-auto"></div>
            <p className="text-[8px] text-blue-500 font-black uppercase tracking-[0.15em] mt-3">Welcome Back</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* EMAIL - Background and Shadow Removed */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-0 top-2 text-slate-500" size={14} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full border-b border-white/10 py-2 pl-7 text-[13px] font-normal lowercase outline-none focus:border-blue-500 transition-all placeholder:text-slate-700 bg-transparent text-white autofill:bg-transparent"
                  style={{ 
                    backgroundColor: 'transparent',
                    WebkitBoxShadow: '0 0 0px 1000px transparent inset',
                    WebkitTextFillColor: 'white',
                    transition: 'background-color 5000s ease-in-out 0s'
                  }}
                />
              </div>
            </div>

            {/* PASSWORD - Background and Shadow Removed */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Password</label>
                <Link to="/forgot-password" size={14} className="text-[8px] font-bold text-slate-500 hover:text-blue-500 uppercase tracking-widest">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-0 top-2 text-slate-500" size={14} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-b border-white/10 py-2 pl-7 text-[13px] font-normal outline-none focus:border-blue-500 transition-all placeholder:text-slate-700 bg-transparent text-white autofill:bg-transparent"
                  style={{ 
                    backgroundColor: 'transparent',
                    WebkitBoxShadow: '0 0 0px 1000px transparent inset',
                    WebkitTextFillColor: 'white',
                    transition: 'background-color 5000s ease-in-out 0s'
                  }}
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-4 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-700 transition-all flex items-center justify-center gap-3 mt-4 shadow-xl">
              Enter <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
              New to LUU? 
              <Link to="/signup" className="text-blue-500 ml-2 font-black border-b border-blue-500 pb-0.5">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;