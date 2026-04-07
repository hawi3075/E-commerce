import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Loader2, UserPlus, X } from 'lucide-react';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  // Category List
  const categories = ['All', 'Headwear', 'Workwear', 'Body Protection', 'Footwear'];

  const triggerAuthNotice = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetching live data from your MongoDB via Mongoose backend
        const { data } = await axios.get('/api/products'); 
        setProducts(data);
      } catch (error) {
        console.error("API Error:", error);
        setProducts([]); // Strict: no mock data shown
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter logic
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-white text-slate-800 font-sans relative">
      
      {/* AUTH NOTIFICATION */}
      <div className={`fixed top-24 right-10 z-[100] transform transition-all duration-500 ease-in-out ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}`}>
        <div className="bg-slate-900 text-white p-5 shadow-2xl border-l-4 border-blue-500 flex items-center gap-4 min-w-[300px]">
          <div className="flex-1">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Authentication Required</h5>
            <p className="text-xs font-bold text-slate-300">Please sign up to purchase products.</p>
          </div>
          <button onClick={() => setShowToast(false)} className="text-slate-500 hover:text-white">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg" 
            alt="PPE Equipment" 
            className="w-full h-full object-cover brightness-[0.35]" 
          />
        </div>

        <div className="relative z-10 px-8 md:px-24 max-w-4xl">
          <div className="w-16 h-1 bg-blue-600 mb-8"></div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase mb-10">
            High Performance <br /> 
            <span className="text-blue-500">Safety Gear.</span>
          </h1>
          
          <button 
            onClick={() => navigate('/signup')} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center gap-4 shadow-2xl group"
          >
            <UserPlus size={18} /> Join AuraSync
          </button>
        </div>
      </section>

      {/* 2. DYNAMIC CATEGORY FILTER */}
      <div className="sticky top-[64px] z-[40] bg-white border-b border-slate-100 py-6 px-8 flex justify-center gap-2 md:gap-8 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-full
              ${selectedCategory === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. PRODUCT INVENTORY */}
      <section className="bg-white py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
             <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Available Safety Gear</h2>
             <div className="w-12 h-1 bg-blue-600 mt-4"></div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No equipment found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {filteredProducts.map((p) => (
                <div key={p._id} className="bg-white group cursor-pointer" onClick={() => navigate(`/product/${p._id}`)}>
                  <div className="h-80 overflow-hidden bg-slate-50 relative rounded-2xl mb-6">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  <div className="px-2">
                    <p className="text-blue-600 text-[9px] font-black uppercase tracking-widest mb-1">{p.category}</p>
                    <h4 className="font-black text-slate-900 text-sm uppercase mb-4 truncate">{p.name}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-slate-900">${p.price.toFixed(2)}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents navigating to product page
                          triggerAuthNotice();
                        }}
                        className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white py-12 px-6 text-center border-t border-slate-900">
         <h2 className="text-xl font-black uppercase mb-4 tracking-tighter">LUU<span className="text-blue-500">SAFETY</span></h2>
         <p className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.4em]">© 2026 AuraSync Industrial Solutions</p>
      </footer>
    </div>
  );
};

export default HomeScreen;