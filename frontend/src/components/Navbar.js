import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User, ShoppingCart, Moon, Store } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* LOGO SECTION */}
        <div className="flex items-center gap-2 min-w-max">
          <div className="bg-emerald-100 p-1.5 rounded-lg">
            <Store size={22} className="text-emerald-600" />
          </div>
          <Link to="/" className="text-xl font-bold text-slate-900 tracking-tight">
            Efoy Gebeya
          </Link>
        </div>

        {/* MAIN NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/" className="text-emerald-600 font-semibold">Home</Link>
          <Link to="/shop" className="hover:text-emerald-600 transition-colors">Shop</Link>
          <Link to="/about" className="hover:text-emerald-600 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
        </nav>

        {/* SEARCH BAR - SCREENSHOT STYLE */}
        <div className="flex-1 max-w-md hidden md:flex items-center">
          <div className="relative w-full flex items-center">
            <Search size={16} className="absolute left-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-l-md py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button className="bg-emerald-700 text-white px-4 py-1.5 rounded-r-md text-sm font-medium hover:bg-emerald-800 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* SETTINGS & ACTIONS */}
        <div className="flex items-center gap-4">
          
          {/* LOCALE SELECTORS */}
          <div className="hidden xl:flex items-center gap-3 border-r border-slate-200 pr-4">
            <select className="text-xs font-semibold bg-transparent outline-none cursor-pointer">
              <option>English</option>
            </select>
            <select className="text-xs font-semibold bg-transparent outline-none cursor-pointer">
              <option>USD</option>
            </select>
            <button className="text-slate-500 hover:text-emerald-600">
              <Moon size={18} />
            </button>
          </div>

          {/* ADMIN TAG */}
          <div className="hidden sm:block">
            <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
              Super Admin
            </span>
          </div>

          {/* ICON ACTIONS */}
          <div className="flex items-center gap-5">
            <button className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-emerald-600 transition-colors">
              <Bell size={20} />
              <span className="text-[10px] font-bold uppercase">Alerts</span>
            </button>
            
            <Link to="/login" className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-emerald-600 transition-colors">
              <User size={20} />
              <span className="text-[10px] font-bold uppercase">Account</span>
            </Link>

            <Link to="/checkout" className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-emerald-600 transition-colors relative">
              <ShoppingCart size={20} />
              <span className="text-[10px] font-bold uppercase">Cart</span>
              <span className="absolute -top-1 right-0 bg-emerald-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
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