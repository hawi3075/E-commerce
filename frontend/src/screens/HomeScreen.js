import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Truck, Headset, Zap, 
  ArrowRight, Star, ShoppingCart, Search, 
  User, Bell, Moon, Sun, Globe, ChevronDown
} from 'lucide-react';

const LuuSafetyHome = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic Header Scroll Logic
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 1, name: 'Protective Clothing', image: 'https://images.unsplash.com/photo-1591193303642-1e969966113b', link: '/shop?cat=clothing' },
    { id: 2, name: 'Safety Footwear', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86', link: '/shop?cat=shoes' },
    { id: 3, name: 'Head Protection', image: 'https://images.unsplash.com/photo-1513188732907-5f732b831ca8', link: '/shop?cat=head' },
  ];

  const products = [
    { id: 101, name: 'Industrial Hard Hat', price: 25.00, rating: 5.0, sold: 124, stock: 18, image: 'https://images.unsplash.com/photo-1584285418504-0051b6d51f6e' },
    { id: 102, name: 'High-Vis Safety Vest', price: 12.99, rating: 4.9, sold: 89, stock: 46, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3' },
    { id: 103, name: 'Steel Toe Work Boots', price: 85.00, rating: 4.8, sold: 45, stock: 12, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
    { id: 104, name: 'Anti-Fog Goggles', price: 15.00, rating: 4.7, sold: 210, stock: 51, image: 'https://images.unsplash.com/photo-1599493758264-36cc4247f820' },
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans antialiased text-slate-900">
      
      {/* --- DYNAMIC HEADER (Ref: image_733c25) --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-md py-4'}`}>
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-purple-600 p-1.5 rounded-lg text-white"><Shield size={20} /></div>
            <span className="text-xl font-black italic tracking-tighter uppercase">Luu<span className="text-purple-600">Safety</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-bold uppercase tracking-tight text-slate-600">
            <Link to="/" className="text-purple-600 border-b-2 border-purple-600">Home</Link>
            <Link to="/shop" className="hover:text-purple-600 transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-purple-600 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-purple-600 transition-colors">Contact</Link>
          </nav>

          <div className="flex-1 max-w-md hidden md:flex items-center relative">
            <input type="text" placeholder="Search equipment..." className="w-full bg-slate-100 border-none rounded-full py-2.5 px-5 text-sm focus:ring-2 focus:ring-purple-600 transition-all" />
            <button className="absolute right-1 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors"><Search size={16} /></button>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <div className="hidden xl:flex items-center gap-4 border-x border-slate-200 px-4">
              <button className="flex items-center gap-1 text-[11px] font-bold uppercase">English <ChevronDown size={14} /></button>
              <button className="flex items-center gap-1 text-[11px] font-bold uppercase">EUR <ChevronDown size={14} /></button>
              <button className="hover:text-purple-600 transition-colors"><Moon size={18} /></button>
            </div>
            <button className="relative hover:text-purple-600"><Bell size={20} /><span className="absolute -top-1 -right-1 bg-purple-600 text-[8px] text-white w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">3</span></button>
            <button className="hover:text-purple-600"><User size={20} /></button>
            <button className="relative hover:text-purple-600"><ShoppingCart size={20} /><span className="absolute -top-1 -right-1 bg-slate-900 text-[8px] text-white w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">0</span></button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[600px] bg-slate-900 overflow-hidden pt-0 mt-0">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1" alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 h-full flex flex-col justify-center text-white">
          <div className="flex items-center gap-2 mb-4 bg-white/10 w-max px-3 py-1 rounded-full backdrop-blur-md">
            <Zap size={14} className="text-purple-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Premium Safety Gear</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[0.9] uppercase tracking-tighter">
            Elevate <br /> <span className="text-purple-500 italic">Workplace.</span>
          </h1>
          <p className="max-w-xl text-slate-300 mb-10 text-lg font-medium leading-relaxed">
            Industrial-grade personal protective equipment (PPE) engineered for maximum durability and safety in Ethiopia's hardest environments.
          </p>
          <Link to="/shop" className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest w-max flex items-center gap-3 transition-all transform hover:-translate-y-1">
            Explore Shop <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Shield, title: 'Secure Payments', desc: 'Protected by Luu' },
            { icon: Truck, title: 'Free Shipping', desc: 'Across All Ethiopia' },
            { icon: Headset, title: 'Expert Support', desc: 'Certified Assistance' },
            { icon: Zap, title: 'Flash Deals', desc: 'Safety Discounts' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 justify-center">
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600"><item.icon size={22} /></div>
              <div>
                <h4 className="font-black text-[11px] uppercase tracking-tight text-slate-800 leading-none mb-1">{item.title}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SHOP BY CATEGORY (Ref: image_3abc51) --- */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[5px] text-purple-600">Inventory</span>
            <h3 className="text-4xl font-black uppercase italic tracking-tighter mt-2 text-slate-900">Shop by Category</h3>
          </div>
          <Link to="/shop" className="text-xs font-black uppercase text-slate-400 hover:text-purple-600 flex items-center gap-2 tracking-widest transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.id} className="relative h-80 rounded-[2rem] overflow-hidden group border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h4 className="text-2xl font-black text-white uppercase mb-4">{cat.name}</h4>
                <Link to={cat.link} className="bg-purple-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-purple-600 transition-all">Explore Items</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- NEW MATERIAL ARRIVED (Ref: image_08cf36) --- */}
      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <h3 className="text-3xl font-black uppercase italic mb-10 tracking-tighter">New Material Arrived</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            { id: 1, name: 'Tactical Kevlar Gloves', price: 45, image: 'https://images.unsplash.com/photo-1590674839382-7460356fd0a1' },
            { id: 2, name: 'Oxygen Respirator V2', price: 120, image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074' },
          ].map((item) => (
            <div key={item.id} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden flex shadow-sm hover:shadow-lg transition-all group">
              <div className="w-1/2 bg-slate-50 relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="w-1/2 p-12 flex flex-col justify-center">
                <span className="text-purple-600 font-black text-[10px] uppercase mb-4 tracking-widest">Featured Item</span>
                <h4 className="text-2xl font-black uppercase mb-4 leading-tight">{item.name}</h4>
                <p className="text-3xl font-black text-purple-700 mb-8">${item.price}</p>
                <button className="bg-slate-900 text-white px-8 py-3.5 rounded-lg text-[10px] font-black uppercase hover:bg-purple-600 transition-colors w-max">Shop Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- BESTSELLERS / FOR YOU (Ref: image_08f13a & image_08f0f6) --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white rotate-12 shadow-lg shadow-purple-200"><Star className="fill-white" size={24} /></div>
            <h3 className="text-4xl font-black uppercase italic tracking-tighter">Bestsellers</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-2xl transition-all group relative">
                <div className="relative h-64 bg-white rounded-2xl mb-6 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                  <span className="absolute top-4 left-4 bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{p.stock} in stock</span>
                  <button className="absolute bottom-4 left-4 right-4 bg-purple-600 text-white py-3 rounded-xl text-[11px] font-black uppercase flex items-center justify-center gap-2 translate-y-20 group-hover:translate-y-0 transition-transform shadow-xl shadow-purple-200"><ShoppingCart size={16} /> Add to Cart</button>
                </div>
                <h4 className="font-black text-slate-800 text-sm uppercase mb-2 leading-tight tracking-tight">{p.name}</h4>
                <div className="flex items-center gap-1.5 mb-4">
                  <Star size={14} className="fill-orange-400 text-orange-400" />
                  <span className="text-[10px] font-black text-slate-400">{p.rating} | {p.sold} SOLD</span>
                </div>
                <p className="text-purple-700 font-black text-2xl tracking-tighter">${p.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER (Ref: image_08f0be) --- */}
      <footer className="bg-black text-white pt-24 pb-12 rounded-t-[4rem]">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-3xl font-black italic tracking-tighter mb-8 uppercase leading-none">Luu<span className="text-purple-600">Safety.</span></h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">Your trusted marketplace for industrial-grade protection. Built for reliability, fast delivery, and premium quality across Ethiopia.</p>
          </div>
          <div>
            <h4 className="font-black uppercase text-[10px] text-slate-500 mb-8 tracking-[4px]">Quick Links</h4>
            <ul className="space-y-4 text-[13px] font-bold text-slate-300">
              <li><Link to="/" className="hover:text-purple-500 transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-purple-500 transition-colors">Shop</Link></li>
              <li><Link to="/contact" className="hover:text-purple-500 transition-colors">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-[10px] text-slate-500 mb-8 tracking-[4px]">Customer</h4>
            <ul className="space-y-4 text-[13px] font-bold text-slate-300">
              <li><Link to="/account" className="hover:text-purple-500 transition-colors">My Account</Link></li>
              <li><Link to="/orders" className="hover:text-purple-500 transition-colors">Check Orders</Link></li>
              <li><Link to="/privacy" className="hover:text-purple-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-[10px] text-slate-500 mb-8 tracking-[4px]">Headquarters</h4>
            <p className="text-[13px] font-bold text-slate-300">Bole Road, Addis Ababa</p>
            <p className="text-[13px] font-bold text-slate-300 mt-2">+251 911 223344</p>
            <p className="text-[13px] font-bold text-purple-600 mt-2">hub@luusafety.com</p>
          </div>
        </div>
        <div className="text-center pt-10 border-t border-slate-900 text-[10px] font-black text-slate-600 uppercase tracking-[10px]">
          © 2026 LUU SAFETY MARKETPLACE • EFOY GEBEYA ENGINE
        </div>
      </footer>
    </div>
  );
};

export default LuuSafetyHome;