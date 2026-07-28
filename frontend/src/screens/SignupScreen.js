import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Lock, ArrowRight, AlertCircle, 
  Eye, EyeOff, CheckCircle2, Loader2 
} from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

import logoImg from '../components/logo.webp';
import luuVideo from '../components/luu.webm';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ✅ Updated to match standard backend auth routes
      const { data } = await axios.post('/api/auth/register', { 
        name, 
        email, 
        password 
      });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      if (login) login(data);
      setIsSuccess(true);
      
      setTimeout(() => {
        if (data.isAdmin || data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/shop');
        }
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden grid grid-cols-1 md:grid-cols-2 font-sans text-slate-800 bg-white">
      
      {/* Left Side: Video Section */}
      <div className="relative hidden md:flex flex-col justify-between p-12 bg-black overflow-hidden h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        >
          <source src={luuVideo} type="video/webm" />
        </video>
        
        <div className="absolute inset-0 bg-black/20 z-0" />
        
        <div className="relative z-10 flex items-center gap-4">
          <img 
            src={logoImg} 
            alt="Logo" 
            className="h-16 lg:h-20 w-auto object-contain drop-shadow-xl" 
          />
          <span className="text-white font-black italic tracking-wider text-2xl lg:text-3xl drop-shadow-lg">
            LUUSAFETY
          </span>
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <h3 className="text-3xl font-black uppercase italic tracking-wider leading-tight drop-shadow-md">
            Safety Equipment & Gear Hub
          </h3>
          <p className="text-sm text-slate-200 mt-2 font-medium tracking-wide drop-shadow-md">
            Join to access operator tools and catalog management.
          </p>
        </div>
      </div>

      {/* Right Side: Form Section */}
      <div className="h-full w-full p-6 sm:p-12 flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-sm">
          
          <div className="flex items-center gap-3 mb-8 md:hidden justify-center">
            <img src={logoImg} alt="Logo" className="h-14 w-auto" />
            <span className="text-slate-900 font-black italic tracking-wider text-xl">LUUSAFETY</span>
          </div>

          {isSuccess ? (
            <div className="py-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mb-4 border border-purple-100">
                <CheckCircle2 size={32} className="text-purple-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase">Deployment Ready</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Operator Registered</p>
              
              <div className="flex items-center gap-2 mt-8 bg-purple-50 px-4 py-2 rounded-xl">
                <Loader2 className="animate-spin text-purple-600" size={14} />
                <p className="text-[10px] text-purple-600 font-black uppercase tracking-wider">Initializing...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">
                  JOIN HUB
                </h1>
                <p className="text-[10px] text-purple-600 font-bold uppercase tracking-[0.15em] mt-0.5">
                  CREATE PERSONNEL ACCOUNT
                </p>
              </div>

              {error && (
                <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 p-3 rounded-xl text-red-600 text-[10px] uppercase font-bold tracking-wider">
                  <AlertCircle size={14} className="shrink-0" /> 
                  <span>{error}</span>
                </div>
              )}

              <form className="space-y-3.5" onSubmit={handleSignup}>
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">FULL NAME</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                    <input 
                      required 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Full Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 text-xs text-slate-900 outline-none focus:border-purple-600 focus:bg-white transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

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

                {/* Security Key */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500">SECURITY KEY (PASSWORD)</label>
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
                      CONFIRM ACCOUNT 
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center border-t border-slate-100 pt-4">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">ALREADY REGISTERED?</p>
                <Link 
                  to="/login" 
                  className="text-purple-600 font-bold text-xs uppercase tracking-wide hover:text-purple-700 mt-1 inline-block"
                >
                  LOGIN TO SECURITY NODE
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default SignupScreen;