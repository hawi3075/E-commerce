import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, ShoppingCart, Moon, Sun, LogIn, LogOut, User, Menu, X 
} from 'lucide-react';

// Import your custom logo image
import logoImg from './ChatGPT Image Jul 27, 2026, 08_42_30 AM.webp';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Preferences States
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('ETB');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // Cart Items Count State
  const [cartCount, setCartCount] = useState(0);

  // Authentication State
  const rawUserInfo = localStorage.getItem('userInfo');
  const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : null;
  const isLoggedIn = !!userInfo;

  // Sync theme with DOM and localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Sync Cart Count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        try {
          const items = JSON.parse(storedCart);
          const totalQty = items.reduce((acc, item) => acc + (Number(item.qty) || 1), 0);
          setCartCount(totalQty);
        } catch (e) {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, [location]);

  // Handlers
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 h-18 flex items-center justify-between gap-4">
        
        {/* 1. LOGO & WEBSITE NAME */}
        <div className="flex items-center gap-3 min-w-max">
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logoImg} 
              alt="LUU SAFETY Logo" 
              className="h-11 w-11 object-contain rounded-full border border-purple-200 dark:border-purple-800 group-hover:scale-105 transition-transform" 
            />
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
              LUU<span className="text-purple-600">SAFETY</span>
            </span>
          </Link>
        </div>

        {/* 2. NAVIGATION LINKS: Home, Shop, About, Contact */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-black uppercase tracking-wider">
          <Link 
            to="/" 
            className={`transition-colors ${isActive('/') ? 'text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'}`}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className={`transition-colors ${isActive('/shop') ? 'text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'}`}
          >
            Shop
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors ${isActive('/about') ? 'text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'}`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`transition-colors ${isActive('/contact') ? 'text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'}`}
          >
            Contact
          </Link>
        </nav>

        {/* 3. SEARCH BAR */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-sm hidden md:flex items-center">
          <div className="relative w-full flex items-center">
            <Search size={16} className="absolute left-3 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search equipment..." 
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-l-xl py-2 pl-9 pr-3 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-xl text-xs font-bold uppercase transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* RIGHT CONTROLS: Language, Currency, Theme, Auth, Cart */}
        <div className="flex items-center gap-4">
          
          {/* 4. LANGUAGE SELECTOR */}
          <div className="hidden xl:flex items-center">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-[11px] font-bold bg-transparent outline-none cursor-pointer uppercase text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              <option value="English" className="dark:bg-slate-800">English</option>
              <option value="Amharic" className="dark:bg-slate-800">Amharic</option>
              <option value="Afaan Oromo" className="dark:bg-slate-800">Afaan Oromo</option>
            </select>
          </div>

          {/* 5. CURRENCY SELECTOR */}
          <div className="hidden xl:flex items-center border-r border-slate-200 dark:border-slate-700 pr-3">
            <select 
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="text-[11px] font-bold bg-transparent outline-none cursor-pointer uppercase text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400"
            >
              <option value="ETB" className="dark:bg-slate-800">ETB</option>
              <option value="USD" className="dark:bg-slate-800">USD</option>
            </select>
          </div>

          {/* 6. DARK / LIGHT MODE ICON */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>

          {/* 7. SIGN IN / LOGOUT */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/orders" 
                className="flex flex-col items-center gap-0.5 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <User size={18} />
                <span className="text-[9px] font-black uppercase tracking-wider">{userInfo.name || 'Account'}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex flex-col items-center gap-0.5 text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
              >
                <LogOut size={18} />
                <span className="text-[9px] font-black uppercase tracking-wider">Log Out</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/10 active:scale-95"
            >
              <LogIn size={15} />
              <span className="text-[11px] font-black uppercase tracking-wider">Sign In</span>
            </Link>
          )}

          {/* 8. CART ICON */}
          <Link 
            to="/cart" 
            className="flex flex-col items-center gap-0.5 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors relative p-1"
          >
            <ShoppingCart size={20} />
            <span className="text-[9px] font-black uppercase tracking-wider">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center mb-4">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..." 
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-l-xl py-2 px-3 text-xs text-slate-800 dark:text-white"
            />
            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-r-xl text-xs font-bold">
              Go
            </button>
          </form>

          <div className="flex flex-col space-y-3 text-xs font-black uppercase tracking-wider">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-200 hover:text-purple-600">Home</Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-200 hover:text-purple-600">Shop</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-200 hover:text-purple-600">About</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 dark:text-slate-200 hover:text-purple-600">Contact</Link>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="text-xs font-bold bg-transparent text-slate-700 dark:text-slate-200">
              <option value="English">English</option>
              <option value="Amharic">Amharic</option>
              <option value="Afaan Oromo">Afaan Oromo</option>
            </select>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="text-xs font-bold bg-transparent text-slate-700 dark:text-slate-200">
              <option value="ETB">ETB</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;