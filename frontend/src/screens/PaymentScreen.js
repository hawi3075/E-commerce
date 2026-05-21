import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Zap, ArrowRight, Star, ShoppingCart, 
  MapPin, Phone, Sparkles, Flame, Eye, Heart, Info
} from 'lucide-react';

// Shared Global Navbar
import Navbar from '../components/Navbar';

const HomeScreen = () => {
  const products = [
    { id: 1, name: 'Industrial Hard Hat', price: 25.00, rating: 5.0, sold: 124, stock: 18, image: 'https://images.unsplash.com/photo-1584285418504-0051b6d51f6e' },
    { id: 2, name: 'High-Vis Safety Vest', price: 12.99, rating: 4.9, sold: 89, stock: 46, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3' },
    { id: 3, name: 'Steel Toe Work Boots', price: 85.00, rating: 4.8, sold: 45, stock: 12, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
    { id: 4, name: 'Anti-Fog Goggles', price: 15.00, rating: 4.7, sold: 210, stock: 51, image: 'https://images.unsplash.com/photo-1599493758264-36cc4247f820' },
  ];

  const ProductCard = ({ p, label }) => (
    <div className="bg-slate-900/40 backdrop-blur-md rounded-[2.5rem] p-5 border border-white/5 hover:border-purple-500/30 transition-all duration-500 group relative flex flex-col justify-between">
      
      {/* Image Wrapper */}
      <div className="relative h-60 bg-slate-950/60 rounded-3xl mb-5 overflow-hidden flex items-center justify-center border border-white/5">
        <img 
          src={p.image} 
          alt={p.name} 
          className="w-44 h-44 object-contain group-hover:scale-110 transition-transform duration-500" 
        />
        
        {/* Badges */}
        {label && (
          <span className="absolute top-4 left-4 bg-purple-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
            {label}
          </span>
        )}
        <span className="absolute top-4 right-4 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[8px] font-black px-2.5 py-1 rounded-md uppercase">
          {p.stock} Available
        </span>

        {/* Floating Quick Action Overlays */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2.5 bg-slate-900 border border-white/10 rounded-xl text-slate-400 hover:text-purple-400 transition-colors">
            <Heart size={14} />
          </button>
          <Link to={`/product/${p.id}`} className="p-2.5 bg-slate-900 border border-white/10 rounded-xl text-slate-400 hover:text-purple-400 transition-colors">
            <Eye size={14} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={`${i < Math.floor(p.rating) ? 'fill-purple-500 text-purple-500' : 'text-slate-700'}`} />
            ))}
            <span className="text-[9px] text-slate-500 font-bold ml-1">({p.sold} orders)</span>
          </div>
          
          <h4 className="font-black text-white text-[13px] uppercase tracking-wide line-clamp-1 mb-1">
            {p.name}
          </h4>
        </div>

        {/* Pricing and Primary Action Area */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            <span className="text-[8px] font-bold text-slate-500 uppercase block tracking-wider">Price</span>
            <p className="text-white font-black text-xl tracking-tight">${p.price.toFixed(2)}</p>
          </div>
          
          <button className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white p-3.5 rounded-2xl transition-all shadow-xl shadow-purple-600/10 flex items-center justify-center group/btn">
            <ShoppingCart size={16} className="group-hover/btn:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#05050a] min-h-screen font-sans antialiased text-slate-200 overflow-hidden relative">
      
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-purple-800/5 rounded-full blur-[150px] pointer-events-none" />

      <Navbar />

      {/* Hero Showcase Area */}
      <section className="relative min-h-[85vh] flex items-center pt-20">
        <div className="max-w-[1440px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full">
              <Flame size={14} className="text-purple-400 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[3px] text-purple-300">Premium Industrial Resource</span>
            </div>
            
            <h1 className="text-6xl md:text-[85px] font-black text-white uppercase tracking-tighter leading-[0.85]">
              Defend <br /> Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 italic">Workforce.</span>
            </h1>
            
            <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-xl">
              High-fidelity protective armor, visibility gear, and high-tier utility instruments tailored for ASTU engineers and complex industrial operations.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/shop" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[2px] flex items-center gap-3 transition-all shadow-2xl shadow-purple-600/30">
                Enter Marketplace <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="border border-white/10 hover:border-white/20 bg-white/[0.02] text-white px-8 py-5 rounded-2xl font-black uppercase text-xs tracking-[2px] flex items-center gap-2 transition-all">
                Specifications <Info size={14} className="text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Hero Right Visual Element */}
          <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center">
            <div className="absolute w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-[80px] -z-10 animate-pulse" />
            <div className="border border-white/5 bg-slate-900/40 p-8 rounded-[3rem] backdrop-blur-xl shadow-3xl max-w-sm w-full relative">
              <div className="absolute -top-4 -right-4 bg-purple-600 text-white p-3 rounded-2xl shadow-xl">
                <Shield size={20} />
              </div>
              <img 
                src="https://images.unsplash.com/photo-1584285418504-0051b6d51f6e" 
                alt="Featured Product" 
                className="w-full h-64 object-contain mb-6 drop-shadow-[0_20px_30px_rgba(147,51,234,0.3)]"
              />
              <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest block mb-1">Featured Spec</span>
              <h3 className="text-white font-black text-lg uppercase tracking-tight">Vanguard Hard Hat v2</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Grid / Metrics Banner */}
      <section className="border-y border-white/5 bg-slate-900/20 backdrop-blur-md py-10">
        <div className="max-w-[1440px] mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '100%', label: 'Certified Standards' },
            { value: '24/7', label: 'Operations Sync' },
            { value: 'ASTU', label: 'Official Hardware' },
            { value: 'FAST', label: 'National Delivery' }
          ].map((item, idx) => (
            <div key={idx} className="text-center space-y-1">
              <p className="text-2xl font-black text-white tracking-tight">{item.value}</p>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Grid Section */}
      <main className="max-w-[1440px] mx-auto px-10 py-24 space-y-28">
        
        {/* Core Showcase Grid */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/5 pb-8 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="text-purple-500" size={16} />
                <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
                  Prime <span className="text-purple-500 italic">Inventory</span>
                </h2>
              </div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[4px]">
                High-Performance Field Operations Configuration
              </p>
            </div>
            <Link to="/shop" className="text-[10px] font-black uppercase tracking-[2px] text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5 self-start md:self-auto">
              View Entire Node <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p.id} p={p} label="Active Spec" />)}
          </div>
        </section>

      </main>

      {/* Footer Area */}
      <footer className="p-6">
        <div className="bg-slate-900/30 border border-white/5 rounded-[3rem] p-12 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/5 pb-16">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="bg-purple-600 p-2 rounded-xl text-white"><Shield size={18} /></div>
                <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">Luu<span className="text-purple-600">Safety.</span></h2>
              </div>
              <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed max-w-sm">
                Strategic industrial protection assets deployment. Operating under high-fidelity enterprise standards.
              </p>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="font-black uppercase text-[10px] text-purple-400 mb-6 tracking-[3px]">System</h4>
                <ul className="space-y-3 text-[11px] font-black uppercase tracking-[1px] text-slate-400">
                  <li><Link to="/shop" className="hover:text-purple-400 transition-colors">Marketplace</Link></li>
                  <li><Link to="/about" className="hover:text-purple-400 transition-colors">Project Hub</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black uppercase text-[10px] text-purple-400 mb-6 tracking-[3px]">Security</h4>
                <ul className="space-y-3 text-[11px] font-black uppercase tracking-[1px] text-slate-400">
                  <li><Link to="/login" className="hover:text-purple-400 transition-colors">Operator Login</Link></li>
                  <li><Link to="/signup" className="hover:text-purple-400 transition-colors">Register Node</Link></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-black uppercase text-[10px] text-purple-400 mb-6 tracking-[3px]">Contact</h4>
                <div className="space-y-3 text-[11px] font-black uppercase tracking-[1px] text-slate-500">
                  <p className="flex items-center gap-2"><MapPin size={12} /> Addis Ababa</p>
                  <p className="flex items-center gap-2"><Phone size={12} /> +251 900 000</p>
                </div>
              </div>
            </div>

          </div>
          <div className="pt-10 text-center">
            <p className="text-[10px] font-black text-slate-700 uppercase tracking-[6px]">
              © 2026 Luu Safety Systems • Efoy Engine
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;