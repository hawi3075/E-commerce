import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  // Your specific required categories
  const categories = [
    "Helmet", 
    "Jacket", 
    "Mask", 
    "Gloves", 
    "Boots", 
    "Full Cover Cloths"
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-5 flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-black text-slate-900 tracking-tighter">
          DRS<span className="text-blue-600 font-bold">SAFETY</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {categories.map((item) => (
            <Link 
              key={item} 
              to={`/${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-600 hover:text-blue-600 transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-6 text-slate-500">
          <Search size={20} className="hover:text-slate-900 cursor-pointer transition-colors" />
          <User size={20} className="hover:text-slate-900 cursor-pointer transition-colors" />
          <Link 
            to="/login" 
            className="bg-blue-600 text-white px-7 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;