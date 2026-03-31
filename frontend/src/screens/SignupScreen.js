import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ShieldCheck } from 'lucide-react';

const SignupScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pt-20">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 text-sm mt-2 font-medium">Join Drs Safety Cloth today</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="password" 
                placeholder="Create password"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg mt-4 flex items-center justify-center gap-2">
            <ShieldCheck size={18} /> Create Account
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500 font-medium">
          Already a member? 
          <Link to="/login" className="text-blue-600 font-bold ml-1 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupScreen;