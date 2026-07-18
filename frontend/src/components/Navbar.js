import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, User, ShoppingCart, Moon, ShieldCheck, LogIn, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamically check if the user is authenticated from local storage
  const userInfo = localStorage.getItem('userInfo');
  const isLoggedIn = !!userInfo;

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // Helper to check if a navigation route is currently active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* LUU SAFETY Branding */}
        <div className="flex items-center gap-2 min-w-max">
          <div className="bg-purple-100 p-1.5 rounded-lg">
            <ShieldCheck size={22} className="text-purple-600" />
          </div>
          <Link to="/" className="text-xl font-black text-slate-900 tracking-tighter">
            LUU<span className="text-purple-600">SAFETY</span>
          </Link>
        </div>

        {/* Navigation Links - Updated Paths */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-bold uppercase tracking-tight">
          <Link 
            to="/" 
            className={`transition-colors ${isActive('/') ? 'text-purple-600' : 'text-slate-500 hover:text-purple-600'}`}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className={`transition-colors ${isActive('/shop') ? 'text-purple-600' : 'text-slate-500 hover:text-purple-600'}`}
          >
            Shop
          </Link>
          <Link 
            to="/contact" 
            className={`transition-colors ${isActive('/contact') ? 'text-purple-600' : 'text-slate-500 hover:text-purple-600'}`}
          >
            Contact
          </Link>
        </nav>

        {/* Search Bar */}
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

        {/* Settings & Dynamic Actions */}
        <div className="flex items-center gap-4">
          
          {/* Locale Selectors */}
          <div className="hidden xl:flex items-center gap-3 border-r border-slate-200 pr-4">
            <select className="text-[11px] font-bold bg-transparent outline-none cursor-pointer uppercase text-slate-600">
              <option>English</option>
              <option>Amharic</option>
              <option>Afan Oromo</option>
            </select>
            <select className="text-[11px] font-bold bg-transparent outline-none cursor-pointer uppercase text-slate-600">
              <option>USD</option>
              <option>ETB</option>
              <option>EUR</option>
            </select>
            <button className="text-slate-500 hover:text-purple-600 transition-colors">
              <Moon size={18} />
            </button>
          </div>

          <div className="flex items-center gap-5">
            <button className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-purple-600 transition-colors">
              <Bell size={20} />
              <span className="text-[9px] font-black uppercase tracking-widest">Alerts</span>
            </button>
            
            {/* Dynamic Auth Section */}
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/orders" className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-purple-600 transition-colors">
                  <User size={20} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Orders</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-red-600 transition-colors"
                >
                  <LogOut size={20} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Log Out</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-purple-700 text-white px-5 py-2 rounded-md flex items-center gap-2 hover:bg-purple-800 transition-all shadow-sm">
                <LogIn size={16} />
                <span className="text-[11px] font-bold uppercase">Sign In</span>
              </Link>
            )}

            {/* Cart Link */}
            <Link to="/checkout" className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-purple-600 transition-colors relative">
              <ShoppingCart size={20} />
              <span className="text-[9px] font-black uppercase tracking-widest">Cart</span>
              <span className="absolute -top-1 right-0 bg-purple-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white font-bold">
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