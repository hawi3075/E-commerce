import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, Search, Bell, Calendar,  } from 'lucide-react';

// Import your Screens (Make sure these files exist in src/screens/)
import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import CartScreen from './screens/CartScreen';
 // You can create this next

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-slate-900">
        
        {/* --- MAIN TOP HEADER --- */}
        <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100 px-6 md:px-16 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter">
            trendhub<span className="text-gray-300">.co</span>
          </Link>

          {/* Search Bar - Center */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-12">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search product in Trendhub" 
                className="w-full bg-gray-50 border border-gray-100 rounded-full py-2.5 px-12 focus:outline-none focus:ring-2 focus:ring-blue-500/10 text-sm"
              />
              <Search className="absolute left-4 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          {/* Right Icons & Auth */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-5 text-sm font-semibold text-gray-500">
               <Bell size={20} className="cursor-pointer hover:text-blue-600" />
               <Link to="/about" className="hover:text-blue-600">About</Link>
               <Link to="/help" className="hover:text-blue-600">Help</Link>
               <Link to="/contact" className="hover:text-blue-600">Contact</Link>
               <Calendar size={20} className="cursor-pointer hover:text-blue-600" />
            </div>
            
            <Link to="/login" className="bg-blue-600 text-white px-7 py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Login
            </Link>
          </div>
        </header>

        {/* --- CATEGORY BAR (Below Header) --- */}
        <nav className="fixed top-[64px] left-0 right-0 bg-white z-40 border-b border-gray-50 px-6 md:px-16 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-8">
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-400 hover:bg-gray-50 transition-colors">All Categories</button>
              <button className="px-4 py-1.5 rounded-full bg-blue-600 text-xs font-bold text-white shadow-md shadow-blue-100">All Discount</button>
            </div>
            
            <div className="flex items-center gap-8 text-xs font-bold text-gray-500 whitespace-nowrap uppercase tracking-wider">
              <Link to="/electronics" className="hover:text-blue-600">Electronics</Link>
              <Link to="/fashion" className="hover:text-blue-600">Fashion</Link>
              <Link to="/grocery" className="hover:text-blue-600">Grocery</Link>
              <Link to="/sports" className="hover:text-blue-600">Sports</Link>
              <Link to="/school" className="hover:text-blue-600">School Supplies</Link>
              <Link to="/toys" className="hover:text-blue-600">Toys</Link>
              <Link to="/books" className="hover:text-blue-600">Book</Link>
            </div>
          </div>
        </nav>

        {/* --- MAIN PAGE CONTENT --- */}
        <main className="pt-32 pb-10">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/shop" element={<ShopScreen />} />
            <Route path="/cart" element={<CartScreen />} />

          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;