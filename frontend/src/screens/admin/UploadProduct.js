import React, { useState, useRef } from 'react';
import { Upload, Plus, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Form States
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Safety Shoes');
  const [productCode, setProductCode] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Image Preview State
  const [imagePreview, setImagePreview] = useState(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create local preview URL
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const productData = {
        product_name: name,
        price: Number(price),
        category: category,
        product_code: productCode,
        description: description,
        image: imagePreview || 'https://via.placeholder.com/300', 
      };

      // Ensure your backend server is running on the correct port
      const { data } = await axios.post('/api/products', productData, config);

      alert(`SUCCESS: ${data.product_name} added!`);
      navigate('/admin'); 

    } catch (error) {
      // This is where your 404 alert was coming from
      alert(error.response?.data.message || "Route not found (404). Check backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen w-full flex justify-center">
      <div className="w-full max-w-4xl">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
            Upload New <span className="text-blue-600">Product</span>
          </h1>
        </header>
        
        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={submitHandler}>
            
            {/* PRODUCT IMAGE AREA */}
            <div className="md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Product Image</label>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              
              {imagePreview ? (
                <div className="relative w-full h-64 rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                  <button onClick={() => setImagePreview(null)} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"><X size={20}/></button>
                </div>
              ) : (
                <div onClick={handleUploadClick} className="border-2 border-dashed border-slate-200 rounded-[2rem] p-12 flex flex-col items-center justify-center hover:border-blue-400 transition-all cursor-pointer bg-slate-50 group">
                  <Upload className="text-slate-300 mb-2 group-hover:text-blue-500" size={40} />
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Click to upload image (PNG/JPG)</p>
                </div>
              )}
            </div>

            {/* FORM INPUTS */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Product Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm" placeholder="e.g. Steel Toe Boot Pro" required />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Price ($)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm" placeholder="0.00" required />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Product Type</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm appearance-none cursor-pointer">
                <option value="Safety Shoes">Safety Shoes</option>
                <option value="Head Protection">Head Protection</option>
                <option value="High-Visibility">High-Visibility</option>
                <option value="Hand Protection">Hand Protection</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Product Code</label>
              <input type="text" value={productCode} onChange={(e) => setProductCode(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm" placeholder="e.g. LUU-SHO-001" required />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Material Explanation</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-5 text-sm h-40 resize-none" placeholder="Describe the materials..." required></textarea>
            </div>

            <button type="submit" disabled={loading} className="md:col-span-2 bg-blue-600 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-blue-700 active:scale-95 transition-all">
              <Plus size={18} className="inline mr-2" strokeWidth={3} /> {loading ? 'SAVING...' : 'Add Product to System'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;