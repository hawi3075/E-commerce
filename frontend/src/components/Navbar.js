import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User, ShoppingCart, Moon, ShieldCheck, LogIn } from 'lucide-react';

const Navbar = () => {
  // Mock state for user authentication - change this based on your auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* LOGO SECTION - LUU SAFETY Branding */}
        <div className="flex items-center gap-2 min-w-max">
          <div className="bg-purple-100 p-1.5 rounded-lg">
            <ShieldCheck size={22} className="text-purple-600" />
          </div>
          <Link to="/" className="text-xl font-black text-slate-900 tracking-tighter">
            LUU<span className="text-purple-600">SAFETY</span>
          </Link>
        </div>

        {/* MAIN NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-bold uppercase tracking-tight text-slate-500">
          <Link to="/" className="text-purple-600">Home</Link>
          <Link to="/shop" className="hover:text-purple-600 transition-colors">Shop</Link>
          <Link to="/about" className="hover:text-purple-600 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-purple-600 transition-colors">Contact</Link>
        </nav>

        {/* SEARCH BAR - Purple Style */}
        <div className="flex-1 max-w-md hidden md:flex items-center">
          <div className="relative w-full flex items-center">
            <Search size={16} className="absolute left-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search equipment..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-l-md py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <button className="bg-purple-700 text-white px-5 py-1.5 rounded-r-md text-sm font-bold hover:bg-purple-800 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* SETTINGS & ACTIONS */}
        <div className="flex items-center gap-4">
          
          {/* LOCALE SELECTORS */}
          <div className="hidden xl:flex items-center gap-3 border-r border-slate-200 pr-4">
            <select className="text-[11px] font-bold bg-transparent outline-none cursor-pointer uppercase">
              <option>English</option>
              <option>Amharic</option>
            </select>
            <select className="text-[11px] font-bold bg-transparent outline-none cursor-pointer uppercase">
              <option>USD</option>
              <option>ETB</option>
            </select>
            <button className="text-slate-500 hover:text-purple-600">
              <Moon size={18} />
            </button>
          </div>

          {/* DYNAMIC AUTH BUTTON (The part from your screenshot) */}
          <div className="flex items-center gap-5">
            <button className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-purple-600 transition-colors">
              <Bell size={20} />
              <span className="text-[9px] font-black uppercase tracking-widest">Alerts</span>
            </button>
            
            {isLoggedIn ? (
              /* If User is Logged In -> Show Account */
              <Link to="/profile" className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-purple-600 transition-colors">
                <User size={20} />
                <span className="text-[9px] font-black uppercase tracking-widest">Account</span>
              </Link>
            ) : (
              /* If User is Logged Out -> Show Sign In (Efoy Style) */
              <Link to="/login" className="bg-purple-700 text-white px-5 py-2 rounded-md flex items-center gap-2 hover:bg-purple-800 transition-all shadow-sm">
                <LogIn size={16} />
                <span className="text-[11px] font-bold uppercase">Sign In</span>
              </Link>
            )}

            <Link to="/checkout" className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-purple-600 transition-colors relative">
              <ShoppingCart size={20} />
              <span className="text-[9px] font-black uppercase tracking-widest">Cart</span>
              <span className="absolute -top-1 right-0 bg-purple-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                0
              </span>
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;