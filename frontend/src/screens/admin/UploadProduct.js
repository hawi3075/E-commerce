import React, { useState, useRef } from 'react';
import { 
  Upload, Link as LinkIcon, Plus, X, Image as ImageIcon, 
  Tag, Hash, DollarSign, Box, Palette, Layers, CheckCircle, Loader2, Shield 
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Toggle state for image upload mode ('file' or 'url')
  const [imageMode, setImageMode] = useState('file');

  // Form States
  const [name, setName] = useState('');
  const [productType, setProductType] = useState('');
  const [price, setPrice] = useState('');
  const [productCode, setProductCode] = useState('');
  const [category, setCategory] = useState('Safety Shoes');
  const [size, setSize] = useState('');
  const [amount, setAmount] = useState('1');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  
  // Image URL state / Preview state
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // File Upload Handler (Converts File to Base64 preview)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const activeImage = imageMode === 'file' ? imagePreview : imageUrl;

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!activeImage) {
      alert('Please provide a product image either by file upload or image URL.');
      return;
    }

    setLoading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(userInfo.token && { Authorization: `Bearer ${userInfo.token}` }),
        },
      };

      const productData = {
        product_name: name,
        product_type: productType,
        price: Number(price),
        product_code: productCode,
        category: category,
        size: size,
        countInStock: Number(amount),
        color: color,
        description: description,
        image: activeImage,
      };

      // POST to backend
      const { data } = await axios.post('/api/products', productData, config);

      alert(`SUCCESS: ${data.product_name || name} added to system!`);
      navigate('/shop');

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add product. Please check server status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 bg-slate-50 min-h-screen font-sans text-slate-700">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Banner */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
                <Shield size={16} />
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Inventory Control</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight italic">
              Register New <span className="text-purple-600">Product</span>
            </h1>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
          <form className="space-y-8" onSubmit={submitHandler}>
            
            {/* SECTION 1: IMAGE SELECTION */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
                  <ImageIcon size={14} className="text-purple-600" /> Product Image
                </label>
                
                {/* Image Mode Selector */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
                  <button
                    type="button"
                    onClick={() => setImageMode('file')}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                      imageMode === 'file' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400'
                    }`}
                  >
                    File Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode('url')}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                      imageMode === 'url' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400'
                    }`}
                  >
                    Image URL
                  </button>
                </div>
              </div>

              {/* Upload Input Area */}
              {imageMode === 'file' ? (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  {imagePreview ? (
                    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 flex items-center justify-center group">
                      <img src={imagePreview} alt="Preview" className="h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-transform active:scale-90"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current.click()}
                      className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center hover:border-purple-500 hover:bg-purple-50/30 transition-all cursor-pointer bg-slate-50/50 group"
                    >
                      <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
                        <Upload size={28} />
                      </div>
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Click to browse local files</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">Supports PNG, JPG, WEBP</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/images/product.jpg"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-medium text-slate-800 outline-none focus:border-purple-200 focus:bg-white transition-all"
                    />
                  </div>
                  {imageUrl && (
                    <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 flex items-center justify-center p-2">
                      <img src={imageUrl} alt="URL Preview" className="h-full object-contain" onError={() => alert('Invalid image URL')} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SECTION 2: PRODUCT SPECIFICATIONS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-1">
                  <Tag size={12} className="text-purple-600" /> Product Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Titan Steel Toe Armor"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs font-semibold text-slate-800 outline-none focus:border-purple-200 focus:bg-white transition-all"
                />
              </div>

              {/* Product Type */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-1">
                  <Layers size={12} className="text-purple-600" /> Product Type
                </label>
                <input
                  type="text"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  placeholder="e.g. Heavy Duty Boots"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs font-semibold text-slate-800 outline-none focus:border-purple-200 focus:bg-white transition-all"
                />
              </div>

              {/* Product Code */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-1">
                  <Hash size={12} className="text-purple-600" /> Product Code
                </label>
                <input
                  type="text"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  placeholder="LUU-SHO-001"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs font-semibold text-slate-800 outline-none focus:border-purple-200 focus:bg-white transition-all"
                />
              </div>

              {/* Category Dropdown (Strictly 4 requested) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-1">
                  <Layers size={12} className="text-purple-600" /> Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs font-semibold text-slate-800 outline-none focus:border-purple-200 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Safety Shoes">Safety Shoes</option>
                  <option value="Head Protection">Head Protection</option>
                  <option value="High-Visibility">High-Visibility</option>
                  <option value="Hand Protection">Hand Protection</option>
                </select>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-1">
                  <DollarSign size={12} className="text-purple-600" /> Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="129.99"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs font-semibold text-slate-800 outline-none focus:border-purple-200 focus:bg-white transition-all"
                />
              </div>

              {/* Amount / Stock Quantity */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-1">
                  <Box size={12} className="text-purple-600" /> Quantity Stock
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="10"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs font-semibold text-slate-800 outline-none focus:border-purple-200 focus:bg-white transition-all"
                />
              </div>

              {/* Size */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-1">
                  Size
                </label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="e.g. EU 42, XL, or Standard"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs font-semibold text-slate-800 outline-none focus:border-purple-200 focus:bg-white transition-all"
                />
              </div>

              {/* Color */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-1">
                  <Palette size={12} className="text-purple-600" /> Color
                </label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Matte Black / Hi-Vis Yellow"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs font-semibold text-slate-800 outline-none focus:border-purple-200 focus:bg-white transition-all"
                />
              </div>

            </div>

            {/* Detailed Note / Material Description */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] block">
                Detail Notes & Material Explanation
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specify construction materials, certification ratings (e.g., ANSI / ISO standard), and usage instructions..."
                rows={4}
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-medium text-slate-800 outline-none focus:border-purple-200 focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-600/10 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <Plus size={18} strokeWidth={3} /> Add Product to System
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;