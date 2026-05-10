import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Truck, Headset, Zap, 
  ArrowRight, Star, ShoppingCart, Search, 
  User, Bell, Moon, ChevronDown, Sparkles,
  MapPin, Phone, Mail
} from 'lucide-react';

const LuuSafetyHome = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { id: 1, name: 'Industrial Hard Hat', price: 25.00, rating: 5.0, sold: 124, stock: 18, image: 'https://images.unsplash.com/photo-1584285418504-0051b6d51f6e' },
    { id: 2, name: 'High-Vis Safety Vest', price: 12.99, rating: 4.9, sold: 89, stock: 46, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3' },
    { id: 3, name: 'Steel Toe Work Boots', price: 85.00, rating: 4.8, sold: 45, stock: 12, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
    { id: 4, name: 'Anti-Fog Goggles', price: 15.00, rating: 4.7, sold: 210, stock: 51, image: 'https://images.unsplash.com/photo-1599493758264-36cc4247f820' },
  ];

  const ProductCard = ({ p, label }) => (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 hover:shadow-2xl transition-all group relative">
      <div className="relative h-64 bg-white rounded-2xl mb-5 overflow-hidden">
        <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
        {label && (
          <span className="absolute top-4 left-4 bg-purple-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-purple-200">
            {label}
          </span>
        )}
        <span className="absolute top-4 right-4 bg-green-50 text-green-600 text-[9px] font-black px-2 py-1 rounded-full uppercase">
          {p.stock} in stock
        </span>
        <button className="absolute bottom-4 left-4 right-4 bg-purple-700 text-white py-3 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 translate-y-20 group-hover:translate-y-0 transition-transform shadow-xl shadow-purple-200">
          <ShoppingCart size={14} /> Add to Cart
        </button>
      </div>
      <h4 className="font-black text-slate-800 text-sm uppercase mb-2 tracking-tight line-clamp-1">{p.name}</h4>
      <div className="flex items-center gap-1.5 mb-4">
        <Star size={12} className="fill-orange-400 text-orange-400" />
        <span className="text-[10px] font-black text-slate-400">{p.rating} | {p.sold} SOLD</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-purple-700 font-black text-2xl tracking-tighter">${p.price.toFixed(2)}</p>
        <button className="text-[9px] font-black uppercase text-slate-400 hover:text-purple-600 transition-colors">Details ›</button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans antialiased text-slate-900">
      
      {/* --- DYNAMIC HEADER --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-md py-4'}`}>
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-purple-600 p-1.5 rounded-lg text-white shadow-lg shadow-purple-100"><Shield size={20} /></div>
            <span className="text-xl font-black italic tracking-tighter uppercase">Luu<span className="text-purple-600">Safety</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[12px] font-black uppercase tracking-widest text-slate-500">
            <Link to="/" className="text-purple-600 border-b-2 border-purple-600">Home</Link>
            <Link to="/shop" className="hover:text-purple-600 transition-colors">Market</Link>
            <Link to="/about" className="hover:text-purple-600 transition-colors">Projects</Link>
          </nav>

          <div className="flex-1 max-w-md hidden md:flex items-center relative">
            <input type="text" placeholder="Search safety gear..." className="w-full bg-slate-50 border border-slate-100 rounded-full py-2.5 px-6 text-sm focus:ring-2 focus:ring-purple-600 outline-none transition-all" />
            <button className="absolute right-1.5 p-2 bg-purple-600 rounded-full text-white"><Search size={14} /></button>
          </div>

          <div className="flex items-center gap-5 text-slate-600">
            <div className="hidden xl:flex items-center gap-4 text-[10px] font-black uppercase tracking-widest border-r pr-4 border-slate-200">
              <button className="flex items-center gap-1">Afan Oromo <ChevronDown size={12} /></button>
              <button className="flex items-center gap-1">EURO <ChevronDown size={12} /></button>
            </div>
            <button className="hover:text-purple-600"><Moon size={20} /></button>
            <button className="relative hover:text-purple-600"><Bell size={20} /><span className="absolute -top-1 -right-1 bg-purple-600 text-[8px] text-white w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">2</span></button>
            <button className="relative hover:text-purple-600"><ShoppingCart size={20} /><span className="absolute -top-1 -right-1 bg-slate-900 text-[8px] text-white w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">0</span></button>
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm"><User size={32} className="text-slate-400 p-1" /></div>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[650px] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1" alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 h-full flex flex-col justify-center text-white">
          <div className="flex items-center gap-2 mb-4 bg-purple-600/20 w-max px-4 py-1.5 rounded-full border border-purple-500/30 backdrop-blur-sm">
            <Zap size={14} className="text-purple-400" />
            <span className="text-[10px] font-black uppercase tracking-[3px]">Certified Protection</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-6 leading-[0.85] uppercase tracking-tighter">
            Secure <br /> <span className="text-purple-600 italic">Your Future.</span>
          </h1>
          <p className="max-w-xl text-slate-300 mb-10 text-lg font-medium leading-relaxed">
            Industrial-grade safety materials and personal protective equipment for the modern Ethiopian workforce.
          </p>
          <Link to="/shop" className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-3 transition-all shadow-xl shadow-purple-500/20 w-max">
            Explore Market <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* --- PRODUCT SECTIONS --- */}
      <div className="space-y-16 py-20">
        <section className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-10"><div className="w-1.5 h-8 bg-purple-600 rounded-full" /><h3 className="text-3xl font-black uppercase italic tracking-tighter">New Material Arrived</h3></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(p => <ProductCard key={p.id} p={p} label="New" />)}
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-10"><div className="w-1.5 h-8 bg-purple-600 rounded-full" /><h3 className="text-3xl font-black uppercase italic tracking-tighter">Bestsellers</h3></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice().reverse().map(p => <ProductCard key={p.id} p={p} label="Top Seller" />)}
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3"><div className="w-1.5 h-8 bg-purple-600 rounded-full" /><h3 className="text-3xl font-black uppercase italic tracking-tighter">For You</h3></div>
            <Sparkles className="text-purple-600 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(p => <ProductCard key={p.id} p={p} label="Recommended" />)}
          </div>
        </section>
      </div>

      {/* --- FOOTER (REPLICATED FROM EFOY GEBEYA DESIGN) --- */}
      <footer className="px-4 pb-4 mt-20">
        <div className="bg-black text-white rounded-[3rem] pt-20 pb-10 px-10 max-w-[1440px] mx-auto relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
            
            {/* Branding Column */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-purple-600 p-1.5 rounded-lg text-white"><Shield size={18} /></div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase">Luu<span className="text-purple-600">Safety.</span></h2>
              </div>
              <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase tracking-widest max-w-[250px]">
                Your trusted marketplace for safety products and fast delivery. Providing excellent service across Ethiopia.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-black uppercase text-[10px] text-white mb-8 tracking-[4px]">Quick Links</h4>
              <ul className="space-y-4 text-[12px] font-black uppercase tracking-[2px] text-slate-400">
                <li><Link to="/" className="hover:text-purple-600 transition-colors">Home</Link></li>
                <li><Link to="/shop" className="hover:text-purple-600 transition-colors">Shop</Link></li>
                <li><Link to="/about" className="hover:text-purple-600 transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-purple-600 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="font-black uppercase text-[10px] text-white mb-8 tracking-[4px]">Customer Care</h4>
              <ul className="space-y-4 text-[12px] font-black uppercase tracking-[2px] text-slate-400">
                <li><Link to="/account" className="hover:text-purple-600 transition-colors">My Account</Link></li>
                <li><Link to="/orders" className="hover:text-purple-600 transition-colors">Check Orders</Link></li>
                <li><Link to="/support" className="hover:text-purple-600 transition-colors">Support</Link></li>
              </ul>
            </div>

            {/* Headquarters */}
            <div>
              <h4 className="font-black uppercase text-[10px] text-white mb-8 tracking-[4px]">Headquarters</h4>
              <ul className="space-y-4 text-[12px] font-black uppercase tracking-[2px] text-slate-400">
                <li className="flex items-center gap-3"><MapPin size={14} className="text-purple-600" /> Bole Road, Addis Ababa</li>
                <li className="flex items-center gap-3"><Phone size={14} className="text-purple-600" /> +251 911 223344</li>
                <li className="flex items-center gap-3"><Mail size={14} className="text-purple-600" /> hub@luusafety.com</li>
              </ul>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[5px]">
              © 2026 Luu Safety Marketplace. All rights reserved.
            </p>
            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-600 transition-all cursor-pointer"><Zap size={14} /></div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-600 transition-all cursor-pointer"><Shield size={14} /></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LuuSafetyHome;