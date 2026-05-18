import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Lock, ArrowRight, AlertCircle, 
  Eye, EyeOff, CheckCircle2, Loader2, Shield 
} from 'lucide-react';
import axios from 'axios';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/users', { name, email, password });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsSuccess(true);
      
      setTimeout(() => navigate('/shop'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center py-12 bg-slate-950 font-sans overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd" 
          className="w-full h-full object-cover brightness-[0.2] grayscale" 
          alt="bg" 
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

        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 md:p-10 shadow-3xl rounded-[2.5rem] overflow-hidden">
          
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={48} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em]">Deployment Ready</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Operator Registered Successfully</p>
              <div className="flex items-center gap-3 mt-8">
                <Loader2 className="animate-spin text-purple-500" size={16} />
                <p className="text-[10px] text-purple-500 font-black uppercase tracking-widest">Initializing Shop Interface...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">
                  Join Hub
                </h1>
                <p className="text-[10px] text-purple-500 font-black uppercase tracking-[0.3em] mt-3 ml-1">
                  Create Personnel Account
                </p>
              </div>

              {error && (
                <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-red-400 text-[10px] uppercase font-black tracking-widest">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSignup}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                    <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name"
                      className="w-full bg-white/[0.05] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-purple-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="operator@luusafety.com"
                      className="w-full bg-white/[0.05] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-purple-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Security Key (Password)</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors" size={18} />
                    <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••"
                      className="w-full bg-white/[0.05] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-purple-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-slate-700"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-purple-500 transition-colors">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 mt-4 shadow-2xl shadow-purple-600/30 disabled:opacity-50 group">
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <>Confirm Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                </button>
              </form>

              <div className="mt-10 text-center border-t border-white/5 pt-8">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Already Registered?</p>
                <Link to="/login" className="inline-block mt-2 text-purple-500 font-black text-[11px] uppercase tracking-widest hover:text-purple-400 transition-colors underline underline-offset-8 decoration-purple-500/30">
                    Login to Security Node
                </Link>
              </div>
            </>
          )}
        </div>
        <p className="text-center mt-8 text-[9px] font-black text-slate-700 uppercase tracking-[5px]">
          © 2026 Luu Safety Systems
        </p>
      </div>
    </div>
  );
};

export default SignupScreen;