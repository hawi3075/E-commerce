import React from 'react';
import { Upload, Plus } from 'lucide-react';

const UploadProduct = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-black text-slate-900 mb-8">UPLOAD NEW PRODUCT</h1>
      
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 max-w-4xl">
        <form className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Product Image</label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center hover:border-blue-400 transition-colors cursor-pointer bg-slate-50">
              <Upload className="text-slate-300 mb-2" size={32} />
              <p className="text-xs font-bold text-slate-500">Click to upload shoe image (PNG/JPG)</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase block">Product Name</label>
            <input type="text" className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-600" placeholder="e.g. Steel Toe Boot Pro" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase block">Price ($)</label>
            <input type="number" className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-600" placeholder="0.00" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase block">Product Type</label>
            <select className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-600">
              <option>Safety Shoes</option>
              <option>Head Protection</option>
              <option>High-Vis Jackets</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase block">Product Code</label>
            <input type="text" className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-600" placeholder="e.g. LUU-SHO-001" />
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase block">Material Explanation</label>
            <textarea className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-600 h-32" placeholder="Describe the materials..."></textarea>
          </div>

          <button className="col-span-2 bg-blue-600 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 flex items-center justify-center gap-2">
            <Plus size={16} /> Add Product to System
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;