import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, Lock, ArrowRight, AlertCircle, 
  Eye, EyeOff, CheckCircle2, Loader2, Shield 
} from 'lucide-react';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Direct integration with your backend auth infrastructure
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsSuccess(true);
      
      setTimeout(() => navigate('/shop'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Check your security credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center py-12 bg-slate-50 font-sans overflow-hidden antialiased text-slate-600">
      
      {/* Background Fluid Graphic Accents */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-200 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-[420px] mx-6">
        
        {/* Top Branding Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-purple-600 p-3 rounded-2xl mb-3 shadow-lg shadow-purple-600/10">
            <Shield size={24} className="text-white" />
          </div>
          <h2 className="text-lg font-black italic text-slate-900 uppercase tracking-tight">
            Luu<span className="text-purple-600">Safety.</span>
          </h2>
        </div>

        {/* Premium Light Interface Card */}
        <div className="bg-white border border-slate-100 p-8 md:p-10 shadow-xl rounded-[2.5rem] transition-all">
          
          {isSuccess ? (
            /* Success Authentication Interstitial */
            <div className="py-10 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-purple-50 border border-purple-100 rounded-full flex items-center justify-center mb-5">
                <CheckCircle2 size={36} className="text-purple-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-wider">Access Granted</h2>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Credentials Verified Successfully</p>
              
              <div className="flex items-center gap-2 mt-8 bg-purple-50 border border-purple-100/60 px-4 py-2 rounded-xl">
                <Loader2 className="animate-spin text-purple-600" size={14} />
                <p className="text-[9px] text-purple-600 font-black uppercase tracking-wider">Connecting to Security Node...</p>
              </div>
            </div>
          ) : (
            /* Main Login Controls */
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight italic">
                  Login Hub
                </h1>
                <p className="text-[8px] text-purple-600 font-bold uppercase tracking-[0.25em] mt-1">
                  Authenticate Node Personnel
                </p>
              </div>

              {error && (
                <div className="mb-6 flex items-center gap-2.5 bg-red-50 border border-red-100 p-3.5 rounded-xl text-red-600 text-[9px] uppercase font-bold tracking-wider">
                  <AlertCircle size={14} className="shrink-0" /> 
                  <span>{error}</span>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleLogin}>
                
                {/* Email Address Input */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400 ml-0.5">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" size={16} />
                    <input 
                      required 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="operator@luusafety.com"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-11 pr-4 text-xs font-medium text-slate-800 outline-none focus:border-purple-200 focus:bg-white transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-0.5">
                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Security Key</label>
                    <Link to="/forgot-password" className="text-[9px] font-bold text-slate-400 hover:text-purple-600 tracking-wide uppercase transition-colors">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" size={16} />
                    <input 
                      required 
                      type={showPassword ? "text" : "password"} 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="••••••••••••"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-11 pr-11 text-xs font-medium text-slate-800 outline-none focus:border-purple-200 focus:bg-white transition-all placeholder:text-slate-400"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit Action */}
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-purple-600/10 disabled:opacity-50 group active:scale-[0.99]"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      Enter Security Node 
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              
              <div className="mt-8 text-center border-t border-slate-100 pt-6">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">New operative?</p>
                <Link 
                  to="/signup" 
                  className="inline-block mt-1.5 text-purple-600 font-bold text-[10px] uppercase tracking-wide hover:text-purple-700 transition-colors underline underline-offset-4 decoration-purple-600/20"
                >
                  Create Personnel Account
                </Link>
              </div>
            </>
          )}
        </div>
        
        <p className="text-center mt-6 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
          © 2026 Luu Safety Systems
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;