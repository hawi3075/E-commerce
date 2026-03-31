import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // CRITICAL: This was missing!
import { Search, ShoppingCart, Filter, Shield, Info, Star } from 'lucide-react';

const ProductScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const categories = [
    "All Products", "Head Protection", "High-Visibility", 
    "Hand Protection", "Footwear", "Body Armor"
  ];

  const allProducts = [
    { 
      id: 1, 
      name: "Titanium Series Helmet", 
      price: 55.00, 
      material: "High-Density Polyethylene (HDPE)", 
      rating: 4.8,
      img: "https://images.pexels.com/photos/6492100/pexels-photo-6492100.jpeg" 
    },
    { 
      id: 2, 
      name: "Neon-Guard Reflective Vest", 
      price: 29.99, 
      material: "Breathable Polyester Mesh", 
      rating: 4.5,
      img: "https://images.pexels.com/photos/7667442/pexels-photo-7667442.jpeg" 
    },
    { 
      id: 3, 
      name: "Kevlar Reinforced Gloves", 
      price: 15.50, 
      material: "Synthetic Leather & Kevlar Stitching", 
      rating: 4.9,
      img: "https://images.pexels.com/photos/5582869/pexels-photo-5582869.jpeg" 
    },
    { 
      id: 4, 
      name: "Steel-Toe Heavy Duty Boots", 
      price: 110.00, 
      material: "Full-Grain Leather & Steel Cap", 
      rating: 4.7,
      img: "https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg" 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      {/* Search Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search equipment..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Filter size={14} /> <span>Filter Results</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 grid md:grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-3">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-32">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat, i) => (
                <li key={i} className="text-sm font-bold text-gray-600 hover:text-blue-600 cursor-pointer py-1 transition-colors">
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Grid */}
        <main className="md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-5 flex-grow">
                  <h4 className="font-bold text-gray-900 text-sm mb-2">{p.name}</h4>
                  <div className="bg-blue-50 p-3 rounded-lg flex gap-2 items-start mb-4">
                    <Info size={14} className="text-blue-600 mt-0.5" />
                    <p className="text-[10px] font-bold text-blue-800 leading-tight">
                      MATERIAL: <span className="text-gray-600 font-medium block mt-1">{p.material}</span>
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                    <span className="text-lg font-black text-gray-900">${p.price}</span>
                    <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductScreen;