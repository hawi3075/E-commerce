import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Shield, ShoppingCart, Star, Filter, ArrowUpDown } from 'lucide-react';

const ProductScreen = () => {
  const [activeCategory, setActiveCategory] = useState('All Gear');

  // Replace this mock data with your actual API fetch logic later
  const products = [
    { id: 1, name: 'Tactical Kevlar Gloves', price: 45.00, rating: 5.0, stock: 12, image: 'https://images.unsplash.com/photo-1584285418504-0051b6d51f6e' },
    { id: 2, name: 'Oxygen Respirator V2', price: 120.00, rating: 4.9, stock: 5, image: 'https://images.unsplash.com/photo-1599493758264-36cc4247f820' },
    { id: 3, name: 'Industrial Hard Hat', price: 25.00, rating: 4.8, stock: 18, image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1' },
    { id: 4, name: 'High-Vis Safety Vest', price: 15.99, rating: 4.7, stock: 46, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3' },
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <Navbar />

      <section className="max-w-[1440px] mx-auto px-6 pt-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          Professional <span className="text-blue-600">Gear</span>
        </h1>
        <p className="text-slate-500 text-sm mb-8">High-performance safety equipment for ASTU engineers.</p>

        {/* Category Filter Chips */}
        <div className="flex gap-3 mb-10">
          {['All Gear', 'Headwear', 'Workwear', 'Footwear'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-[11px] font-black uppercase border transition-all ${
                activeCategory === cat ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* REMOVED: Scanning Inventory Placeholder */}
        {/* ADDED: Functional Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-20">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all">
              <div className="h-64 bg-slate-50 relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <button className="absolute bottom-4 left-4 right-4 bg-blue-600 text-white py-3 rounded-xl text-[10px] font-black uppercase translate-y-20 group-hover:translate-y-0 transition-transform flex items-center justify-center gap-2">
                  <ShoppingCart size={14} /> Add to Cart
                </button>
              </div>
              <div className="p-5">
                <h4 className="font-black text-sm uppercase mb-1">{product.name}</h4>
                <div className="flex items-center gap-1 mb-3">
                  <Star size={10} className="fill-orange-400 text-orange-400" />
                  <span className="text-[9px] font-black text-slate-400">{product.rating}</span>
                </div>
                <p className="text-2xl font-black">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reused Footer from your design */}
      <footer className="bg-black text-white rounded-t-[3rem] pt-20 pb-10 px-10">
        <div className="max-w-[1440px] mx-auto text-center border-b border-white/10 pb-10">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[5px]">
            © 2026 Luu Safety Marketplace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProductScreen;