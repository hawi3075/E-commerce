import React, { useState } from 'react';
// Using your already existing Navbar component
import Navbar from '../components/Navbar';
import { 
  Shield, 
  ShoppingCart, 
  Star, 
  Filter, 
  ArrowUpDown 
} from 'lucide-react';

const ProductScreen = () => {
  const [activeCategory, setActiveCategory] = useState('All Gear');

  const categories = [
    { name: 'All Gear', count: 34 },
    { name: 'Headwear', count: 12 },
    { name: 'Workwear', count: 8 },
    { name: 'Footwear', count: 6 }
  ];

  const products = [
    { id: 1, name: 'Industrial Hard Hat', price: 25.00, rating: 5.0, stock: 18, image: 'https://images.unsplash.com/photo-1584285418504-0051b6d51f6e' },
    { id: 2, name: 'High-Vis Safety Vest', price: 12.99, rating: 4.9, stock: 46, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3' },
    { id: 3, name: 'Steel Toe Work Boots', price: 85.00, rating: 4.8, stock: 12, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
    { id: 4, name: 'Anti-Fog Goggles', price: 15.00, rating: 4.7, stock: 51, image: 'https://images.unsplash.com/photo-1599493758264-36cc4247f820' },
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans">
      <Navbar />

      {/* Header Section */}
      <section className="max-w-[1440px] mx-auto px-6 pt-12 pb-8">
        <h1 className="text-4xl font-black mb-2 tracking-tighter uppercase">
          Professional <span className="text-blue-600">Gear</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium tracking-wide mb-8">
          High-performance safety equipment for ASTU engineers.
        </p>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all ${
                activeCategory === cat.name
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Product List */}
      <main className="max-w-[1440px] mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Showing {products.length} products
            </span>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
            <ArrowUpDown size={14} /> Newest First
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-64 relative bg-slate-50 overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-4 right-4 bg-green-50 text-green-600 text-[9px] font-black px-2 py-1 rounded-full uppercase">
                  {p.stock} in stock
                </span>
                <button className="absolute bottom-4 left-4 right-4 bg-blue-600 text-white py-3 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 translate-y-20 group-hover:translate-y-0 transition-transform shadow-xl">
                  <ShoppingCart size={14} /> Add to Cart
                </button>
              </div>
              <div className="p-5">
                <h4 className="font-black text-slate-800 text-sm uppercase mb-1">{p.name}</h4>
                <div className="flex items-center gap-1.5 mb-3">
                  <Star size={10} className="fill-orange-400 text-orange-400" />
                  <span className="text-[9px] font-black text-slate-400">{p.rating} (Verified)</span>
                </div>
                <p className="text-slate-900 font-black text-2xl tracking-tighter">${p.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-black text-white rounded-t-[3rem] pt-20 pb-10 px-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="text-blue-500" />
              <h2 className="text-2xl font-black italic tracking-tighter uppercase">Luu<span className="text-blue-500">Safety.</span></h2>
            </div>
            <p className="text-slate-400 text-[10px] font-bold leading-relaxed uppercase tracking-widest max-w-[250px]">
              Providing excellent service across Ethiopia.
            </p>
          </div>
          <div className="flex justify-around md:col-span-2">
            <div>
              <h4 className="font-black uppercase text-[10px] mb-8 tracking-[4px]">Quick Links</h4>
              <ul className="space-y-4 text-[11px] font-black uppercase text-slate-400">
                <li className="hover:text-blue-500 cursor-pointer">Shop</li>
                <li className="hover:text-blue-500 cursor-pointer">Account</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-[10px] mb-8 tracking-[4px]">Headquarters</h4>
              <p className="text-[11px] font-black uppercase text-slate-400">Bole Road, Addis Ababa</p>
            </div>
          </div>
        </div>
        <p className="pt-10 text-[9px] font-black text-slate-500 uppercase tracking-[5px] text-center">
          © 2026 Luu Safety Marketplace. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ProductScreen;