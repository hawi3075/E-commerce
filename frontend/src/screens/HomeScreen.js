import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Zap, ArrowRight, Star, ShoppingCart, 
  MapPin, Phone, Sparkles, TrendingUp
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
    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 hover:border-purple-100 hover:shadow-[0_20px_50px_rgba(126,34,206,0.1)] transition-all duration-500 group relative">
      <div className="relative h-64 bg-slate-50 rounded-2xl mb-6 overflow-hidden">
        <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
        
        {label && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            {label}
          </div>
        )}

        <button className="absolute bottom-4 left-4 right-4 bg-purple-700 text-white py-4 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 shadow-xl shadow-purple-200">
          <ShoppingCart size={14} /> Add to Cart
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h4 className="font-black text-slate-800 text-[12px] uppercase tracking-tight line-clamp-1 flex-1">{p.name}</h4>
          <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded ml-2">{p.stock} In Stock</span>
        </div>
        
        <div className="flex items-center gap-1.5 pb-4">
          <Star size={10} className="fill-orange-400 text-orange-400" />
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{p.rating} • {p.sold} Units Sold</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <p className="text-purple-700 font-black text-2xl tracking-tighter">${p.price.toFixed(2)}</p>
          <Link to={`/product/${p.id}`} className="p-2 rounded-full hover:bg-purple-50 text-slate-300 hover:text-purple-600 transition-colors">
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-900">
      <Navbar />

      {/* Hero Section - Refined with Glassmorphism */}
      <section className="relative h-[700px] bg-slate-950 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd" alt="Industrial" className="w-full h-full object-cover opacity-30 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="max-w-[1440px] mx-auto px-10 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full">
              <TrendingUp size={14} className="text-purple-400" />
              <span className="text-[10px] font-black uppercase tracking-[3px] text-purple-200">2026 Collection Live</span>
            </div>
            
            <h1 className="text-7xl md:text-[120px] font-black text-white uppercase tracking-tighter leading-[0.8] mb-8">
              Armor <br /> <span className="text-purple-600 italic">Evolution.</span>
            </h1>
            
            <p className="text-slate-400 text-lg font-medium mb-12 leading-relaxed max-w-lg">
              The next generation of PPE is here. Engineered for ASTU professionals who demand maximum safety without compromise.
            </p>

            <div className="flex gap-4">
              <Link to="/shop" className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[2px] flex items-center gap-3 transition-all shadow-2xl shadow-purple-600/40">
                Shop Collection <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <main className="max-w-[1440px] mx-auto px-10 py-24 space-y-32">
        
        {/* Featured Section */}
        <section>
          <div className="flex items-end justify-between mb-12 border-b border-slate-100 pb-8">
            <div className="space-y-2">
              <h2 className="text-5xl font-black uppercase tracking-tighter italic">Essential <span className="text-purple-600">Inventory</span></h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-[4px]">Verified Safety Standards Only</p>
            </div>
            <Sparkles className="text-purple-600 animate-bounce" size={32} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(p => <ProductCard key={p.id} p={p} label="Essential" />)}
          </div>
        </section>

      </main>

      {/* Modern Footer */}
      <footer className="p-6">
        <div className="bg-slate-950 text-white rounded-[3.5rem] p-16 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 border-b border-white/5 pb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-purple-600 p-2 rounded-xl"><Shield size={24} /></div>
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">Luu<span className="text-purple-600">Safety.</span></h2>
              </div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-loose max-w-md">
                Premier PPE Solutions across Ethiopia. Built on the Efoy Gebeya marketplace framework for reliability and speed.
              </p>
            </div>
            
            <div className="grid grid-cols-2 col-span-2 gap-8">
              <div>
                <h4 className="font-black uppercase text-[10px] text-purple-500 mb-8 tracking-[5px]">Portal</h4>
                <ul className="space-y-4 text-[11px] font-black uppercase tracking-[2px] text-slate-400">
                  <li><Link to="/shop" className="hover:text-white transition-colors">Marketplace</Link></li>
                  <li><Link to="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black uppercase text-[10px] text-purple-500 mb-8 tracking-[5px]">Contact</h4>
                <div className="space-y-4 text-[11px] font-black uppercase tracking-[2px] text-slate-400">
                  <p className="flex items-center gap-3"><MapPin size={14} /> Addis Ababa, ET</p>
                  <p className="flex items-center gap-3"><Phone size={14} /> +251 900 000 000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-12 text-center">
            <p className="text-[10px] font-black text-slate-700 uppercase tracking-[8px]">
              © 2026 Luu Safety • Marketplace Engine
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;