import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, ShoppingCart, Moon, Sun, LogIn, LogOut, User, Menu, X 
} from 'lucide-react';

import logoImg from './logo.webp';

// Translation Dictionary
const translations = {
  English: {
    home: 'Home',
    shop: 'Shop',
    about: 'About',
    contact: 'Contact',
    searchPlaceholder: 'Search equipment...',
    searchBtn: 'Search',
    signIn: 'Sign In',
    profile: 'Profile',
    logout: 'Log Out',
    cart: 'Cart',
  },
  Amharic: {
    home: 'መነሻ',
    shop: 'ሱቅ',
    about: 'ስለ እኛ',
    contact: 'ግንኙነት',
    searchPlaceholder: 'እቃዎችን ይፈልጉ...',
    searchBtn: 'ፈልግ',
    signIn: 'ግቡ',
    profile: 'መገለጫ',
    logout: 'ውጡ',
    cart: 'ካርት',
  },
  'Afaan Oromo': {
    home: 'Mana',
    shop: 'Sookii',
    about: 'Sinnisa',
    contact: 'Quunnamtii',
    searchPlaceholder: 'Meeshaalee barbaadi...',
    searchBtn: 'Barbaadi',
    signIn: 'Seeni',
    profile: 'Piroofaayilii',
    logout: "Ba'i",
    cart: 'Gaarii',
  },
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Language & Currency State
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('ETB');

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // Cart Count State
  const [cartCount, setCartCount] = useState(0);

  // Auth State
  const rawUserInfo = localStorage.getItem('userInfo');
  const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : null;
  const isLoggedIn = !!userInfo;

  // Active translation dictionary
  const t = translations[language] || translations.English;

  // Sync Dark Mode state to root <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Sync Cart Count from local storage
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200 font-sans">
      <div className="max-w-[1600px] mx-auto px-5 h-20 flex items-center justify-between gap-6">
        
        {/* LOGO & BRAND NAME */}
        <div className="flex items-center gap-3 min-w-max">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img 
              src={logoImg} 
              alt="LUU SAFETY Logo" 
              className="h-12 w-12 object-contain rounded-full border border-purple-200 dark:border-purple-900 group-hover:scale-105 transition-transform" 
            />
            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              LUU<span className="text-purple-600 dark:text-purple-400">SAFETY</span>
            </span>
          </Link>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="hidden lg:flex items-center gap-8 text-base font-extrabold tracking-wide">
          <Link 
            to="/" 
            className={`transition-colors ${isActive('/') ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200 hover:text-purple-600'}`}
          >
            {t.home}
          </Link>
          <Link 
            to="/shop" 
            className={`transition-colors ${isActive('/shop') ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200 hover:text-purple-600'}`}
          >
            {t.shop}
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors ${isActive('/about') ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200 hover:text-purple-600'}`}
          >
            {t.about}
          </Link>
          <Link 
            to="/contact" 
            className={`transition-colors ${isActive('/contact') ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200 hover:text-purple-600'}`}
          >
            {t.contact}
          </Link>
        </nav>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md hidden md:flex items-center">
          <div className="relative w-full flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full p-1 shadow-inner focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
            <Search size={18} className="ml-3.5 text-slate-400 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder} 
              className="w-full bg-transparent px-3 py-1.5 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            <button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-purple-600/20"
            >
              {t.searchBtn}
            </button>
          </div>
        </form>

        {/* CONTROLS & USER MENU */}
        <div className="flex items-center gap-4">
          
          {/* LANGUAGE SELECTOR */}
          <div className="hidden xl:flex items-center">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-xs font-bold bg-transparent text-slate-800 dark:text-slate-200 outline-none cursor-pointer hover:text-purple-600 py-1"
            >
              <option value="English" className="dark:bg-slate-900">English</option>
              <option value="Amharic" className="dark:bg-slate-900">አማርኛ (Amharic)</option>
              <option value="Afaan Oromo" className="dark:bg-slate-900">Afaan Oromo</option>
            </select>
          </div>

          {/* CURRENCY SELECTOR */}
          <div className="hidden xl:flex items-center border-r border-slate-300 dark:border-slate-700 pr-3">
            <select 
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="text-xs font-bold bg-transparent text-slate-800 dark:text-slate-200 outline-none cursor-pointer uppercase hover:text-purple-600 py-1"
            >
              <option value="ETB" className="dark:bg-slate-900">ETB</option>
              <option value="USD" className="dark:bg-slate-900">USD</option>
            </select>
          </div>

          {/* DARK / LIGHT TOGGLE */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Dark/Light Mode"
          >
            {darkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} />}
          </button>

          {/* DYNAMIC PROFILE / SIGN IN ICON */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/profile" 
                className="flex items-center gap-2 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-900 dark:text-purple-200 px-3 py-1.5 rounded-full transition-all"
                title="View Profile"
              >
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
                  {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : <User size={14} />}
                </div>
                <span className="text-xs font-extrabold hidden sm:inline max-w-[100px] truncate">
                  {userInfo?.name || t.profile}
                </span>
              </Link>

              <button 
                onClick={handleLogout}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title={t.logout}
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-purple-600/20 active:scale-95"
            >
              <LogIn size={18} />
              <span className="text-xs font-black uppercase tracking-wider">{t.signIn}</span>
            </Link>
          )}

          {/* CART ICON */}
          <Link 
            to="/cart" 
            className="flex flex-col items-center text-slate-800 dark:text-slate-200 hover:text-purple-600 transition-colors relative p-1"
          >
            <ShoppingCart size={22} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{t.cart}</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 font-extrabold animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* MOBILE MENU TOGGLE */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-5 space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center mb-4 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full p-1">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder} 
              className="w-full bg-transparent px-3 py-1.5 text-sm text-slate-900 dark:text-white focus:outline-none"
            />
            <button type="submit" className="bg-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">
              {t.searchBtn}
            </button>
          </form>

          <div className="flex flex-col space-y-3 text-sm font-extrabold uppercase tracking-wider">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-slate-800 dark:text-slate-200 hover:text-purple-600">{t.home}</Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="text-slate-800 dark:text-slate-200 hover:text-purple-600">{t.shop}</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-slate-800 dark:text-slate-200 hover:text-purple-600">{t.about}</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-800 dark:text-slate-200 hover:text-purple-600">{t.contact}</Link>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="text-xs font-bold bg-transparent text-slate-800 dark:text-slate-200">
              <option value="English" className="dark:bg-slate-900">English</option>
              <option value="Amharic" className="dark:bg-slate-900">አማርኛ</option>
              <option value="Afaan Oromo" className="dark:bg-slate-900">Afaan Oromo</option>
            </select>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="text-xs font-bold bg-transparent text-slate-800 dark:text-slate-200">
              <option value="ETB" className="dark:bg-slate-900">ETB</option>
              <option value="USD" className="dark:bg-slate-900">USD</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;