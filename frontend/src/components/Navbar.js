import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, LogIn } from 'lucide-react';

const Navbar = () => {
  const safetyCategories = ["Helmet", "Jacket", "Mask", "Gloves", "Boots", "Full Cover Cloths"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-sans">
      
      {/* --- TOP NAV: LUU SAFETY on Left, Common Links on Right --- */}
      <div className="w-full bg-white border-b border-slate-100 px-6 md:px-16 py-5 flex justify-between items-center shadow-sm">
        
        {/* Brand Name - Top Left */}
        <Link to="/" className="text-xl font-black text-slate-900 tracking-tighter">
          LUU<span className="text-blue-600">SAFETY</span>
        </Link>

        {/* Top Right Links */}
        <div className="flex gap-10 items-center">
          <div className="flex gap-8 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>
          
          <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>

          <div className="flex gap-6 items-center text-[9px] font-bold uppercase tracking-[0.2em]">
            <Link to="/signup" className="text-slate-500 hover:text-blue-600 transition-colors">
              Signup
            </Link>
            <Link to="/login" className="text-blue-600 flex items-center gap-2">
              <LogIn size={12} /> Login
            </Link>
          </div>
        </div>
      </div>

      {/* --- CATEGORY NAV: All Contents moved to the RIGHT --- */}
      <div className="mt-6 px-6 md:px-16 flex justify-end"> {/* justify-end moves everything right */}
        <div className="flex items-center gap-10 bg-transparent py-4">
          
          {/* Category Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {safetyCategories.map((item) => (
              <Link 
                key={item} 
                to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-[10px] font-black uppercase tracking-[0.25em] text-white hover:text-blue-400 transition-all drop-shadow-lg"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* White Search Box */}
          <div className="relative group">
            <input 
              type="text" 
              placeholder="SEARCH..." 
              className="bg-white/10 group-hover:bg-white text-white group-hover:text-slate-900 border border-white/30 rounded-sm py-2 px-4 pr-10 text-[9px] font-bold tracking-widest focus:outline-none focus:bg-white focus:text-slate-900 focus:ring-2 focus:ring-blue-500 transition-all w-48 shadow-lg"
            />
            <Search 
              size={14} 
              className="absolute right-3 top-2.5 text-white group-hover:text-slate-400 pointer-events-none transition-colors" 
            />
          </div>

          <Shield size={20} className="text-blue-500 drop-shadow-lg" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;