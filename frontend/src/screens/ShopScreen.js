import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShopScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6 pb-24">
      <h1 className="text-3xl font-black uppercase mb-6">Equipment <br/> Catalogue</h1>
      
      {/* Search & Filter */}
      <input className="w-full bg-gray-100 p-4 rounded-xl mb-6 outline-none" placeholder="Search by technical spec..." />
      
      <div className="flex gap-2 mb-8 overflow-x-auto">
        <button className="bg-yellow-400 px-6 py-2 rounded-lg font-bold">All Gear</button>
        <button className="bg-gray-100 px-6 py-2 rounded-lg font-bold">Shoes</button>
        <button className="bg-gray-100 px-6 py-2 rounded-lg font-bold">Clothes</button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {products.map(p => (
          <div key={p._id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img src={p.image} className="w-full h-64 object-cover" alt={p.product_name} />
            <div className="p-6">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{p.product_code}</span>
              <h2 className="text-xl font-black uppercase mt-1">{p.product_name}</h2>
              <p className="text-gray-500 text-sm mt-2">{p.description}</p>
              <div className="flex justify-between items-center mt-6">
                <span className="text-2xl font-black">${p.price}</span>
                <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold uppercase text-xs">Add to Quote</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};