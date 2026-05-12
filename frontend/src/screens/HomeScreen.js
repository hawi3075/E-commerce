import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Zap, ArrowRight, Star, ShoppingCart, Search, 
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
      <h4 className="font-black text-slate-800 text-[11px] uppercase mb-2 tracking-tight line-clamp-1">{p.name}</h4>
      <div className="flex items-center gap-1.5 mb-4">
        <Star size={10} className="fill-orange-400 text-orange-400" />
        <span className="text-[9px] font-black text-slate-400">{p.rating} | {p.sold} SOLD</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-purple-700 font-black text-xl tracking-tighter">${p.price.toFixed(2)}</p>
        <button className="text-[8px] font-black uppercase text-slate-400 hover:text-purple-600 transition-colors">Details ›</button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans antialiased text-slate-900">
      
      {/* --- MINIMIZED HEADER --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-1' : 'bg-white/90 backdrop-blur-md py-2'}`}>
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-1.5">
            <div className="bg-purple-600 p-1 rounded-md text-white"><Shield size={14} /></div>
            <span className="text-base font-black italic tracking-tighter uppercase">Luu<span className="text-purple-600">Safety</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <Link to="/" className="text-purple-600">Home</Link>
            <Link to="/shop" className="hover:text-purple-600 transition-colors">Market</Link>
            <Link to="/about" className="hover:text-purple-600 transition-colors">Projects</Link>
          </nav>

          <div className="flex-1 max-w-sm hidden md:flex items-center relative">
            <input type="text" placeholder="Search..." className="w-full bg-slate-50 border border-slate-100 rounded-full py-1.5 px-4 text-[11px] outline-none focus:ring-1 focus:ring-purple-600 transition-all" />
            <button className="absolute right-1 p-1.5 bg-purple-600 rounded-full text-white"><Search size={10} /></button>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <div className="hidden xl:flex items-center gap-3 text-[8px] font-black uppercase tracking-[2px] border-r pr-3 border-slate-200">
              <button className="flex items-center gap-1">Afan Oromo <ChevronDown size={8} /></button>
              <button className="flex items-center gap-1">EURO <ChevronDown size={8} /></button>
            </div>
            <button className="hover:text-purple-600"><Moon size={16} /></button>
            <button className="relative hover:text-purple-600"><Bell size={16} /><span className="absolute -top-1 -right-1 bg-purple-600 text-[7px] text-white w-3 h-3 rounded-full flex items-center justify-center font-bold">2</span></button>
            <button className="relative hover:text-purple-600"><ShoppingCart size={16} /><span className="absolute -top-1 -right-1 bg-slate-900 text-[7px] text-white w-3 h-3 rounded-full flex items-center justify-center font-bold">0</span></button>
            <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden"><User size={18} className="text-slate-400" /></div>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[600px] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1" alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 h-full flex flex-col justify-center text-white">
          <div className="flex items-center gap-2 mb-3 bg-purple-600/20 w-max px-3 py-1 rounded-full border border-purple-500/30 backdrop-blur-sm">
            <Zap size={10} className="text-purple-400" />
            <span className="text-[8px] font-black uppercase tracking-[2px]">Certified Protection</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-4 leading-[0.85] uppercase tracking-tighter">
            Secure <br /> <span className="text-purple-600 italic">Your Future.</span>
          </h1>
          <p className="max-w-md text-slate-300 mb-8 text-sm font-medium leading-relaxed">
            Industrial-grade safety materials and personal protective equipment for the modern Ethiopian workforce.
          </p>
          <Link to="/shop" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center gap-2 transition-all shadow-lg w-max">
            Explore Market <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* --- PRODUCT SECTIONS --- */}
      <div className="space-y-16 py-16">
        <section className="max-w-[1400px] mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 bg-purple-600 rounded-full" />
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">New Material Arrived</h3>
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest ml-3">Be the first to equip yourself with our latest arrivals in industrial protection.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p.id} p={p} label="New" />)}
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 bg-purple-600 rounded-full" />
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">Bestsellers</h3>
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest ml-3">The most trusted and highly-rated safety gear chosen by professionals nationwide.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice().reverse().map(p => <ProductCard key={p.id} p={p} label="Top Seller" />)}
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-6 bg-purple-600 rounded-full" />
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">For You</h3>
              </div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest ml-3">Tailored recommendations based on your professional requirements and style.</p>
            </div>
            <Sparkles className="text-purple-600 animate-pulse hidden md:block" size={18} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p.id} p={p} label="Recommended" />)}
          </div>
        </section>
      </div>

      {/* --- FOOTER --- */}
      <footer className="px-4 pb-4">
        <div className="bg-black text-white rounded-[2.5rem] pt-16 pb-8 px-10 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/10 pb-12">
            <div className="col-span-1">
              <div className="flex items-center gap-1.5 mb-5">
                <div className="bg-purple-600 p-1 rounded-md text-white"><Shield size={14} /></div>
                <h2 className="text-xl font-black italic tracking-tighter uppercase">Luu<span className="text-purple-600">Safety.</span></h2>
              </div>
              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest leading-relaxed max-w-[200px]">
                Your trusted marketplace for safety products and fast delivery across Ethiopia.
              </p>
            </div>
            <div>
              <h4 className="font-black uppercase text-[8px] text-white mb-6 tracking-[3px]">Quick Links</h4>
              <ul className="space-y-3 text-[10px] font-black uppercase tracking-[1px] text-slate-400">
                <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
                <li><Link to="/shop" className="hover:text-purple-600">Shop</Link></li>
                <li><Link to="/about" className="hover:text-purple-600">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-[8px] text-white mb-6 tracking-[3px]">Support</h4>
              <ul className="space-y-3 text-[10px] font-black uppercase tracking-[1px] text-slate-400">
                <li>My Account</li>
                <li>Track Orders</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-[8px] text-white mb-6 tracking-[3px]">Contact</h4>
              <ul className="space-y-3 text-[10px] font-black uppercase tracking-[1px] text-slate-400">
                <li className="flex items-center gap-2"><MapPin size={12} className="text-purple-600" /> Addis Ababa</li>
                <li className="flex items-center gap-2"><Phone size={12} className="text-purple-600" /> +251 911 223344</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex justify-between items-center text-[8px] font-black text-slate-500 uppercase tracking-[4px]">
            <p>© 2026 Luu Safety • Efoy Gebeya Engine</p>
            <div className="flex gap-4">
              <Zap size={12} className="hover:text-purple-600 cursor-pointer" />
              <Shield size={12} className="hover:text-purple-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LuuSafetyHome;