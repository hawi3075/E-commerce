import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShopScreen = () => {
  const [products, setProducts] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // Track which product shows details
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleBuyNow = (productId) => {
    // Redirecting to payment page as requested
    navigate(`/payment/${productId}`);
  };

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">
          Professional <span className="text-blue-600">Gear</span>
        </h1>
        <p className="text-gray-500 font-medium">High-performance safety equipment for ASTU engineers.</p>
      </header>
      
      {/* Category Tabs */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
        {['All Gear', 'Headwear', 'Workwear', 'Footwear'].map((cat) => (
          <button 
            key={cat}
            className="whitespace-nowrap bg-white border border-gray-200 px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-900 hover:text-white transition-all shadow-sm"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <div key={p._id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
            
            {/* Image Section */}
            <div className="relative h-72 overflow-hidden">
              <img 
                src={p.image} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt={p.product_name} 
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900">
                {p.product_code || 'PPE-77'}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-black uppercase text-slate-800 leading-tight">
                  {p.product_name}
                </h2>
                <button 
                  onClick={() => toggleDetails(p._id)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <span className={`text-2xl transition-transform inline-block ${expandedId === p._id ? 'rotate-90' : ''}`}>
                    🚀 
                  </span>
                </button>
              </div>

              {/* Collapsible Details */}
              <div className={`overflow-hidden transition-all duration-300 ${expandedId === p._id ? 'max-h-40 mt-4' : 'max-h-12 mt-2'}`}>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Unit Price</p>
                  <span className="text-2xl font-black text-slate-900">${p.price}</span>
                </div>
                
                <button 
                  onClick={() => handleBuyNow(p._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold uppercase text-xs tracking-widest shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-bold uppercase tracking-widest">Scanning Inventory...</p>
        </div>
      )}
    </div>
  );
};

export default ShopScreen;