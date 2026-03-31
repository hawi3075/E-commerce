import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ShoppingCart, Award, CheckCircle, 
  ArrowRight, Truck, Clock, Loader2 
} from 'lucide-react';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products'); 
        setProducts(data);
        setLoading(false);
      } catch (error) {
        // Fallback mock data
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

  const handleAddToCart = (productId) => {
    const userInfo = localStorage.getItem('userInfo'); 
    if (!userInfo) {
      alert("Guest users can view details but cannot buy. Please Login.");
      navigate('/login');
    } else {
      navigate(`/cart/${productId}`);
    }
  };

  return (
    <div className="bg-white text-gray-800 font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION (Search & Badge Removed) */}
      <section className="relative w-full h-[80vh] flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg" 
            alt="PPE Equipment" 
            className="w-full h-full object-cover brightness-[0.4]" 
          />
        </div>

        <div className="relative z-10 px-6 md:px-16 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter uppercase">
            Protection Engineered <br /> for <span className="text-blue-500">Industry Leaders.</span>
          </h1>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => window.scrollTo({top: 900, behavior: 'smooth'})}
              className="bg-blue-600 text-white px-12 py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-900/40"
            >
              Browse Inventory
            </button>
            <button className="bg-white/5 border border-white/20 text-white px-10 py-5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
              Our Standards <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. MAXIMIZED TRUST FEATURES SECTION */}
      <section className="py-24 bg-slate-900 text-white px-6 md:px-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          
          <div className="flex flex-col items-start gap-6 group">
            <div className="w-16 h-16 bg-blue-600/10 border border-blue-600/30 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500">
              <Truck className="text-blue-500 group-hover:text-white" size={32} />
            </div>
            <div>
              <h4 className="text-xl font-black uppercase tracking-tighter mb-2">Quick Delivery</h4>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Worksite Shipping</p>
              <div className="w-8 h-1 bg-blue-600 mt-4"></div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 group border-t md:border-t-0 md:border-x border-slate-800 pt-12 md:pt-0 md:px-12">
            <div className="w-16 h-16 bg-blue-600/10 border border-blue-600/30 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500">
              <Award className="text-blue-500 group-hover:text-white" size={32} />
            </div>
            <div>
              <h4 className="text-xl font-black uppercase tracking-tighter mb-2">Certified PPE</h4>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest leading-relaxed">ISO Global Standards</p>
              <div className="w-8 h-1 bg-blue-600 mt-4"></div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 group border-t md:border-t-0 pt-12 md:pt-0">
            <div className="w-16 h-16 bg-blue-600/10 border border-blue-600/30 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500">
              <Clock className="text-blue-500 group-hover:text-white" size={32} />
            </div>
            <div>
              <h4 className="text-xl font-black uppercase tracking-tighter mb-2">24/7 Support</h4>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Technical Assistance</p>
              <div className="w-8 h-1 bg-blue-600 mt-4"></div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. PRODUCT LIST SECTION */}
      <section className="bg-white py-24 px-6 md:px-16" id="inventory">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none">Ready for Dispatch</h2>
              <p className="text-blue-600 text-[10px] mt-4 font-black uppercase tracking-[0.4em]">In-Stock Equipment</p>
            </div>
            <Link to="/shop" className="text-gray-400 font-black text-xs uppercase tracking-widest hover:text-blue-600 transition-colors pb-1 border-b-2 border-transparent hover:border-blue-600">See Full Catalog</Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((p) => (
                <div key={p._id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] transition-all group">
                  <div className="h-80 overflow-hidden relative bg-gray-50">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase text-blue-600 tracking-widest shadow-sm">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="font-black text-gray-900 text-base mb-1 uppercase tracking-tight">{p.name}</h4>
                    <p className="text-gray-400 text-[10px] font-black uppercase mb-6 tracking-widest text-blue-500/60">Drs Safety Cloth</p>
                    <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                      <span className="text-2xl font-black text-gray-900">${p.price.toFixed(2)}</span>
                      <button 
                        onClick={() => handleAddToCart(p._id)}
                        className="bg-gray-900 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-500/40 group-hover:-translate-y-1"
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

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white py-20 px-6 md:px-16 text-center">
         <h2 className="text-3xl font-black tracking-tighter mb-4 uppercase">DRS<span className="text-blue-500">SAFETY</span>CLOTH</h2>
         <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.5em]">© 2026 Protection for the Brave</p>
      </footer>
    </div>
  );
};

export default HomeScreen;