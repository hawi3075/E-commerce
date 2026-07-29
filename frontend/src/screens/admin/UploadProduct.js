import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Search, Plus, X, Upload, Link as LinkIcon, Image as ImageIcon, 
  Tag, Hash, DollarSign, Box, Palette, Layers, Loader2, Shield, Edit, Trash2,
  Briefcase, Users, Component
} from 'lucide-react';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fileInputRef = useRef(null);
  const [imageMode, setImageMode] = useState('file');
  const [name, setName] = useState('');
  const [productType, setProductType] = useState('');
  const [price, setPrice] = useState('');
  const [productCode, setProductCode] = useState('');
  
  // Dropdown States + Custom "Other" Input States
  const [category, setCategory] = useState('FOOTWEAR');
  const [customCategory, setCustomCategory] = useState('');
  
  const [workField, setWorkField] = useState('FARMER');
  const [customWorkField, setCustomWorkField] = useState('');

  const [targetGender, setTargetGender] = useState('ALL GENDERS');
  const [customTargetGender, setCustomTargetGender] = useState('');

  const [rawMaterial, setRawMaterial] = useState('Leather');
  const [customRawMaterial, setCustomRawMaterial] = useState('');

  const [size, setSize] = useState('');
  const [amount, setAmount] = useState('1');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const defaultCategories = ['FOOTWEAR', 'WORKWEAR', 'HEADWEAR'];
  const defaultWorkFields = ['FARMER', 'CONSTRUCTION', 'MINING', 'MEDICAL', 'ELECTRICAL'];
  const defaultGenders = ['ALL GENDERS', 'MALE', 'FEMALE'];
  const defaultMaterials = ['Leather', 'Rubber', 'Cotton', 'Steel', 'Polyester'];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data.products || data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getAuthHeader = () => {
    const rawUserInfo = localStorage.getItem('userInfo');
    const userInfo = rawUserInfo ? JSON.parse(rawUserInfo) : {};
    const token = userInfo.token || localStorage.getItem('token');
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const handleOpenAddModal = () => {
    resetForm();
    setEditingId(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setName(product.product_name || product.name || '');
    setProductType(product.product_type || '');
    setPrice(product.price || '');
    setProductCode(product.product_code || '');

    // Handle Category Edit
    const prodCat = product.product_category || product.category || 'FOOTWEAR';
    if (defaultCategories.includes(prodCat)) {
      setCategory(prodCat);
      setCustomCategory('');
    } else {
      setCategory('OTHER');
      setCustomCategory(prodCat);
    }

    // Handle WorkField Edit
    const prodWF = product.work_field || product.workField || 'FARMER';
    if (defaultWorkFields.includes(prodWF)) {
      setWorkField(prodWF);
      setCustomWorkField('');
    } else {
      setWorkField('OTHER');
      setCustomWorkField(prodWF);
    }

    // Handle Gender Edit
    const prodGender = product.target_gender || product.targetGender || 'ALL GENDERS';
    if (defaultGenders.includes(prodGender)) {
      setTargetGender(prodGender);
      setCustomTargetGender('');
    } else {
      setTargetGender('OTHER');
      setCustomTargetGender(prodGender);
    }

    // Handle Material Edit
    const prodMat = product.raw_material || product.rawMaterial || 'Leather';
    if (defaultMaterials.includes(prodMat)) {
      setRawMaterial(prodMat);
      setCustomRawMaterial('');
    } else {
      setRawMaterial('OTHER');
      setCustomRawMaterial(prodMat);
    }

    setSize(product.size || '');
    setAmount(product.countInStock ?? product.stock ?? '1');
    setColor(product.color || '');
    setDescription(product.description || '');

    const img = product.image || product.images?.[0] || '';
    if (img.startsWith('data:image')) {
      setImageMode('file');
      setImagePreview(img);
      setImageUrl('');
    } else {
      setImageMode('url');
      setImageUrl(img);
      setImagePreview(null);
    }

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`, getAuthHeader());
      fetchProducts();
    } catch (error) {
      console.error('Delete Error:', error);
      alert(error.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const activeImage = imageMode === 'file' ? imagePreview : imageUrl;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!activeImage) {
      alert('Please select or paste an image for the product.');
      return;
    }

    setSubmitting(true);
    try {
      const config = getAuthHeader();
      const productData = {
        product_name: name,
        product_type: productType,
        price: Number(price),
        product_code: productCode,
        product_category: category === 'OTHER' ? customCategory : category,
        work_field: workField === 'OTHER' ? customWorkField : workField,
        target_gender: targetGender === 'OTHER' ? customTargetGender : targetGender,
        raw_material: rawMaterial === 'OTHER' ? customRawMaterial : rawMaterial,
        size,
        countInStock: Number(amount),
        color,
        description,
        image: activeImage,
      };

      if (editingId) {
        await axios.put(`/api/products/${editingId}`, productData, config);
      } else {
        await axios.post('/api/products', productData, config);
      }
      
      setShowModal(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Submission Error:', error);
      alert(error.response?.data?.message || 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setProductType('');
    setPrice('');
    setProductCode('');
    setCategory('FOOTWEAR');
    setCustomCategory('');
    setWorkField('FARMER');
    setCustomWorkField('');
    setTargetGender('ALL GENDERS');
    setCustomTargetGender('');
    setRawMaterial('Leather');
    setCustomRawMaterial('');
    setSize('');
    setAmount('1');
    setColor('');
    setDescription('');
    setImageUrl('');
    setImagePreview(null);
  };

  const filteredProducts = products.filter(p => 
    (p.name || p.product_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.product_code || p._id || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-8 md:p-10 bg-slate-50/60 min-h-screen text-slate-700 font-sans relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Products</h1>
          <p className="text-xs font-bold text-slate-400 mt-1">Manage your product catalog and inventory.</p>
        </div>

        <button 
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold px-5 py-3 rounded-2xl shadow-lg shadow-purple-600/20 transition-all text-xs active:scale-[0.98] self-start md:self-auto"
        >
          <Plus size={18} strokeWidth={2.5} /> New Product
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-11 pr-4 text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>

        <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
          <span>Status:</span>
          <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer">
            <option>All Statuses</option>
            <option>In Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] text-slate-400 font-black uppercase tracking-wider">
                <th className="py-4 px-6">PRODUCT</th>
                <th className="py-4 px-6">SKU</th>
                <th className="py-4 px-6">CATEGORY</th>
                <th className="py-4 px-6">PRICE</th>
                <th className="py-4 px-6">STOCK</th>
                <th className="py-4 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-purple-600 font-bold">
                    Loading catalog items...
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const stock = product.countInStock ?? product.stock ?? 0;
                  return (
                    <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.image || product.images?.[0] || '/logo.webp'} 
                            alt={product.name || product.product_name} 
                            className="w-12 h-12 object-cover rounded-xl bg-slate-100 border border-slate-200"
                          />
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-sm">
                              {product.name || product.product_name}
                            </h4>
                            <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                              #{product._id?.substring(0, 7).toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-800">
                        {product.product_code || `SKU-${product._id?.substring(0, 6).toUpperCase()}`}
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-emerald-50 text-emerald-700 font-black text-[10px] uppercase px-3 py-1 rounded-full tracking-wider">
                          {product.category || product.product_category || 'FOOTWEAR'}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-extrabold text-slate-900 text-sm">
                        ${Number(product.price).toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <span className={`font-extrabold text-xs ${stock > 0 ? 'text-slate-800' : 'text-rose-600'}`}>
                            {stock} units available
                          </span>
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                            <div 
                              className={`h-full ${stock > 0 ? 'bg-emerald-600' : 'bg-rose-500'}`} 
                              style={{ width: `${Math.min(stock, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors"
                          title="Edit Product"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2 border border-slate-200 rounded-xl hover:bg-rose-50 text-rose-600 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-400 font-medium">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* POPUP MODAL: REGISTER / EDIT PRODUCT */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] w-full max-w-4xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
                  <Shield size={16} />
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">
                  Inventory Control
                </span>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic mb-6">
              {editingId ? 'Edit' : 'Register New'} <span className="text-purple-600">Product</span>
            </h2>

            <form onSubmit={submitHandler} className="space-y-6">
              {/* Image Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-purple-600" /> Product Image
                  </label>
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
                    <button
                      type="button"
                      onClick={() => setImageMode('file')}
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${imageMode === 'file' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400'}`}
                    >
                      File Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode('url')}
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${imageMode === 'url' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400'}`}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {imageMode === 'file' ? (
                  <div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    {imagePreview ? (
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
                        <img src={imagePreview} alt="Preview" className="h-full object-contain" />
                        <button type="button" onClick={() => setImagePreview(null)} className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-purple-500 hover:bg-purple-50/20 cursor-pointer">
                        <Upload size={24} className="text-purple-600 mb-2" />
                        <p className="text-xs font-bold text-slate-700 uppercase">Click to browse local files</p>
                        <p className="text-[10px] text-slate-400">Supports PNG, JPG, WEBP</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/images/product.jpg"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-xs font-medium text-slate-800 outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Form Input Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Tag size={12} className="text-purple-600" /> Product Name
                  </label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Titan Steel Toe Armor" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-semibold outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Layers size={12} className="text-purple-600" /> Product Type
                  </label>
                  <input type="text" value={productType} onChange={(e) => setProductType(e.target.value)} required placeholder="e.g. Heavy Duty Boots" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-semibold outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Hash size={12} className="text-purple-600" /> Product Code
                  </label>
                  <input type="text" value={productCode} onChange={(e) => setProductCode(e.target.value)} required placeholder="LUU-SHO-001" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-semibold outline-none" />
                </div>

                {/* Category Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Layers size={12} className="text-purple-600" /> Category
                  </label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-semibold outline-none cursor-pointer">
                    <option value="FOOTWEAR">FOOTWEAR</option>
                    <option value="WORKWEAR">WORKWEAR</option>
                    <option value="HEADWEAR">HEADWEAR</option>
                    <option value="OTHER">OTHER (Specify)</option>
                  </select>
                  {category === 'OTHER' && (
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      required
                      placeholder="Enter custom category"
                      className="w-full mt-2 bg-purple-50/50 border border-purple-200 rounded-xl p-3 text-xs font-semibold outline-none"
                    />
                  )}
                </div>

                {/* Work Field Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Briefcase size={12} className="text-purple-600" /> Work Field / Sector
                  </label>
                  <select value={workField} onChange={(e) => setWorkField(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-semibold outline-none cursor-pointer">
                    <option value="FARMER">FARMER</option>
                    <option value="CONSTRUCTION">CONSTRUCTION</option>
                    <option value="MINING">MINING</option>
                    <option value="MEDICAL">MEDICAL</option>
                    <option value="ELECTRICAL">ELECTRICAL</option>
                    <option value="OTHER">OTHER (Specify)</option>
                  </select>
                  {workField === 'OTHER' && (
                    <input
                      type="text"
                      value={customWorkField}
                      onChange={(e) => setCustomWorkField(e.target.value)}
                      required
                      placeholder="Enter custom work field"
                      className="w-full mt-2 bg-purple-50/50 border border-purple-200 rounded-xl p-3 text-xs font-semibold outline-none"
                    />
                  )}
                </div>

                {/* Target Gender Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Users size={12} className="text-purple-600" /> Target Gender
                  </label>
                  <select value={targetGender} onChange={(e) => setTargetGender(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-semibold outline-none cursor-pointer">
                    <option value="ALL GENDERS">ALL GENDERS</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="OTHER">OTHER (Specify)</option>
                  </select>
                  {targetGender === 'OTHER' && (
                    <input
                      type="text"
                      value={customTargetGender}
                      onChange={(e) => setCustomTargetGender(e.target.value)}
                      required
                      placeholder="Enter custom gender classification"
                      className="w-full mt-2 bg-purple-50/50 border border-purple-200 rounded-xl p-3 text-xs font-semibold outline-none"
                    />
                  )}
                </div>

                {/* Raw Material Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Component size={12} className="text-purple-600" /> Raw Material
                  </label>
                  <select value={rawMaterial} onChange={(e) => setRawMaterial(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-semibold outline-none cursor-pointer">
                    <option value="Leather">Leather</option>
                    <option value="Rubber">Rubber</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Steel">Steel</option>
                    <option value="Polyester">Polyester</option>
                    <option value="OTHER">OTHER (Specify)</option>
                  </select>
                  {rawMaterial === 'OTHER' && (
                    <input
                      type="text"
                      value={customRawMaterial}
                      onChange={(e) => setCustomRawMaterial(e.target.value)}
                      required
                      placeholder="Enter custom material"
                      className="w-full mt-2 bg-purple-50/50 border border-purple-200 rounded-xl p-3 text-xs font-semibold outline-none"
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <DollarSign size={12} className="text-purple-600" /> Price ($)
                  </label>
                  <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="129.99" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-semibold outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Box size={12} className="text-purple-600" /> Quantity Stock
                  </label>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required placeholder="10" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-semibold outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Size</label>
                  <input type="text" value={size} onChange={(e) => setSize(e.target.value)} required placeholder="e.g. EU 42, XL" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-semibold outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Palette size={12} className="text-purple-600" /> Color
                  </label>
                  <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required placeholder="e.g. Matte Black" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-semibold outline-none" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Detail Notes & Material Explanation
                </label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required placeholder="Specify construction materials..." className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-medium outline-none resize-none" />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-600/10 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                {submitting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>{editingId ? <Edit size={18} /> : <Plus size={18} />} {editingId ? 'Update Product Details' : 'Add Product to System'}</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Inventory;