import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, LogIn, ChevronDown, ShoppingBag, Package } from 'lucide-react';

const Navbar = () => {
  const [isCatOpen, setIsCatOpen] = useState(false);
  const categories = ["Helmets", "Jackets", "Industrial Masks", "Safety Gloves", "Steel Boots", "Full Cover Cloths"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-sans shadow-sm">
      <div className="w-full bg-white border-b border-slate-200 px-6 md:px-16 py-4 flex justify-between items-center">
        
        {/* BRAND */}
        <Link to="/" className="text-2xl font-black text-slate-900 tracking-tighter">
          LUU<span className="text-blue-600">SAFETY</span>
        </Link>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-4 lg:gap-8">
          
          {/* NAVIGATION LINKS */}
          <nav className="hidden lg:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </nav>

          {/* SEARCH BAR */}
          <div className="relative group hidden md:block">
            <input 
              type="text" 
              placeholder="SEARCH PPE..." 
              className="bg-slate-100 border-none rounded-full py-2 px-5 pr-10 text-[9px] font-bold tracking-widest focus:ring-2 focus:ring-blue-600 transition-all w-40 lg:w-56"
            />
            <Search size={14} className="absolute right-4 top-2.5 text-slate-400" />
          </div>

          {/* CATEGORY DROPDOWN */}
          <div className="relative border-l border-slate-200 pl-4 lg:pl-8">
            <button 
              onClick={() => setIsCatOpen(!isCatOpen)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition-all"
            >
              Categories <ChevronDown size={14} className={`transition-transform ${isCatOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCatOpen && (
              <div className="absolute top-full right-0 mt-4 w-64 bg-white border border-slate-100 shadow-2xl py-4 z-50 rounded-b-xl">
                {categories.map((cat) => (
                  <Link 
                    key={cat} 
                    to={`/shop/${cat.toLowerCase().replace(/ /g, '-')}`}
                    className="block px-6 py-3 text-[10px] font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 uppercase tracking-widest"
                    onClick={() => setIsCatOpen(false)}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* USER ACTIONS (Orders, Cart, Login) */}
          <div className="flex gap-4 lg:gap-6 items-center border-l border-slate-200 pl-4 lg:pl-8">
             
             {/* TRACK ORDERS ICON */}
             <Link to="/orders" title="Track Orders" className="text-slate-600 hover:text-blue-600 transition-colors">
                <Package size={20} />
             </Link>

             {/* SHOPPING CART ICON */}
             <Link to="/cart" className="relative text-slate-600 hover:text-blue-600 transition-colors">
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] font-bold px-1 rounded-full">0</span>
             </Link>

             {/* LOGIN BUTTON */}
             <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                <LogIn size={14} /> Login
             </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;