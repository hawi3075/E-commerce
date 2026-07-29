import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, ShoppingCart, Moon, Sun, LogIn, LogOut, User, Menu, X, Trash2, Plus, Minus, ArrowRight, CheckSquare, Square 
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
    yourCart: 'Your Cart',
    emptyCart: 'Your cart is empty',
    subtotal: 'Subtotal',
    checkout: 'Proceed to Checkout',
    continueShopping: 'Continue Shopping',
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
    yourCart: 'የእርስዎ ካርት',
    emptyCart: 'ካርትዎ ባዶ ነው',
    subtotal: 'ድምር',
    checkout: 'ወደ ክፍያ ይቀጥሉ',
    continueShopping: 'ግዢን ይቀጥሉ',
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
    yourCart: 'Gaarii Keessan',
    emptyCart: 'Gaariin keessan duwwaadha',
    subtotal: 'Ida’ama',
    checkout: 'Kaffaltii Itti Fufaa',
    continueShopping: 'Gurgurtaa Itti Fufaa',
  },
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart Drawer State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

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

  // Dynamic Auth State
  const [userInfo, setUserInfo] = useState(() => {
    const raw = localStorage.getItem('userInfo');
    return raw ? JSON.parse(raw) : null;
  });

  const isLoggedIn = !!userInfo;

  // Active translation dictionary
  const t = translations[language] || translations.English;

  // Helper to fetch active cart key based on user
  const getCartKey = () => {
    const rawUser = localStorage.getItem('userInfo');
    const currentUser = rawUser ? JSON.parse(rawUser) : {};
    const userId = currentUser._id || currentUser.id || currentUser.email || 'guest';
    return `cartItems_${userId}`;
  };

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

  // Sync Auth State dynamically
  useEffect(() => {
    const syncAuth = () => {
      const raw = localStorage.getItem('userInfo');
      setUserInfo(raw ? JSON.parse(raw) : null);
    };

    window.addEventListener('storage', syncAuth);
    window.addEventListener('userUpdated', syncAuth);

    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('userUpdated', syncAuth);
    };
  }, []);

  // Load and Sync Cart Items & Count
  useEffect(() => {
    const updateCartData = () => {
      const cartKey = getCartKey();
      const storedCart = localStorage.getItem(cartKey);
      if (storedCart) {
        try {
          const items = JSON.parse(storedCart);
          setCartItems(items);
          const totalQty = items.reduce((acc, item) => acc + (Number(item.qty) || 1), 0);
          setCartCount(totalQty);
          
          // Default all items to selected when cart loads/updates if not set yet
          setSelectedItems(prev => {
            const newSelected = { ...prev };
            items.forEach(item => {
              const id = item._id || item.id;
              if (newSelected[id] === undefined) {
                newSelected[id] = true;
              }
            });
            return newSelected;
          });
        } catch (e) {
          setCartItems([]);
          setCartCount(0);
        }
      } else {
        setCartItems([]);
        setCartCount(0);
        setSelectedItems({});
      }
    };

    updateCartData();

    window.addEventListener('storage', updateCartData);
    window.addEventListener('cartUpdated', updateCartData);
    window.addEventListener('userUpdated', updateCartData);

    return () => {
      window.removeEventListener('storage', updateCartData);
      window.removeEventListener('cartUpdated', updateCartData);
      window.removeEventListener('userUpdated', updateCartData);
    };
  }, [location, userInfo]);

  // Save modified cart to storage and dispatch event
  const saveCartChanges = (updatedItems) => {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    const totalQty = updatedItems.reduce((acc, item) => acc + (Number(item.qty) || 1), 0);
    setCartCount(totalQty);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleQtyChange = (id, delta) => {
    const updated = cartItems.map(item => {
      if (item._id === id || item.id === id) {
        const currentQty = Number(item.qty) || 1;
        const newQty = currentQty + delta;
        return { ...item, qty: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    saveCartChanges(updated);
  };

  const handleRemoveItem = (id) => {
    const updated = cartItems.filter(item => item._id !== id && item.id !== id);
    saveCartChanges(updated);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const id = item._id || item.id;
      if (selectedItems[id]) {
        const price = Number(item.price) || 0;
        const qty = Number(item.qty) || 1;
        return acc + (price * qty);
      }
      return acc;
    }, 0).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    // Filter only selected items for checkout
    const itemsToCheckout = cartItems.filter(item => {
      const id = item._id || item.id;
      return selectedItems[id];
    });

    if (itemsToCheckout.length === 0) {
      alert("Please select at least one item to checkout.");
      return;
    }

    // Save selected items to standard keys so CheckoutScreen can pick them up
    localStorage.setItem('cartItems', JSON.stringify(itemsToCheckout));
    localStorage.setItem('cart', JSON.stringify(itemsToCheckout));

    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    window.dispatchEvent(new Event('userUpdated'));
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
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
            <Link to="/" className={`transition-colors ${isActive('/') ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200 hover:text-purple-600'}`}>{t.home}</Link>
            <Link to="/shop" className={`transition-colors ${isActive('/shop') ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200 hover:text-purple-600'}`}>{t.shop}</Link>
            <Link to="/about" className={`transition-colors ${isActive('/about') ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200 hover:text-purple-600'}`}>{t.about}</Link>
            <Link to="/contact" className={`transition-colors ${isActive('/contact') ? 'text-purple-600 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200 hover:text-purple-600'}`}>{t.contact}</Link>
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
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-purple-600/20">
                {t.searchBtn}
              </button>
            </div>
          </form>

          {/* CONTROLS & USER MENU */}
          <div className="flex items-center gap-4">
            
            {/* LANGUAGE SELECTOR */}
            <div className="hidden xl:flex items-center">
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="text-xs font-bold bg-transparent text-slate-800 dark:text-slate-200 outline-none cursor-pointer hover:text-purple-600 py-1">
                <option value="English" className="dark:bg-slate-900">English</option>
                <option value="Amharic" className="dark:bg-slate-900">አማርኛ (Amharic)</option>
                <option value="Afaan Oromo" className="dark:bg-slate-900">Afaan Oromo</option>
              </select>
            </div>

            {/* CURRENCY SELECTOR */}
            <div className="hidden xl:flex items-center border-r border-slate-300 dark:border-slate-700 pr-3">
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="text-xs font-bold bg-transparent text-slate-800 dark:text-slate-200 outline-none cursor-pointer uppercase hover:text-purple-600 py-1">
                <option value="ETB" className="dark:bg-slate-900">ETB</option>
                <option value="USD" className="dark:bg-slate-900">USD</option>
              </select>
            </div>

            {/* DARK / LIGHT TOGGLE */}
            <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle Dark/Light Mode">
              {darkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} />}
            </button>

            {/* DYNAMIC PROFILE REDIRECTION */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" className="flex items-center gap-2 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-900 dark:text-purple-200 px-3 py-1.5 rounded-full transition-all" title="View Profile">
                  <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
                    {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : <User size={14} />}
                  </div>
                  <span className="text-xs font-extrabold hidden sm:inline max-w-[100px] truncate">
                    {userInfo?.name || t.profile}
                  </span>
                </Link>

                <button onClick={handleLogout} className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors" title={t.logout}>
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-purple-600/20 active:scale-95">
                <LogIn size={18} />
                <span className="text-xs font-black uppercase tracking-wider">{t.signIn}</span>
              </Link>
            )}

            {/* CART ICON - OPENS RIGHT SIDE DRAWER */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center text-slate-800 dark:text-slate-200 hover:text-purple-600 transition-colors relative p-1.5 cursor-pointer"
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart size={24} />
              <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">{t.cart}</span>
              
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 font-extrabold shadow-sm animate-pulse">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl" aria-label="Toggle Navigation Menu">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-5 space-y-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center mb-4 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full p-1">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.searchPlaceholder} className="w-full bg-transparent px-3 py-1.5 text-sm text-slate-900 dark:text-white focus:outline-none" />
              <button type="submit" className="bg-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">{t.searchBtn}</button>
            </form>

            <div className="flex flex-col space-y-3 text-sm font-extrabold uppercase tracking-wider">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-slate-800 dark:text-slate-200 hover:text-purple-600">{t.home}</Link>
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="text-slate-800 dark:text-slate-200 hover:text-purple-600">{t.shop}</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-slate-800 dark:text-slate-200 hover:text-purple-600">{t.about}</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-800 dark:text-slate-200 hover:text-purple-600">{t.contact}</Link>
              {isLoggedIn && (
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="text-purple-600 dark:text-purple-400 font-bold">{t.profile}</Link>
              )}
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

      {/* ================= RIGHT SIDE CART DRAWER ================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Overlay */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={20} className="text-purple-600 dark:text-purple-400" />
                  <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                    {t.yourCart} <span className="text-purple-600 dark:text-purple-400">({cartCount})</span>
                  </h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Body / Cart Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                    <div className="w-16 h-16 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center">
                      <ShoppingCart size={32} />
                    </div>
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400">{t.emptyCart}</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); navigate('/shop'); }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                    >
                      {t.continueShopping}
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => {
                    const itemId = item._id || item.id;
                    const itemQty = Number(item.qty) || 1;
                    const itemPrice = Number(item.price) || 0;
                    const isSelected = !!selectedItems[itemId];

                    return (
                      <div key={itemId} className={`flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl transition-all ${isSelected ? 'border-purple-500 shadow-sm' : 'border-slate-200 dark:border-slate-800 opacity-70'}`}>
                        
                        {/* Select Checkbox Icon */}
                        <button 
                          onClick={() => toggleSelectItem(itemId)} 
                          className="text-purple-600 dark:text-purple-400 shrink-0 hover:scale-110 transition-transform"
                          title={isSelected ? "Deselect item" : "Select item"}
                        >
                          {isSelected ? <CheckSquare size={20} /> : <Square size={20} className="text-slate-400" />}
                        </button>

                        <img 
                          src={item.image || logoImg} 
                          alt={item.name} 
                          className="w-14 h-14 object-cover rounded-xl border border-slate-200 dark:border-slate-700 bg-white" 
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">{item.name}</h4>
                          <p className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-0.5">
                            {currency} {itemPrice.toFixed(2)}
                          </p>

                          {/* Quantity Adjuster */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
                              <button 
                                onClick={() => handleQtyChange(itemId, -1)}
                                className="p-1 text-slate-600 dark:text-slate-400 hover:text-purple-600"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-2.5 text-xs font-extrabold text-slate-900 dark:text-white">{itemQty}</span>
                              <button 
                                onClick={() => handleQtyChange(itemId, 1)}
                                className="p-1 text-slate-600 dark:text-slate-400 hover:text-purple-600"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button 
                              onClick={() => handleRemoveItem(itemId)}
                              className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                              title="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer / Subtotal & Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 space-y-4">
                  <div className="flex items-center justify-between text-base font-black text-slate-900 dark:text-white">
                    <span>{t.subtotal}:</span>
                    <span className="text-purple-600 dark:text-purple-400">{currency} {calculateSubtotal()}</span>
                  </div>
                  <button 
                    onClick={handleProceedToCheckout}
                    className="w-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/25"
                  >
                    <span>{t.checkout}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;