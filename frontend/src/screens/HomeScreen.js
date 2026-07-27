import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Shield, ArrowRight, Star, ShoppingCart, 
  MapPin, Phone, Eye, Heart, 
  Grid, Clock, UserCheck, TrendingUp, Loader2,
  Lock, Truck, Headset, Headphones
} from 'lucide-react';

import Navbar from '../components/Navbar';
import headerVideo from '../components/luu.webm';

// Reusable Modular Layout Components
const ProductCard = ({ p, ribbon, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);

  // Normalize image and ID fields between backend data and static mock data
  const imageUrl = p.image || 'https://via.placeholder.com/500';
  const productId = p._id || p.id;
  const productName = p.product_name || p.name;
  const productPrice = p.price ? Number(p.price) : 0;
  const productStock = p.countInStock !== undefined ? p.countInStock : p.stock;

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-200/80 hover:border-purple-300 shadow-sm hover:shadow-md transition-all duration-300 group relative flex flex-col justify-between">
      <div className="relative h-48 bg-slate-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center border border-slate-100">
        <img 
          src={imageUrl} 
          alt={productName} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          loading="lazy"
        />
        
        {ribbon && (
          <span className="absolute top-3 left-3 bg-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm z-10">
            {ribbon}
          </span>
        )}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-700 border border-slate-100 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase z-10">
          {productStock !== undefined ? `${productStock} Units` : 'In Stock'}
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
            to={`/product/${productId}`} 
            aria-label={`View quick details for ${productName}`}
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
              <Star key={i} size={10} className={`${i < Math.round(p.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
            ))}
            {p.sold && <span className="text-[10px] text-slate-400 font-medium ml-1">({p.sold} Sold)</span>}
          </div>
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide line-clamp-2 mb-0.5 min-h-[2rem]">{productName}</h4>
          {p.efficiency && <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{p.efficiency}</p>}
          {p.release && <p className="text-[9px] font-bold text-purple-600 uppercase tracking-wider">{p.release}</p>}
          {p.category && <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{p.category}</p>}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">Asset Value</span>
            <p className="text-slate-900 font-black text-base">${productPrice.toFixed(2)}</p>
          </div>
          <button 
            onClick={() => onAddToCart(p)}
            aria-label={`Add ${productName} to cart`}
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

  // Dynamic Backend Products State
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch live products uploaded to the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        if (Array.isArray(data)) {
          setApiProducts(data);
        }
      } catch (error) {
        console.error('Error fetching live backend products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Categories definition
  const categories = [
    { 
      id: 'Head Protection', 
      name: 'Headwear', 
      count: 14, 
      image: 'https://images.unsplash.com/photo-1590483736622-39da8caf3ef8?auto=format&fit=crop&q=80&w=200', 
      gradient: 'from-purple-100 to-purple-50' 
    },
    { 
      id: 'High-Visibility', 
      name: 'Workwear', 
      count: 28, 
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=200', 
      gradient: 'from-blue-100 to-blue-50' 
    },
    { 
      id: 'Safety Shoes', 
      name: 'Footwear', 
      count: 19, 
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=200', 
      gradient: 'from-amber-100 to-amber-50' 
    },
  ];

  // Static Mock Items with ratings and likes for algorithm sorting
  const staticProducts = [
    { id: '1', name: 'Vanguard Industrial Hard Hat', price: 25.00, rating: 5.0, likes: 320, sold: 1240, stock: 18, image: 'https://images.unsplash.com/photo-1590483736622-39da8caf3ef8?auto=format&fit=crop&q=80&w=500', efficiency: 'High Performance' },
    { id: '2', name: 'Aegis High-Vis Safety Vest', price: 12.99, rating: 4.9, likes: 290, sold: 890, stock: 46, image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=500', efficiency: 'Max Visibility' },
    { id: '3', name: 'Titan Steel Toe Work Boots', price: 85.00, rating: 4.8, likes: 210, sold: 745, stock: 12, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=500', efficiency: 'Heavy Duty' },
    { id: '4', name: 'Anti-Fog Ballistic Goggles', price: 15.00, rating: 4.7, likes: 180, sold: 610, stock: 51, image: 'https://images.unsplash.com/photo-1551150431-993b1139ecc5?auto=format&fit=crop&q=80&w=500', efficiency: 'Clear Telemetry' },
    { id: '5', name: 'Mantis Thermal Shield Gloves', price: 19.50, rating: 5.0, likes: 450, sold: 34, stock: 8, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=500', release: '2026 Batch A' }, 
    { id: '6', name: 'Pro Arc Welding Face Shield', price: 42.00, rating: 4.9, likes: 380, sold: 12, stock: 15, image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=500', release: 'Next-Gen Core' },
    { id: '7', name: 'Apex Multi-Pocket Cargo Rig', price: 49.99, rating: 4.6, likes: 110, sold: 18, stock: 22, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500', release: '2026 Batch B' },
    { id: '8', name: 'Universal Heavy Duty Gear Package', price: 120.00, rating: 5.0, likes: 520, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=500' },
    { id: '9', name: 'Premium Ergo Fall-Arrest Harness', price: 145.00, rating: 4.9, likes: 410, image: 'https://images.unsplash.com/photo-1606166325683-e6deb697d30a?auto=format&fit=crop&q=80&w=500' },
  ];

  // Dynamically merge live fetched items with static items
  const productsSource = apiProducts.length > 0 ? apiProducts : staticProducts;

  const bestSellers = productsSource.slice(0, 4);
  const newArrivals = productsSource.length > 4 ? productsSource.slice(4, 8) : productsSource.slice(0, 4);

  // High Rating / High Likes Recommendation Algorithm
  const suggestedForYou = [...productsSource]
    .sort((a, b) => {
      const scoreA = ((a.rating || 4.5) * 10) + (a.likes || a.sold || 0);
      const scoreB = ((b.rating || 4.5) * 10) + (b.likes || b.sold || 0);
      return scoreB - scoreA;
    })
    .slice(0, 2);

  const handleAddToCart = (product) => {
    const productName = product.product_name || product.name;
    console.log(`Dispatched ${productName} to checkout session tracking array.`);
  };

  return (
    <div className="bg-slate-100 min-h-screen font-sans antialiased text-slate-600 relative overflow-x-hidden">
      
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

      {/* Header / Hero Section with Video Background */}
      <section className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden bg-slate-900">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
        >
          <source src={headerVideo} type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Video Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-transparent z-0" />

        <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10 py-16">
          <div className="max-w-xl space-y-5 animate-float">
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

      {/* Global Trust Banner - Updated Feature Set */}
      <section className="border-b border-slate-200/80 bg-white py-6 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl shrink-0">
              <Lock size={20} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-800 uppercase tracking-tight">Secure Payment</p>
              <p className="text-[10px] font-semibold text-slate-400">Encrypted Transactions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-800 uppercase tracking-tight">Free Shipping</p>
              <p className="text-[10px] font-semibold text-slate-400">On Qualified Orders</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl shrink-0">
              <Headset size={20} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-800 uppercase tracking-tight">Dedicated Support</p>
              <p className="text-[10px] font-semibold text-slate-400">Direct Engineer Consultation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl shrink-0">
              <Headphones size={20} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-800 uppercase tracking-tight">24/7 Service</p>
              <p className="text-[10px] font-semibold text-slate-400">Always Operational</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
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
              to={`/shop?category=${encodeURIComponent(cat.id)}`} 
              key={cat.id} 
              className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-purple-300 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between h-48 shadow-sm"
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
          <div className="flex items-end justify-between mb-6 border-b border-slate-200/80 pb-4">
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
          
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-purple-600" size={24} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bestSellers.map(p => <ProductCard key={p._id || p.id} p={p} ribbon="Top Value" onAddToCart={handleAddToCart} />)}
            </div>
          )}
        </section>

        {/* Enhanced Announcement Note */}
        <section className="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-900 border border-purple-800/40 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-lg text-white">
          <div className="space-y-2 lg:max-w-2xl">
            <span className="text-purple-300 text-[9px] font-bold bg-purple-900/60 border border-purple-700/50 px-2.5 py-1 rounded-md uppercase tracking-wider">
              System Announcement
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">
              Nationwide Logistics Sync & Enterprise Bulk Program
            </h2>
            <p className="text-purple-200/90 text-xs leading-relaxed font-medium">
              We now offer free nationwide delivery on all certified protective gear orders. Enterprise partners and safety officers can unlock bulk pricing tiers up to 25% off directly at checkout.
            </p>
          </div>
          <div className="w-full lg:w-48 h-24 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm shrink-0">
            <Shield size={32} className="text-purple-300" />
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-purple-200">ISO Certified</span>
          </div>
        </section>

        {/* New Arrivals */}
        <section>
          <div className="flex items-end justify-between mb-6 border-b border-slate-200/80 pb-4">
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

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-purple-600" size={24} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {newArrivals.map(p => <ProductCard key={p._id || p.id} p={p} ribbon="2026 Spec" onAddToCart={handleAddToCart} />)}
            </div>
          )}
        </section>

        {/* Suggested For You - Algorithmic Ranking */}
        <section className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="mb-6 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-purple-600 mb-1">
              <UserCheck size={12} />
              <span className="text-[9px] font-bold uppercase tracking-[2px]">Rating & Likes Algorithm</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Suggested For You</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestedForYou.map((item) => {
              const pId = item._id || item.id;
              const pName = item.product_name || item.name;
              const pPrice = item.price ? Number(item.price) : 0;
              const pImg = item.image || 'https://via.placeholder.com/500';

              return (
                <div key={pId} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 group shadow-sm">
                  <div className="w-24 h-24 bg-white rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-slate-100 relative">
                    <img src={pImg} alt={pName} className="w-full h-full object-cover" loading="lazy" />
                    <span className="absolute bottom-1.5 left-1.5 bg-purple-600 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      ★ {item.rating || 5.0}
                    </span>
                  </div>
                  <div className="flex-1 space-y-3 text-left w-full">
                    <div>
                      <div className="flex items-center gap-0.5 mb-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={8} className="fill-amber-400 text-amber-400" />)}
                        <span className="text-[9px] text-purple-600 font-bold ml-1">{item.likes || item.sold || 350} Likes</span>
                      </div>
                      <h3 className="text-slate-800 font-bold text-xs uppercase tracking-wide line-clamp-1">{pName}</h3>
                      <p className="text-slate-400 text-[9px] uppercase font-bold tracking-wider mt-0.5">Top-Ranked Safety Asset</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <p className="text-slate-950 font-black text-base">${pPrice.toFixed(2)}</p>
                      <Link to={`/product/${pId}`} className="text-purple-600 hover:text-purple-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-0.5">
                        Configure <ArrowRight size={10} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="p-4 bg-white border-t border-slate-200/80">
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