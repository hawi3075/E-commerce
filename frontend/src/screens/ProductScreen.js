import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Zap, Star, ShoppingCart, Search, 
  ChevronDown, MapPin, Phone, Mail, LayoutGrid,
  Filter, ArrowUpDown
} from 'lucide-react';

const LuuSafetyShop = () => {
  const [activeCategory, setActiveCategory] = useState('All Products');

  const categories = [
    { name: 'ALL PRODUCTS', count: 34, icon: <LayoutGrid size={14} /> },
    { name: 'PROTECTIVE GEAR', count: 12 },
    { name: 'FOOTWEAR', count: 8 },
    { name: 'HEAD PROTECTION', count: 6 },
    { name: 'HI-VIS CLOTHING', count: 5 },
    { name: 'ACCESSORIES', count: 3 },
  ];

  const products = [
    { id: 1, name: 'Industrial Hard Hat', price: 25.00, rating: 5.0, stock: 18, image: 'https://images.unsplash.com/photo-1584285418504-0051b6d51f6e' },
    { id: 2, name: 'High-Vis Safety Vest', price: 12.99, rating: 4.9, stock: 46, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3' },
    { id: 3, name: 'Steel Toe Work Boots', price: 85.00, rating: 4.8, stock: 12, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
    { id: 4, name: 'Anti-Fog Goggles', price: 15.00, rating: 4.7, stock: 51, image: 'https://images.unsplash.com/photo-1599493758264-36cc4247f820' },
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans antialiased text-slate-900">
      
      {/* --- MINIMIZED HEADER (As requested previously) --- */}
      <header className="bg-white/90 backdrop-blur-md py-2 border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-1.5">
            <div className="bg-purple-600 p-1 rounded-md text-white"><Shield size={14} /></div>
            <span className="text-base font-black italic tracking-tighter uppercase">Luu<span className="text-purple-600">Safety</span></span>
          </Link>
          <nav className="hidden lg:flex items-center gap-5 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <Link to="/" className="hover:text-purple-600">Home</Link>
            <Link to="/shop" className="text-purple-600 border-b border-purple-600">Shop</Link>
            <Link to="/about" className="hover:text-purple-600">About</Link>
          </nav>
          <div className="flex-1 max-w-sm hidden md:flex items-center relative">
            <input type="text" placeholder="Search safety gear..." className="w-full bg-slate-50 border border-slate-100 rounded-full py-1.5 px-4 text-[11px] outline-none" />
            <button className="absolute right-1 p-1.5 bg-purple-600 rounded-full text-white"><Search size={10} /></button>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-[2px]">
              <span className="flex items-center gap-1">English <ChevronDown size={8} /></span>
              <span className="flex items-center gap-1">USD <ChevronDown size={8} /></span>
            </div>
            <button className="relative"><ShoppingCart size={16} /><span className="absolute -top-1 -right-1 bg-slate-900 text-[7px] text-white w-3 h-3 rounded-full flex items-center justify-center font-bold">0</span></button>
          </div>
        </div>
      </header>

      {/* --- SHOP HERO (From image_1eff56.jpg) --- */}
      <section className="bg-white pt-16 pb-12 border-b border-slate-50">
        <div className="max-w-[1440px] mx-auto px-6">
          <h1 className="text-5xl font-black mb-3 tracking-tighter">Shop Collection</h1>
          <p className="text-slate-500 text-sm font-medium tracking-wide">Find exactly the safety protection you are looking for.</p>
        </div>
      </section>

      {/* --- MAIN SHOP CONTENT --- */}
      <main className="max-w-[1440px] mx-auto px-6 py-10 flex gap-10">
        
        {/* SIDEBAR CATEGORIES (From image_1efc54.jpg) */}
        <aside className="w-64 flex-shrink-0 hidden lg:block">
          <div className="flex items-center gap-2 mb-6">
            <Filter size={14} className="text-slate-400" />
            <h3 className="text-[10px] font-black uppercase tracking-[3px] text-slate-400">Categories</h3>
          </div>
          <div className="space-y-2">
            {categories.map((cat) => (
              <button 
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat.name ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <span className="flex items-center gap-3">{cat.icon} {cat.name}</span>
                <span className="opacity-50">({cat.count})</span>
              </button>
            ))}
          </div>
        </aside>

        {/* PRODUCT GRID SECTION */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Showing {products.length} products</p>
            <button className="flex items-center gap-2 border border-slate-200 rounded-lg px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
              <ArrowUpDown size={12} /> Newest First <ChevronDown size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-xl transition-all">
                <div className="h-64 relative bg-slate-50 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 right-4 bg-green-50 text-green-600 text-[9px] font-black px-2 py-1 rounded-full uppercase">{p.stock} in stock</span>
                  <button className="absolute bottom-4 left-4 right-4 bg-purple-700 text-white py-3 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 translate-y-20 group-hover:translate-y-0 transition-transform shadow-xl">
                    <ShoppingCart size={14} /> Add to Cart
                  </button>
                </div>
                <div className="p-5">
                  <h4 className="font-black text-slate-800 text-sm uppercase mb-1">{p.name}</h4>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Star size={10} className="fill-orange-400 text-orange-400" />
                    <span className="text-[9px] font-black text-slate-400">{p.rating} (0.0)</span>
                  </div>
                  <p className="text-purple-700 font-black text-2xl tracking-tighter">${p.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* --- FOOTER (Replicated from image_1efc35.png) --- */}
      <footer className="px-4 pb-4 mt-20">
        <div className="bg-black text-white rounded-[3rem] pt-20 pb-10 px-10 max-w-[1440px] mx-auto relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-purple-600 p-1.5 rounded-lg text-white"><Shield size={18} /></div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase">Luu<span className="text-purple-600">Safety.</span></h2>
              </div>
              <p className="text-slate-400 text-[10px] font-bold leading-relaxed uppercase tracking-widest max-w-[250px]">
                Your trusted marketplace for safety products and fast delivery across Ethiopia.
              </p>
            </div>
            <div>
              <h4 className="font-black uppercase text-[10px] text-white mb-8 tracking-[4px]">Quick Links</h4>
              <ul className="space-y-4 text-[12px] font-black uppercase tracking-[2px] text-slate-400">
                <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
                <li><Link to="/shop" className="hover:text-purple-600">Shop</Link></li>
                <li><Link to="/about" className="hover:text-purple-600">About</Link></li>
                <li><Link to="/contact" className="hover:text-purple-600">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-[10px] text-white mb-8 tracking-[4px]">Customer Care</h4>
              <ul className="space-y-4 text-[12px] font-black uppercase tracking-[2px] text-slate-400">
                <li>My Account</li>
                <li>Check Orders</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-[10px] text-white mb-8 tracking-[4px]">Headquarters</h4>
              <ul className="space-y-4 text-[12px] font-black uppercase tracking-[2px] text-slate-400">
                <li className="flex items-center gap-3"><MapPin size={14} className="text-purple-600" /> Bole Road, Addis Ababa</li>
                <li className="flex items-center gap-3"><Phone size={14} className="text-purple-600" /> +251 911 223344</li>
                <li className="flex items-center gap-3"><Mail size={14} className="text-purple-600" /> hub@luusafety.com</li>
              </ul>
            </div>
          </div>
          <p className="pt-10 text-[9px] font-black text-slate-500 uppercase tracking-[5px] text-center">
            © 2026 Luu Safety Marketplace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LuuSafetyShop;