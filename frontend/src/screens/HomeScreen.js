import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ShoppingCart, ShieldCheck, Truck, Clock, Loader2, UserPlus, X 
} from 'lucide-react';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  // Handles the slide-in "Sorry" message
  const triggerAuthNotice = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products'); 
        setProducts(data);
        setLoading(false);
      } catch (error) {
        // Fallback data if API is not connected
        setProducts([
          { _id: '1', name: "Alpha Safety Helmet", price: 45.00, category: "Headwear", image: "https://images.pexels.com/photos/6492100/pexels-photo-6492100.jpeg" },
          { _id: '2', name: "High-Visibility Jacket", price: 120.00, category: "Workwear", image: "https://images.pexels.com/photos/7667442/pexels-photo-7667442.jpeg" },
          { _id: '3', name: "Industrial Coverall", price: 180.00, category: "Body Protection", image: "https://images.pexels.com/photos/8961555/pexels-photo-8961555.jpeg" },
          { _id: '4', name: "Reinforced Steel Boots", price: 95.00, category: "Footwear", image: "https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg" }
        ]);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white text-slate-800 font-sans relative overflow-x-hidden">
      
      {/* --- STYLISH SLIDE-IN NOTIFICATION --- */}
      <div className={`fixed top-24 right-10 z-[100] transform transition-all duration-500 ease-in-out ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}`}>
        <div className="bg-slate-900 text-white p-5 shadow-2xl border-l-4 border-blue-500 flex items-center gap-4 min-w-[300px]">
          <div className="bg-blue-500/10 p-2">
            <ShieldCheck className="text-blue-500" size={24} />
          </div>
          <div className="flex-1">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Authentication Required</h5>
            <p className="text-xs font-bold text-slate-300">Sorry, please sign up to purchase.</p>
          </div>
          <button onClick={() => setShowToast(false)} className="text-slate-500 hover:text-white">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* 1. HERO SECTION - Left Aligned */}
      <section className="relative w-full h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg" 
            alt="PPE Equipment" 
            className="w-full h-full object-cover brightness-[0.35]" 
          />
        </div>

        <div className="relative z-10 px-8 md:px-24 max-w-4xl">
          <div className="w-16 h-1 bg-blue-600 mb-8"></div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter uppercase mb-10">
            Protection Engineered <br /> 
            <span className="text-blue-500">For Industry Leaders.</span>
          </h1>
          
          <button 
            onClick={() => navigate('/signup')} // CHANGED TO /signup
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center gap-4 shadow-2xl group"
          >
            <UserPlus size={18} className="group-hover:scale-110 transition-transform" /> Sign Up Now
          </button>
        </div>
      </section>

      {/* 2. LOGISTICS SECTION - Left Aligned */}
      <section className="py-24 px-6 md:px-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto text-left">
          <div className="flex flex-col mb-16 border-l-4 border-blue-600 pl-6">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Global Service Standards</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Durable Logistics for Hard Environments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-start">
              <Truck className="text-blue-600 mb-6" size={40} />
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Quick Delivery</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest">Worksite Shipping</p>
            </div>
            <div className="flex flex-col items-start md:border-l border-slate-200 md:pl-10">
              <ShieldCheck className="text-blue-600 mb-6" size={40} />
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Certified PPE</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest">ISO Global Standards</p>
            </div>
            <div className="flex flex-col items-start md:border-l border-slate-200 md:pl-10">
              <Clock className="text-blue-600 mb-6" size={40} />
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">24/7 Support</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest">Technical Assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT INVENTORY */}
      <section className="bg-white py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
             <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Ready for Dispatch</h2>
             <div className="w-12 h-1 bg-blue-600 mt-4"></div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-600" size={32} /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((p) => (
                <div key={p._id} className="bg-white border border-slate-100 hover:shadow-2xl transition-all group">
                  <div className="h-72 overflow-hidden bg-slate-50 relative">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <h4 className="font-black text-slate-900 text-xs uppercase mb-1 tracking-tight">{p.name}</h4>
                    <p className="text-slate-400 text-[9px] font-bold uppercase mb-6 tracking-widest text-blue-600/60 font-black">LUU SAFETY</p>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                      <span className="text-2xl font-black text-slate-900">${p.price.toFixed(2)}</span>
                      <button 
                        onClick={triggerAuthNotice}
                        className="text-slate-300 hover:text-blue-600 transition-all hover:scale-110"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-slate-950 text-white py-16 px-6 text-center">
         <h2 className="text-xl font-black uppercase mb-4 tracking-tighter">LUU<span className="text-blue-500">SAFETY</span></h2>
         <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.5em]">© 2026 Engineered for Safety</p>
      </footer>
    </div>
  );
};

export default HomeScreen;