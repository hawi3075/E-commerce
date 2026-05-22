import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Zap, ArrowRight, Star, ShoppingCart, 
  MapPin, Phone, Sparkles, Flame, Eye, Heart, Info,
  Layers, Hammer, EyeOff, Award, Verified, ChevronRight
} from 'lucide-react';

// Shared Global Navbar
import Navbar from '../components/Navbar';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'head', name: 'Cranial Protection', count: 14, icon: Shield, gradient: 'from-purple-600/20 to-pink-600/5' },
    { id: 'body', name: 'Tactical Vests & Body', count: 28, icon: Layers, gradient: 'from-blue-600/20 to-purple-600/5' },
    { id: 'footwear', name: 'Reinforced Footwear', count: 19, icon: Hammer, gradient: 'from-amber-600/20 to-purple-600/5' },
    { id: 'optics', name: 'Ballistic & Anti-Fog', count: 12, icon: Eye, gradient: 'from-emerald-600/20 to-purple-600/5' },
  ];

  const products = [
    { id: 1, name: 'Industrial Hard Hat', price: 25.00, rating: 5.0, sold: 124, stock: 18, tag: 'head', image: 'https://images.unsplash.com/photo-1584285418504-0051b6d51f6e' },
    { id: 2, name: 'High-Vis Safety Vest', price: 12.99, rating: 4.9, sold: 89, stock: 46, tag: 'body', image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3' },
    { id: 3, name: 'Steel Toe Work Boots', price: 85.00, rating: 4.8, sold: 45, stock: 12, tag: 'footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
    { id: 4, name: 'Anti-Fog Goggles', price: 15.00, rating: 4.7, sold: 210, stock: 51, tag: 'optics', image: 'https://images.unsplash.com/photo-1599493758264-36cc4247f820' },
    { id: 5, name: 'Mantis Heavy Duty Gloves', price: 19.50, rating: 5.0, sold: 340, stock: 8, tag: 'body', image: 'https://images.unsplash.com/photo-1599493758264-36cc4247f820' }, 
    { id: 6, name: 'Pro Welding Face Shield', price: 42.00, rating: 4.9, sold: 67, stock: 15, tag: 'head', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd' }
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.tag === activeTab);

  const ProductCard = ({ p, label }) => (
    <div className="bg-slate-900/40 backdrop-blur-md rounded-[2.5rem] p-5 border border-white/5 hover:border-purple-500/30 transition-all duration-500 group relative flex flex-col justify-between">
      <div className="relative h-60 bg-slate-950/60 rounded-3xl mb-5 overflow-hidden flex items-center justify-center border border-white/5">
        <img src={p.image} alt={p.name} className="w-44 h-44 object-contain group-hover:scale-110 transition-transform duration-500" />
        
        {label && (
          <span className="absolute top-4 left-4 bg-purple-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
            {label}
          </span>
        )}
        <span className="absolute top-4 right-4 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[8px] font-black px-2.5 py-1 rounded-md uppercase">
          {p.stock} Available
        </span>

        <div className="absolute top-1/2 -translate-y-1/2 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2.5 bg-slate-900 border border-white/10 rounded-xl text-slate-400 hover:text-purple-400 transition-colors"><Heart size={14} /></button>
          <Link to={`/product/${p.id}`} className="p-2.5 bg-slate-900 border border-white/10 rounded-xl text-slate-400 hover:text-purple-400 transition-colors"><Eye size={14} /></Link>
        </div>
      </div>

      <div className="space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={`${i < Math.floor(p.rating) ? 'fill-purple-500 text-purple-500' : 'text-slate-700'}`} />
            ))}
            <span className="text-[9px] text-slate-500 font-bold ml-1">({p.sold} orders)</span>
          </div>
          <h4 className="font-black text-white text-[13px] uppercase tracking-wide line-clamp-1 mb-1">{p.name}</h4>
        </div>

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
      <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-[130px] pointer-events-none" />

      <Navbar />

      {/* 1. Hero Showcase Area */}
      <section className="relative min-h-[90vh] flex items-center pt-24">
        <div className="max-w-[1440px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
          
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

          <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center">
            <div className="absolute w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-[80px] -z-10 animate-pulse" />
            <div className="border border-white/5 bg-slate-900/40 p-8 rounded-[3rem] backdrop-blur-xl shadow-3xl max-w-sm w-full relative">
              <div className="absolute -top-4 -right-4 bg-purple-600 text-white p-3 rounded-2xl shadow-xl">
                <Shield size={20} />
              </div>
              <img src="https://images.unsplash.com/photo-1584285418504-0051b6d51f6e" alt="Featured Hardhat" className="w-full h-64 object-contain mb-6 drop-shadow-[0_20px_30px_rgba(147,51,234,0.3)]" />
              <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest block mb-1">Featured Spec</span>
              <h3 className="text-white font-black text-lg uppercase tracking-tight">Vanguard Hard Hat v2</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Grid / Metrics Banner */}
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

      {/* 3. Interactive Category Grid */}
      <section className="max-w-[1440px] mx-auto px-10 py-20">
        <div className="mb-10 space-y-1">
          <span className="text-purple-500 text-[9px] font-black uppercase tracking-[4px]">Structural Sorting</span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Browse Class Nodes</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <button 
                key={cat.id} 
                onClick={() => setActiveTab(cat.id === activeTab ? 'all' : cat.id)}
                className={`p-6 rounded-[2rem] border text-left transition-all duration-300 relative overflow-hidden group ${
                  activeTab === cat.id 
                    ? 'bg-purple-600/20 border-purple-500 shadow-xl shadow-purple-950/40' 
                    : 'bg-slate-900/40 border-white/5 hover:border-white/10'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-40 group-hover:opacity-60 transition-opacity`} />
                <div className="relative z-10 flex flex-col justify-between h-24">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-slate-950/60 rounded-2xl border border-white/5 text-purple-400 group-hover:scale-110 transition-transform">
                      <IconComponent size={20} />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 bg-slate-950/40 px-2.5 py-1 rounded-md">
                      {cat.count} Units
                    </span>
                  </div>
                  <h3 className="text-sm font-black uppercase text-white tracking-wide mt-4">{cat.name}</h3>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Complete Main Interactive Catalog */}
      <main className="max-w-[1440px] mx-auto px-10 py-10 space-y-28">
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/5 pb-8 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="text-purple-500" size={16} />
                <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
                  Prime <span className="text-purple-500 italic">Inventory</span>
                </h2>
              </div>
              <div className="flex gap-4 pt-2">
                <button onClick={() => setActiveTab('all')} className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-all ${activeTab === 'all' ? 'bg-purple-600 text-white' : 'text-slate-400 bg-white/5 hover:bg-white/10'}`}>All Assets</button>
                <button onClick={() => setActiveTab('head')} className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-all ${activeTab === 'head' ? 'bg-purple-600 text-white' : 'text-slate-400 bg-white/5 hover:bg-white/10'}`}>Headgear</button>
                <button onClick={() => setActiveTab('body')} className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-all ${activeTab === 'body' ? 'bg-purple-600 text-white' : 'text-slate-400 bg-white/5 hover:bg-white/10'}`}>Vests & Suits</button>
              </div>
            </div>
            <Link to="/shop" className="text-[10px] font-black uppercase tracking-[2px] text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5 self-start md:self-auto">
              View Entire Node <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(p => <ProductCard key={p.id} p={p} label="Active Spec" />)
            ) : (
              <div className="col-span-full border border-dashed border-white/10 rounded-[2rem] p-16 text-center text-slate-500">
                <p className="text-xs uppercase font-black tracking-widest">No deployed components match this filter node.</p>
              </div>
            )}
          </div>
        </section>

        {/* 5. Highlight / Promotional Block Element */}
        <section className="bg-gradient-to-br from-purple-900/20 via-slate-900/40 to-slate-950 border border-white/5 rounded-[3rem] p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]" />
          
          <div className="space-y-6 lg:max-w-2xl relative z-10">
            <span className="text-purple-400 text-[9px] font-black bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-md uppercase tracking-widest">Crucial Standard Announcement</span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">Complete Structural Protection Framework</h2>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Every equipment cluster leaving our distribution grid holds valid international certifications (EN, ANSI). Equipped with built-in high-fidelity durability parameters to withstand harsh workspace settings.
            </p>
            <div className="flex gap-4 pt-2">
              <Link to="/shop" className="bg-white text-slate-950 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-slate-200 transition-colors flex items-center gap-2">Verify Specs <Verified size={14} /></Link>
            </div>
          </div>
          <div className="w-full lg:w-96 h-64 bg-slate-950/60 border border-white/5 rounded-[2rem] flex items-center justify-center p-8">
            <Shield size={96} className="text-purple-600/40 animate-pulse" />
          </div>
        </section>

        {/* 6. Enterprise Endorsements / Testimonials */}
        <section className="space-y-10">
          <div className="text-center space-y-1">
            <span className="text-purple-500 text-[9px] font-black uppercase tracking-[4px]">Field Assessment Logs</span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Verified Operational Reviews</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { review: "The high-vis systems and hardhat rigs perform phenomenally across our complex construction blueprints. Flawless tracking architecture.", user: "ASTU Senior Structural Engineer" },
              { review: "Remarkable deployment dispatch speeds via the Efoy Engine system. Premium luxury aesthetic combined with rugged, non-negotiable shielding.", user: "Lead Safety Controller" },
              { review: "Top-tier ballistic anti-fog layers provide crystal clear telemetry under rigorous hot workshop environments. Highly recommended.", user: "ASTU Labs Assistant" }
            ].map((t, i) => (
              <div key={i} className="bg-slate-900/30 border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between space-y-6">
                <p className="text-slate-400 text-xs italic leading-relaxed">"{t.review}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center border border-purple-500/30 text-purple-400 font-black text-xs">O</div>
                  <div>
                    <h4 className="text-[11px] font-black text-white uppercase tracking-wider">{t.user}</h4>
                    <p className="text-[8px] font-bold text-purple-500 uppercase tracking-widest">Verified Personnel</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 7. Footer Area */}
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