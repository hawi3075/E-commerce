import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck } from 'lucide-react';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import CartScreen from './screens/CartScreen';
import AdminScreen from './screens/AdminScreen';

// Import Components
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] font-sans text-[#0f172a]">
        
        {/* Top Header Section - Based on Sentinel Archive Sample */}
        <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-1.5 h-7 bg-[#facc15]"></div>
            <span className="font-black uppercase tracking-tighter text-2xl">
              Sentinel Archive
            </span>
          </Link>
          
          <div className="flex items-center gap-5">
            <Link to="/admin" className="text-gray-400 hover:text-[#0f172a] transition-colors">
              <ShieldCheck size={22} />
            </Link>
            <Link to="/cart" className="relative text-[#0f172a]">
              <ShoppingBag size={24} />
              <span className="absolute -top-2 -right-2 bg-[#facc15] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                0
              </span>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="pt-20 pb-24">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/shop" element={<ShopScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/admin" element={<AdminScreen />} />
          </Routes>
        </main>

        {/* Fixed Bottom Navigation */}
        <Navbar />
        
      </div>
    </Router>
  );
}

export default App;