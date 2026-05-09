import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShopScreen = () => {
  // Mock Product Data
  const [products] = useState([
    {
      _id: '1',
      product_name: 'Safety Helmet',
      product_code: 'HD-101',
      description:
        'High-quality industrial safety helmet designed for construction and engineering work environments.',
      price: 45,
      image:
        'https://images.unsplash.com/photo-1581092919535-7146ff1a5902?q=80&w=1000&auto=format&fit=crop',
    },
    {
      _id: '2',
      product_name: 'Reflective Jacket',
      product_code: 'WK-202',
      description:
        'Durable reflective workwear jacket for maximum visibility and safety during field operations.',
      price: 60,
      image:
        'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1000&auto=format&fit=crop',
    },
    {
      _id: '3',
      product_name: 'Safety Boots',
      product_code: 'FT-303',
      description:
        'Heavy-duty protective footwear with anti-slip sole and reinforced steel toe protection.',
      price: 85,
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    },
  ]);

  const [expandedId, setExpandedId] = useState(null);

  const navigate = useNavigate();

  const handleBuyNow = (productId) => {
    navigate(`/payment/${productId}`);
  };

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      {/* Header */}
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">
          Professional <span className="text-blue-600">Gear</span>
        </h1>

        <p className="text-gray-500 font-medium">
          High-performance safety equipment for ASTU engineers.
        </p>
      </header>

      {/* Category Tabs */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
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
          <div
            key={p._id}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
          >
            {/* Image Section */}
            <div className="relative h-72 overflow-hidden">
              <img
                src={p.image}
                alt={p.product_name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900">
                {p.product_code}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-black uppercase text-slate-800 leading-tight">
                  {p.product_name}
                </h2>

                <button
                  onClick={() => toggleDetails(p._id)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <span
                    className={`text-2xl transition-transform inline-block ${
                      expandedId === p._id ? 'rotate-90' : ''
                    }`}
                  >
                    🚀
                  </span>
                </button>
              </div>

              {/* Description */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedId === p._id
                    ? 'max-h-40 mt-4'
                    : 'max-h-12 mt-2'
                }`}
              >
                <p className="text-gray-500 text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* Price & Button */}
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">
                    Unit Price
                  </p>

                  <span className="text-2xl font-black text-slate-900">
                    ${p.price}
                  </span>
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
    </div>
  );
};

export default ShopScreen;