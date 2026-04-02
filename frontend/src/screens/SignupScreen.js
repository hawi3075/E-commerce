import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
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
      // Connects to your backend on port 5000
      const { data } = await axios.post('http://localhost:5000/api/users', { name, email, password });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsSuccess(true);
      
      // Automatic redirect after 2 seconds
      setTimeout(() => navigate('/shop'), 2000);

    } catch (err) {
      // This catches the MongoDB crash error
      setError(err.response?.data?.message || 'Database Error: Check your MongoDB Whitelist.');
      setLoading(false);
    }
  };

  const neutralInputStyle = {
    backgroundColor: 'transparent',
    WebkitBoxShadow: '0 0 0px 1000px transparent inset',
    WebkitTextFillColor: 'white',
    transition: 'background-color 5000s ease-in-out 0s',
  };

  return (
    <div className="min-h-screen w-full relative flex items-start justify-center pt-24 pb-12 bg-slate-950 font-sans">
      <div className="absolute inset-0 z-0">
        <img src="https://images.pexels.com/photos/8961555/pexels-photo-8961555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
             className="w-full h-full object-cover brightness-[0.35]" alt="bg" />
      </div>

      <div className="relative z-10 w-full max-w-[380px] mx-6">
        <div className="bg-white/[0.07] backdrop-blur-3xl border border-white/10 p-7 shadow-2xl rounded-xl overflow-hidden">
          
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-[0.2em]">Success!</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Account Created Successfully</p>
              <p className="text-[10px] text-blue-500 mt-4 animate-pulse">Redirecting to Products...</p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-black text-white text-center uppercase tracking-[0.2em] mb-6">Register</h1>

              {error && (
                <div className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/20 p-3 rounded text-red-400 text-[10px] uppercase font-black">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSignup}>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Full Name</label>
                  <div className="relative border-b border-white/10">
                    <User className="absolute left-0 top-2 text-slate-500" size={14} />
                    <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="hawi"
                      className="w-full py-2 pl-7 text-[13px] bg-transparent text-white outline-none focus:border-blue-600 transition-all"
                      style={neutralInputStyle} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address</label>
                  <div className="relative border-b border-white/10">
                    <Mail className="absolute left-0 top-2 text-slate-500" size={14} />
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hs11@gmail.com"
                      className="w-full py-2 pl-7 text-[13px] bg-transparent text-white outline-none focus:border-blue-600 transition-all"
                      style={neutralInputStyle} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Password</label>
                  <div className="relative border-b border-white/10">
                    <Lock className="absolute left-0 top-2 text-slate-500" size={14} />
                    <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                      className="w-full py-2 pl-7 pr-10 text-[13px] bg-transparent text-white outline-none focus:border-blue-600 transition-all"
                      style={neutralInputStyle} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-2 text-slate-500 hover:text-white transition-colors">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 font-black text-[10px] uppercase tracking-[0.3em] mt-4 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-[0.98]">
                  {loading ? 'Registering...' : 'Confirm'} <ArrowRight size={16} />
                </button>
              </form>

              <div className="mt-8 text-center border-t border-white/5 pt-6">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Already have an account?</p>
                <Link to="/login" className="text-blue-500 font-black text-[11px] uppercase border-b border-blue-500 pb-0.5 tracking-tighter">
                    Login Now
                </Link>
              </div>

              {/* BYPASS BUTTON - For testing the product page redirect now */}
              <button 
                onClick={() => { setIsSuccess(true); setTimeout(() => navigate('/shop'), 1500); }}
                className="w-full mt-6 text-[8px] text-slate-600 uppercase font-black hover:text-slate-400 transition-colors"
              >
                Skip to Products (Debug Mode)
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;