import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Zap, ArrowRight, Star, ShoppingCart, 
  MapPin, Phone, Sparkles, Flame, Eye, Heart, Info,
  Layers, Hammer, Award, Verified, TrendingUp, Grid, 
  Clock, Sparkle, UserCheck
} from 'lucide-react';

// Shared Global Navbar
import Navbar from '../components/Navbar';

const HomeScreen = () => {
  // 1. Core State & Data Configurations
  const categories = [
    { id: 'head', name: 'Cranial Protection', count: 14, icon: Shield, gradient: 'from-purple-100 to-purple-50' },
    { id: 'body', name: 'Tactical Vests & Body', count: 28, icon: Layers, gradient: 'from-blue-100 to-blue-50' },
    { id: 'footwear', name: 'Reinforced Footwear', count: 19, icon: Hammer, gradient: 'from-amber-100 to-amber-50' },
    { id: 'optics', name: 'Ballistic & Anti-Fog', count: 12, icon: Eye, gradient: 'from-emerald-100 to-emerald-50' },
  ];

  const bestSellers = [
    { id: 1, name: 'Vanguard Industrial Hard Hat', price: 25.00, rating: 5.0, sold: 1240, stock: 18, image: 'https://images.unsplash.com/photo-1584285418504-0051b6d51f6e', efficiency: 'High Performance' },
    { id: 2, name: 'Aegis High-Vis Safety Vest', price: 12.99, rating: 4.9, sold: 890, stock: 46, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3', efficiency: 'Max Visibility' },
    { id: 3, name: 'Titan Steel Toe Work Boots', price: 85.00, rating: 4.8, sold: 745, stock: 12, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', efficiency: 'Heavy Duty' },
    { id: 4, name: 'Anti-Fog Ballistic Goggles', price: 15.00, rating: 4.7, sold: 610, stock: 51, image: 'https://images.unsplash.com/photo-1599493758264-36cc4247f820', efficiency: 'Clear Telemetry' },
  ];

  const newArrivals = [
    { id: 5, name: 'Mantis Thermal Shield Gloves', price: 19.50, rating: 5.0, sold: 34, stock: 8, image: 'https://images.unsplash.com/photo-1599493758264-36cc4247f820', release: '2026 Batch A' }, 
    { id: 6, name: 'Pro Arc Welding Face Shield', price: 42.00, rating: 4.9, sold: 12, stock: 15, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd', release: 'Next-Gen Core' },
    { id: 7, name: 'Apex Multi-Pocket Cargo Rig', price: 49.99, rating: 4.6, sold: 18, stock: 22, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3', release: '2026 Batch B' },
    { id: 8, name: 'Kevlar Reinforced Sleeves', price: 29.00, rating: 4.8, sold: 25, stock: 30, image: 'https://images.unsplash.com/photo-1584285418504-0051b6d51f6e', release: 'Ultra Shield' }
  ];

  const forYouItems = [
    { id: 9, name: 'ASTU Standard Engineer Kit', price: 120.00, rating: 5.0, match: '98% Match', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd' },
    { id: 10, name: 'Premium Ergo Fall-Arrest Harness', price: 145.00, rating: 4.9, match: '95% Match', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
  ];

  // 2. Reusable Modular Layout Components (Light Mode)
  const ProductCard = ({ p, ribbon }) => (
    <div className="bg-white rounded-3xl p-4 border border-slate-100 hover:border-purple-200 shadow-sm hover:shadow-md transition-all duration-300 group relative flex flex-col justify-between">
      <div className="relative h-48 bg-slate-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center border border-slate-100">
        <img src={p.image} alt={p.name} className="w-28 h-28 object-contain group-hover:scale-105 transition-transform duration-300" />
        
        {ribbon && (
          <span className="absolute top-3 left-3 bg-purple-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">
            {ribbon}
          </span>
        )}
        <span className="absolute top-3 right-3 bg-purple-50 text-purple-600 border border-purple-100 text-[8px] font-bold px-2 py-0.5 rounded-md uppercase">
          {p.stock ? `${p.stock} Units` : 'In Stock'}
        </span>

        <div className="absolute top-1/2 -translate-y-1/2 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-purple-600 shadow-sm transition-colors"><Heart size={12} /></button>
          <Link to={`/product/${p.id}`} className="p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-purple-600 shadow-sm transition-colors"><Eye size={12} /></Link>
        </div>
      </div>

      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={`${i < Math.floor(p.rating) ? 'fill-purple-600 text-purple-600' : 'text-slate-200'}`} />
            ))}
            {p.sold && <span className="text-[9px] text-slate-400 font-medium ml-1">({p.sold} Sold)</span>}
          </div>
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide line-clamp-1 mb-0.5">{p.name}</h4>
          {p.efficiency && <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{p.efficiency}</p>}
          {p.release && <p className="text-[8px] font-bold text-purple-600 uppercase tracking-wider">{p.release}</p>}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider block">Asset Value</span>
            <p className="text-slate-900 font-black text-base">${p.price.toFixed(2)}</p>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-xl transition-all shadow-md shadow-purple-600/10 flex items-center justify-center">
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-600 relative">
      <Navbar />

      {/* ================= HERO SECTION (LIGHT SPEC) ================= */}
      <section className="relative min-h-[70vh] flex items-center pt-20 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full relative z-10 py-12">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full">
              <Flame size={12} className="text-purple-600" />
              <span className="text-[8px] font-bold uppercase tracking-[2px] text-purple-600">Premium Industrial Resource</span>
            </div>
            {/* Minimized Hero Text Size */}
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-none">
              Defend <br /> Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 italic">Workforce.</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-md">
              High-fidelity protective armor, visibility gear, and high-tier utility instruments tailored for ASTU engineers and complex industrial operations.
            </p>
            <div className="pt-2">
              <Link to="/shop" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3.5 rounded-xl font-bold uppercase text-[10px] tracking-wider inline-flex items-center gap-2 transition-all shadow-md shadow-purple-600/20">
                Enter Marketplace <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center">
            <div className="border border-slate-100 bg-white p-6 rounded-3xl shadow-md max-w-xs w-full relative">
              <div className="absolute -top-3 -right-3 bg-purple-600 text-white p-2.5 rounded-xl shadow-md">
                <Shield size={16} />
              </div>
              <img src="https://images.unsplash.com/photo-1584285418504-0051b6d51f6e" alt="Featured hardhat" className="w-full h-48 object-contain mb-4" />
              <span className="text-[8px] font-bold text-purple-600 uppercase tracking-widest block mb-0.5">Featured Spec</span>
              <h3 className="text-slate-800 font-bold text-sm uppercase tracking-tight">Vanguard Hard Hat v2</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Global Trust Banner */}
      <section className="border-b border-slate-100 bg-white py-6">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ value: '100%', label: 'Certified Standards' }, { value: '24/7', label: 'Operations Sync' }, { value: 'ASTU', label: 'Official Hardware' }, { value: 'FAST', label: 'National Delivery' }].map((item, idx) => (
            <div key={idx} className="text-center space-y-0.5">
              <p className="text-lg font-black text-slate-800 tracking-tight">{item.value}</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 1: SHOP BY CATEGORY ================= */}
      <section className="max-w-[1200px] mx-auto px-6 pt-16">
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-purple-600 mb-1">
            <Grid size={12} />
            <span className="text-[9px] font-bold uppercase tracking-[2px]">Structural Sorting</span>
          </div>
          {/* Minimized Header Size */}
          <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Shop By Category</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link to={`/shop?category=${cat.id}`} key={cat.id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-purple-200 transition-all duration-300 relative overflow-hidden group flex items-center gap-4">
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-20`} />
                <div className="relative z-10 p-2.5 bg-white rounded-xl border border-slate-100 text-purple-600 shadow-sm">
                  <IconComponent size={16} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wide">{cat.name}</h3>
                  <span className="text-[9px] text-slate-400 font-medium">{cat.count} Items</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-6 py-16 space-y-16">
        
        {/* ================= SECTION 2: BEST SELLERS ================= */}
        <section>
          <div className="flex items-end justify-between mb-6 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-purple-600 mb-1">
                <TrendingUp size={12} />
                <span className="text-[9px] font-bold uppercase tracking-[2px]">Top Moving Assets</span>
              </div>
              {/* Minimized Header Size */}
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Best Sellers</h2>
            </div>
            <Link to="/shop?sort=best" className="text-[9px] font-bold uppercase tracking-wider text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1">
              View All <ArrowRight size={10} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bestSellers.map(p => <ProductCard key={p.id} p={p} ribbon="Top Value" />)}
          </div>
        </section>

        {/* Informative Light Banner */}
        <section className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 lg:max-w-xl">
            <span className="text-purple-600 text-[8px] font-bold bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-md uppercase tracking-wider">Announcement</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Complete Structural Protection Framework</h2>
            <p className="text-slate-500 text-xs leading-relaxed font-medium">Every equipment cluster leaving our distribution grid holds valid international certifications (EN, ANSI).</p>
          </div>
          <div className="w-full lg:w-48 h-24 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
            <Shield size={36} className="text-purple-200" />
          </div>
        </section>

        {/* ================= SECTION 3: NEW ARRIVALS ================= */}
        <section>
          <div className="flex items-end justify-between mb-6 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-purple-600 mb-1">
                <Clock size={12} />
                <span className="text-[9px] font-bold uppercase tracking-[2px]">Fresh Infrastructure</span>
              </div>
              {/* Minimized Header Size */}
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">New Arrivals</h2>
            </div>
            <Link to="/shop?sort=new" className="text-[9px] font-bold uppercase tracking-wider text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1">
              View Latest <ArrowRight size={10} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {newArrivals.map(p => <ProductCard key={p.id} p={p} ribbon="2026 Spec" />)}
          </div>
        </section>

        {/* ================= SECTION 4: FOR YOU ================= */}
        <section className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8">
          <div className="mb-6 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-purple-600 mb-1">
              <UserCheck size={12} />
              <span className="text-[9px] font-bold uppercase tracking-[2px]">Engine Matching Intelligence</span>
            </div>
            {/* Minimized Header Size */}
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Suggested For You</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forYouItems.map((item) => (
              <div key={item.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 group shadow-sm">
                <div className="w-24 h-24 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-slate-100 relative">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                  <span className="absolute bottom-1.5 left-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[6px] font-bold px-1.5 py-0.5 rounded uppercase">
                    {item.match}
                  </span>
                </div>
                <div className="flex-1 space-y-3 text-left w-full">
                  <div>
                    <div className="flex items-center gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={8} className="fill-purple-600 text-purple-600" />)}
                    </div>
                    <h3 className="text-slate-800 font-bold text-xs uppercase tracking-wide line-clamp-1">{item.name}</h3>
                    <p className="text-slate-400 text-[8px] uppercase font-bold tracking-wider mt-0.5">Configured for ASTU Operators</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <p className="text-slate-900 font-black text-base">${item.price.toFixed(2)}</p>
                    <Link to={`/product/${item.id}`} className="text-purple-600 hover:text-purple-700 text-[9px] font-bold uppercase tracking-wider flex items-center gap-0.5">
                      Configure <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ================= FOOTER AREA ================= */}
      <footer className="p-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto py-8 px-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs border-b border-slate-200/60 pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-purple-600 p-1.5 rounded-lg text-white"><Shield size={14} /></div>
                <h2 className="font-black italic tracking-tight uppercase text-slate-900">Luu<span className="text-purple-600">Safety.</span></h2>
              </div>
              <p className="text-slate-400 text-[10px] font-medium max-w-xs">
                Strategic industrial protection assets deployment. Operating under high-fidelity enterprise standards.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:col-span-2">
              <div>
                <h4 className="font-bold uppercase text-[9px] text-purple-600 mb-3 tracking-wider">System</h4>
                <ul className="space-y-1.5 text-[10px] font-semibold uppercase text-slate-500">
                  <li><Link to="/shop" className="hover:text-purple-600">Marketplace</Link></li>
                  <li><Link to="/about" className="hover:text-purple-600">Project Hub</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase text-[9px] text-purple-600 mb-3 tracking-wider">Contact</h4>
                <div className="space-y-1 text-[10px] font-semibold text-slate-400 uppercase">
                  <p className="flex items-center gap-1.5"><MapPin size={10} /> Addis Ababa</p>
                  <p className="flex items-center gap-1.5"><Phone size={10} /> +251 900 000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 text-center">
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
              © 2026 Luu Safety Systems • Efoy Engine
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;