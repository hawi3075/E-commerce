import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, Lock, ArrowRight, AlertCircle, 
  Eye, EyeOff, CheckCircle2, Loader2 
} from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

import logoImg from '../components/logo.webp';
import luuVideo from '../components/luu.webm';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      if (login) login(data);
      
      setIsSuccess(true);

      const isAdminUser = data.isAdmin === true || data.role === 'admin';

      setTimeout(() => {
        if (isAdminUser) {
          navigate('/admin/upload');
        } else {
          navigate('/shop');
        }
      }, 1000);

    } catch (err) {
      console.error('Login Error:', err);
      setError(
        err.response?.data?.message || 
        'Authentication failed. Check your security credentials or server status.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden grid grid-cols-1 md:grid-cols-2 font-sans text-slate-800 bg-white">
      
      {/* Left Side: Full Height Video Section */}
      <div className="relative hidden md:flex flex-col justify-between p-10 bg-black overflow-hidden h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        >
          <source src={luuVideo} type="video/webm" />
        </video>
        
        {/* Dark subtle overlay for contrast */}
        <div className="absolute inset-0 bg-black/20 z-0" />
        
        <div className="relative z-10 flex items-center gap-2.5">
          <img src={logoImg} alt="Logo" className="h-9 w-auto drop-shadow-md" />
          <span className="text-white font-black italic tracking-wider text-base drop-shadow-md">LUUSAFETY</span>
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <h3 className="text-2xl font-black uppercase italic tracking-wider leading-tight drop-shadow-md">
            Safety Equipment & Gear Hub
          </h3>
          <p className="text-xs text-slate-200 mt-1.5 font-medium tracking-wide drop-shadow-md">
            Authenticate to access your personnel dashboard.
          </p>
        </div>
      </div>

      {/* Right Side: Full Height Form Section */}
      <div className="h-full w-full p-6 sm:p-12 flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-sm">
          
          {/* Logo header for small screens */}
          <div className="flex items-center gap-2 mb-6 md:hidden">
            <img src={logoImg} alt="Logo" className="h-8 w-auto" />
            <span className="text-slate-900 font-black italic tracking-wider text-sm">LUUSAFETY</span>
          </div>

          {isSuccess ? (
            <div className="py-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mb-4 border border-purple-100">
                <CheckCircle2 size={32} className="text-purple-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase">Access Granted</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Credentials Verified</p>
              
              <div className="flex items-center gap-2 mt-8 bg-purple-50 px-4 py-2 rounded-xl">
                <Loader2 className="animate-spin text-purple-600" size={14} />
                <p className="text-[10px] text-purple-600 font-black uppercase tracking-wider">Connecting...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">
                  LOGIN HUB
                </h1>
                <p className="text-[10px] text-purple-600 font-bold uppercase tracking-[0.15em] mt-0.5">
                  AUTHENTICATE PERSONNEL
                </p>
              </div>

              {error && (
                <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 p-3 rounded-xl text-red-600 text-[10px] uppercase font-bold tracking-wider">
                  <AlertCircle size={14} className="shrink-0" /> 
                  <span>{error}</span>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleLogin}>
                
                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">EMAIL ADDRESS</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                    <input 
                      required 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="operator@luusafety.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 text-xs text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">SECURITY KEY</label>
                    <Link to="/forgot-password" className="text-[9px] font-bold text-slate-400 hover:text-purple-600 uppercase">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                    <input 
                      required 
                      type={showPassword ? "text" : "password"} 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="••••••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-10 text-xs text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition-all placeholder:text-slate-400"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 mt-2 shadow-md shadow-purple-600/20 disabled:opacity-50 active:scale-[0.99]"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={15} />
                  ) : (
                    <>
                      ENTER SECURITY NODE 
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center border-t border-slate-100 pt-4">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">NEW OPERATIVE?</p>
                <Link 
                  to="/signup" 
                  className="text-purple-600 font-bold text-xs uppercase tracking-wide hover:text-purple-700 mt-1 inline-block"
                >
                  CREATE PERSONNEL ACCOUNT
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default LoginScreen;