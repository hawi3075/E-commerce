import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Zap, ArrowRight, Star, ShoppingCart, 
  MapPin, Phone, Sparkles 
} from 'lucide-react';

// Use the shared component that is also used in the Shop
import Navbar from '../components/Navbar';

const HomeScreen = () => {
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
          <span className="absolute top-4 left-4 bg-purple-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            {label}
          </span>
        )}
        <span className="absolute top-4 right-4 bg-green-50 text-green-600 text-[9px] font-black px-2 py-1 rounded-full uppercase">
          {p.stock} in stock
        </span>
        <button className="absolute bottom-4 left-4 right-4 bg-purple-700 text-white py-3 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 translate-y-20 group-hover:translate-y-0 transition-transform shadow-xl">
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
      
      {/* SHARED NAVBAR COMPONENT */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[650px] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1" alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-10 h-full flex flex-col justify-center text-white">
          <div className="flex items-center gap-2 mb-4 bg-purple-600/20 w-max px-4 py-1.5 rounded-full border border-purple-500/30 backdrop-blur-sm">
            <Zap size={12} className="text-purple-400" />
            <span className="text-[9px] font-black uppercase tracking-[2px]">Certified Protection</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.85] uppercase tracking-tighter">
            Secure <br /> <span className="text-purple-500 italic">Your Future.</span>
          </h1>
          <p className="max-w-md text-slate-300 mb-10 text-base font-medium leading-relaxed">
            Industrial-grade safety materials and personal protective equipment for the modern Ethiopian workforce.
          </p>
          <Link to="/shop" className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center gap-3 transition-all shadow-2xl shadow-purple-600/20 w-max">
            Explore Market <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="space-y-24 py-20">
        
        {/* NEW ARRIVALS */}
        <section className="max-w-[1400px] mx-auto px-10">
          <div className="mb-10 flex items-center justify-between border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-1.5 h-8 bg-purple-600 rounded-full" />
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">New Arrivals</h3>
              </div>
              <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest ml-4">Latest industrial protection for ASTU engineers.</p>
            </div>
            <Link to="/shop" className="text-[10px] font-black uppercase tracking-widest text-purple-600 hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(p => <ProductCard key={p.id} p={p} label="New" />)}
          </div>
        </section>

        {/* FOR YOU / RECOMMENDATIONS */}
        <section className="max-w-[1400px] mx-auto px-10">
          <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-1.5 h-8 bg-purple-600 rounded-full" />
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">Tailored For You</h3>
              </div>
              <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest ml-4">Recommendations based on your professional requirements.</p>
            </div>
            <Sparkles className="text-purple-600 animate-pulse" size={24} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice().reverse().map(p => <ProductCard key={p.id} p={p} label="Recommended" />)}
          </div>
        </section>
      </div>

      {/* FOOTER SECTION */}
      <footer className="px-6 pb-6">
        <div className="bg-black text-white rounded-[3rem] pt-20 pb-10 px-12 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-purple-600 p-1.5 rounded-lg text-white"><Shield size={18} /></div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase">Luu<span className="text-purple-600">Safety.</span></h2>
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-[250px]">
                Your trusted marketplace for safety products and fast delivery across Ethiopia.
              </p>
            </div>
            <div>
              <h4 className="font-black uppercase text-[10px] text-white mb-8 tracking-[4px]">Navigation</h4>
              <ul className="space-y-4 text-[11px] font-black uppercase tracking-[2px] text-slate-500">
                <li><Link to="/" className="hover:text-purple-600 transition-colors">Home</Link></li>
                <li><Link to="/shop" className="hover:text-purple-600 transition-colors">Marketplace</Link></li>
                <li><Link to="/about" className="hover:text-purple-600 transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-[10px] text-white mb-8 tracking-[4px]">Customer</h4>
              <ul className="space-y-4 text-[11px] font-black uppercase tracking-[2px] text-slate-500">
                <li className="hover:text-purple-600 cursor-pointer">Support</li>
                <li className="hover:text-purple-600 cursor-pointer">Check Orders</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-[10px] text-white mb-8 tracking-[4px]">Contact</h4>
              <ul className="space-y-4 text-[11px] font-black uppercase tracking-[2px] text-slate-500">
                <li className="flex items-center gap-3"><MapPin size={14} className="text-purple-600" /> Addis Ababa</li>
                <li className="flex items-center gap-3"><Phone size={14} className="text-purple-600" /> +251 911 223344</li>
              </ul>
            </div>
          </div>
          <div className="pt-10 flex justify-between items-center">
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[5px]">
              © 2026 Luu Safety • Marketplace Engine
            </p>
            <div className="flex gap-4 opacity-30">
              <Zap size={16} />
              <Shield size={16} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;