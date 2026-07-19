import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, ArrowRight, Star, ShoppingCart, 
  MapPin, Phone, Eye, Heart, 
  Grid, Clock, UserCheck, TrendingUp
} from 'lucide-react';

import Navbar from '../components/Navbar';

// Reusable Modular Layout Components (Light Mode)
const ProductCard = ({ p, ribbon, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-100 hover:border-purple-200 shadow-sm hover:shadow-md transition-all duration-300 group relative flex flex-col justify-between">
      <div className="relative h-48 bg-slate-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center border border-slate-100">
        <img 
          src={p.image} 
          alt={p.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          loading="lazy"
        />
        
        {ribbon && (
          <span className="absolute top-3 left-3 bg-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm z-10">
            {ribbon}
          </span>
        )}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-700 border border-slate-100 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase z-10">
          {p.stock ? `${p.stock} Units` : 'In Stock'}
        </span>

        <div className="absolute inset-y-0 right-3 flex flex-col justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
            className="p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-purple-600 shadow-sm transition-colors"
          >
            <Heart size={14} className={isLiked ? "fill-purple-600 text-purple-600" : ""} />
          </button>
          <Link 
            to={`/product/${p.id}`} 
            aria-label={`View quick details for ${p.name}`}
            className="p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-purple-600 shadow-sm transition-colors"
          >
            <Eye size={14} />
          </Link>
        </div>
      </div>

      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={`${i < Math.round(p.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
            ))}
            {p.sold && <span className="text-[10px] text-slate-400 font-medium ml-1">({p.sold} Sold)</span>}
          </div>
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide line-clamp-2 mb-0.5 min-h-[2rem]">{p.name}</h4>
          {p.efficiency && <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{p.efficiency}</p>}
          {p.release && <p className="text-[9px] font-bold text-purple-600 uppercase tracking-wider">{p.release}</p>}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">Asset Value</span>
            <p className="text-slate-900 font-black text-base">${p.price.toFixed(2)}</p>
          </div>
          <button 
            onClick={() => onAddToCart(p)}
            aria-label={`Add ${p.name} to cart`}
            className="bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-xl transition-all shadow-md shadow-purple-600/10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const HomeScreen = () => {
  const navigate = useNavigate();

  // Updated categories to match your Shop layout precisely
  const categories = [
    { 
      id: 'headwear', 
      name: 'Headwear', 
      count: 14, 
      image: 'https://images.unsplash.com/photo-1590483736622-39da8caf3ef8?auto=format&fit=crop&q=80&w=200', 
      gradient: 'from-purple-100 to-purple-50' 
    },
    { 
      id: 'workwear', 
      name: 'Workwear', 
      count: 28, 
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=200', 
      gradient: 'from-blue-100 to-blue-50' 
    },
    { 
      id: 'footwear', 
      name: 'Footwear', 
      count: 19, 
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=200', 
      gradient: 'from-amber-100 to-amber-50' 
    },
  ];

  const bestSellers = [
    { id: 1, name: 'Vanguard Industrial Hard Hat', price: 25.00, rating: 5.0, sold: 1240, stock: 18, image: 'https://images.unsplash.com/photo-1590483736622-39da8caf3ef8?auto=format&fit=crop&q=80&w=500', efficiency: 'High Performance' },
    { id: 2, name: 'Aegis High-Vis Safety Vest', price: 12.99, rating: 4.9, sold: 890, stock: 46, image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=500', efficiency: 'Max Visibility' },
    { id: 3, name: 'Titan Steel Toe Work Boots', price: 85.00, rating: 4.8, sold: 745, stock: 12, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=500', efficiency: 'Heavy Duty' },
    { id: 4, name: 'Anti-Fog Ballistic Goggles', price: 15.00, rating: 4.7, sold: 610, stock: 51, image: 'https://images.unsplash.com/photo-1551150431-993b1139ecc5?auto=format&fit=crop&q=80&w=500', efficiency: 'Clear Telemetry' },
  ];

  const newArrivals = [
    { id: 5, name: 'Mantis Thermal Shield Gloves', price: 19.50, rating: 5.0, sold: 34, stock: 8, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=500', release: '2026 Batch A' }, 
    { id: 6, name: 'Pro Arc Welding Face Shield', price: 42.00, rating: 4.9, sold: 12, stock: 15, image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=500', release: 'Next-Gen Core' },
    { id: 7, name: 'Apex Multi-Pocket Cargo Rig', price: 49.99, rating: 4.6, sold: 18, stock: 22, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500', release: '2026 Batch B' },
    { id: 8, name: 'Kevlar Reinforced Sleeves', price: 29.00, rating: 4.8, sold: 25, stock: 30, image: 'https://images.unsplash.com/photo-158109335397-9583fe92d232?auto=format&fit=crop&q=80&w=500', release: 'Ultra Shield' }
  ];

  const forYouItems = [
    { id: 9, name: 'Universal Heavy Duty Gear Package', price: 120.00, rating: 5.0, match: '98% Match', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=500' },
    { id: 10, name: 'Premium Ergo Fall-Arrest Harness', price: 145.00, rating: 4.9, match: '95% Match', image: 'https://images.unsplash.com/photo-1606166325683-e6deb697d30a?auto=format&fit=crop&q=80&w=500' },
  ];

  const handleAddToCart = (product) => {
    console.log(`Dispatched ${product.name} to checkout session tracking array.`);
  };

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-600 relative overflow-x-hidden">
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>

      <Navbar />

      {/* Header / Hero Section */}
      <section 
        className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1600')` }}
      >
        <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10 py-16">
          
          <div className="max-w-xl space-y-5 animate-float">
            {/* "Premium Industrial Resource" badge successfully removed from here */}
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
              Defend <br /> Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300 italic drop-shadow-[0_4px_12px_rgba(147,51,234,0.5)]">Workforce.</span>
            </h1>
            
            <p className="text-white text-sm sm:text-base font-semibold leading-relaxed max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              High-fidelity protective armor, visibility gear, and high-tier utility instruments tailored for engineers and complex industrial operations.
            </p>
            
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="bg-purple-600 hover:bg-purple-700 text-white px-7 py-4 rounded-xl font-bold uppercase text-[10px] tracking-wider inline-flex items-center justify-center gap-2 transition-all shadow-xl shadow-slate-950/40 hover:shadow-purple-600/50 active:scale-[0.98]">
                Enter Marketplace <ArrowRight size={14} />
              </Link>
              <button 
                onClick={() => navigate('/contact')}
                className="bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm text-white px-7 py-4 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all active:scale-[0.98]"
              >
                Contact Support
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Global Trust Banner */}
      <section className="border-b border-slate-100 bg-white py-6">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ value: '100%', label: 'Certified Standards' }, { value: '24/7', label: 'Operations Sync' }, { value: 'OFFICIAL', label: 'Validated Hardware' }, { value: 'FAST', label: 'National Delivery' }].map((item, idx) => (
            <div key={idx} className="text-center space-y-0.5">
              <p className="text-lg font-black text-slate-800 tracking-tight">{item.value}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section - Matches Shop Filter Grid Layout */}
      <section className="max-w-[1200px] mx-auto px-6 pt-16">
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-purple-600 mb-1">
            <Grid size={12} />
            <span className="text-[9px] font-bold uppercase tracking-[2px]">Structural Sorting</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Shop By Category</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link 
              to={`/shop?category=${cat.id}`} 
              key={cat.id} 
              className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-purple-200 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between h-48"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-20`} />
              
              <div className="relative z-10 flex items-start justify-between w-full">
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wide">{cat.name}</h3>
                  <span className="text-[10px] text-slate-400 font-medium">{cat.count} Items</span>
                </div>
                
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200/60 shadow-sm shrink-0">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-purple-600 group-hover:text-purple-700 transition-colors pt-4 border-t border-slate-100/60 w-full">
                Explore Category 
                <ArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-6 py-16 space-y-16">
        
        {/* Best Sellers */}
        <section>
          <div className="flex items-end justify-between mb-6 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-purple-600 mb-1">
                <TrendingUp size={12} />
                <span className="text-[9px] font-bold uppercase tracking-[2px]">Top Moving Assets</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Best Sellers</h2>
            </div>
            <Link to="/shop?sort=best" className="text-[10px] font-bold uppercase tracking-wider text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1">
              View All <ArrowRight size={10} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bestSellers.map(p => <ProductCard key={p.id} p={p} ribbon="Top Value" onAddToCart={handleAddToCart} />)}
          </div>
        </section>

        {/* Informative Light Banner */}
        <section className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 lg:max-w-xl">
            <span className="text-purple-600 text-[9px] font-bold bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-md uppercase tracking-wider">Announcement</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Complete Structural Protection Framework</h2>
            <p className="text-slate-500 text-xs leading-relaxed font-medium">Every equipment cluster leaving our distribution grid holds valid international certifications (EN, ANSI).</p>
          </div>
          <div className="w-full lg:w-48 h-24 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
            <Shield size={36} className="text-purple-200" />
          </div>
        </section>

        {/* New Arrivals */}
        <section>
          <div className="flex items-end justify-between mb-6 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-purple-600 mb-1">
                <Clock size={12} />
                <span className="text-[9px] font-bold uppercase tracking-[2px]">Fresh Infrastructure</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">New Arrivals</h2>
            </div>
            <Link to="/shop?sort=new" className="text-[10px] font-bold uppercase tracking-wider text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1">
              View Latest <ArrowRight size={10} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {newArrivals.map(p => <ProductCard key={p.id} p={p} ribbon="2026 Spec" onAddToCart={handleAddToCart} />)}
          </div>
        </section>

        {/* Suggested
        <section className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8">
          <div className="mb-6 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-purple-600 mb-1">
              <UserCheck size={12} />
              <span className="text-[9px] font-bold uppercase tracking-[2px]">Engine Matching Intelligence</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Suggested For You</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forYouItems.map((item) => (
              <div key={item.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 group shadow-sm">
                <div className="w-24 h-24 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-slate-100 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  <span className="absolute bottom-1.5 left-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                    {item.match}
                  </span>
                </div>
                <div className="flex-1 space-y-3 text-left w-full">
                  <div>
                    <div className="flex items-center gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={8} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <h3 className="text-slate-800 font-bold text-xs uppercase tracking-wide line-clamp-1">{item.name}</h3>
                    <p className="text-slate-400 text-[9px] uppercase font-bold tracking-wider mt-0.5">Configured for High-Performance Operators</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <p className="text-slate-950 font-black text-base">${item.price.toFixed(2)}</p>
                    <Link to={`/product/${item.id}`} className="text-purple-600 hover:text-purple-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-0.5">
                      Configure <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
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
                <h4 className="font-bold uppercase text-[10px] text-purple-600 mb-3 tracking-wider">System</h4>
                <ul className="space-y-1.5 text-[10px] font-semibold uppercase text-slate-500">
                  <li><Link to="/shop" className="hover:text-purple-600">Marketplace</Link></li>
                  <li><Link to="/contact" className="hover:text-purple-600">Contact Hub</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase text-[10px] text-purple-600 mb-3 tracking-wider">Contact</h4>
                <div className="space-y-1 text-[10px] font-semibold text-slate-400 uppercase">
                  <p className="flex items-center gap-1.5"><MapPin size={10} /> Addis Ababa</p>
                  <p className="flex items-center gap-1.5"><Phone size={10} /> +251 900 000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 text-center">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              © 2026 Luu Safety Systems • Efoy Engine
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;