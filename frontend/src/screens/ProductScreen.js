import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Shield, 
  ArrowLeft, 
  ShoppingCart, 
  CheckCircle, 
  Star, 
  Truck, 
  ShieldCheck, 
  Minus, 
  Plus, 
  Loader2, 
  PackageCheck, 
  FileText, 
  AlertCircle
} from 'lucide-react';

import Navbar from '../components/Navbar';

// Dynamic Fallback Database matching ShopScreen products
const MOCK_PRODUCTS_DB = [
  { 
    _id: 'p1', 
    id: 'p1',
    product_name: 'Vanguard Helmet X', 
    price: 89.99, 
    countInStock: 18, 
    category: 'Headwear', 
    rating: 5,
    image: 'https://images.unsplash.com/photo-1590483736622-39da8caf3ef8?auto=format&fit=crop&q=80&w=800',
    description: 'Industrial-grade safety helmet designed for ultimate impact protection, all-day comfort, and high durability in demanding high-risk environments.',
    features: [
      'High-density impact-resistant ABS shell',
      'Adjustable 6-point suspension harness',
      'Universal accessory slots for earmuffs & face shields',
      'Moisture-wicking breathable sweatband'
    ],
    specs: {
      'Certification': 'ANSI Z89.1 / CSA Z94.1 Class E',
      'Material': 'High-Impact ABS Polymer',
      'Weight': '420g',
      'Origin': 'USA Manufactured'
    }
  },
  { 
    _id: 'p2', 
    id: 'p2',
    product_name: 'Aegis High-Vis Safety Vest', 
    price: 24.99, 
    countInStock: 0, 
    category: 'Workwear', 
    rating: 5,
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-bright reflective safety vest engineered for maximum visibility during day and night construction operations.',
    features: [
      '3M Scotchlite 2-inch reflective striping',
      'Breathable polyester mesh weave',
      'Heavy-duty reinforced zipper enclosure',
      'Multi-pocket design for radios and tablets'
    ],
    specs: {
      'Certification': 'ANSI/ISEA 107-2020 Class 2',
      'Material': '100% Breathable Polyester',
      'Weight': '210g',
      'Origin': 'Imported'
    }
  },
  { 
    _id: 'p3', 
    id: 'p3',
    product_name: 'Titan Steel Toe Work Boots', 
    price: 145.00, 
    countInStock: 12, 
    category: 'Footwear', 
    rating: 5,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800',
    description: 'Heavy-duty steel-toe work boots built for all-terrain stability, puncture resistance, and extreme comfort on long shifts.',
    features: [
      'ASTM certified steel safety toe',
      'Oil and slip-resistant rubber outsole',
      'Waterproof full-grain leather upper',
      'Anti-fatigue cushioning footbed'
    ],
    specs: {
      'Certification': 'ASTM F2413-18 M/I/C EH',
      'Material': 'Full-Grain Leather & Rubber',
      'Weight': '1.2kg per boot',
      'Origin': 'USA Assembled'
    }
  },
  { 
    _id: 'p4', 
    id: 'p4',
    product_name: 'Anti-Fog Ballistic Goggles', 
    price: 18.50, 
    countInStock: 72, 
    category: 'Headwear', 
    rating: 5,
    image: 'https://images.unsplash.com/photo-1551150431-993b1139ecc5?auto=format&fit=crop&q=80&w=800',
    description: 'High-impact clear ballistic goggles offering full panoramic field-of-view with dual anti-fog coating technology.',
    features: [
      'MIL-PRF-32432 ballistic impact standard rating',
      'Scratch-resistant outer shield coating',
      'Soft silicone perimeter seal',
      'Fits comfortably over most prescription eyewear'
    ],
    specs: {
      'Certification': 'ANSI Z87.1+ High Velocity',
      'Material': 'Polycarbonate & Silicone',
      'Weight': '110g',
      'Origin': 'Imported'
    }
  }
];

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [addedToCartAlert, setAddedToCartAlert] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Try live backend API endpoint
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.warn('API fetch unavailable, using fallback mock product data.');
        // Lookup product from local fallback database
        const match = MOCK_PRODUCTS_DB.find(p => p._id === id || p.id === id) || MOCK_PRODUCTS_DB[0];
        setProduct(match);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta) => {
    const maxStock = product?.countInStock ?? product?.stock ?? 10;
    setQuantity(prev => {
      const nextVal = prev + delta;
      if (nextVal < 1) return 1;
      if (nextVal > maxStock) return maxStock;
      return nextVal;
    });
  };

  const handleAddToCart = () => {
    setAddedToCartAlert(true);
    setTimeout(() => {
      setAddedToCartAlert(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="bg-[#05050a] text-white min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-purple-500" size={36} />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#05050a] text-white min-h-screen flex flex-col items-center justify-center space-y-6 px-4">
        <AlertCircle size={48} className="text-red-500" />
        <h2 className="text-2xl font-black uppercase tracking-tight">Product Not Found</h2>
        <p className="text-slate-400 text-sm">The industrial equipment item you are looking for does not exist.</p>
        <Link 
          to="/shop" 
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const productName = product.product_name || product.name || "Industrial Safety Gear";
  const productPrice = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price;
  const stockCount = product.countInStock !== undefined ? product.countInStock : (product.stock || 0);
  const isOutOfStock = stockCount === 0;

  return (
    <div className="bg-[#05050a] text-white min-h-screen overflow-hidden relative font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 pt-28 sm:pt-36 pb-24">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors uppercase text-xs tracking-widest font-bold group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Catalog
          </button>

          <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400/80 bg-purple-900/30 px-3 py-1 rounded-full border border-purple-500/20">
            Category: {product.category || 'Safety Tech'}
          </span>
        </div>

        {/* Product Layout Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Visual Showcase Block */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/50 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-12 flex items-center justify-center relative group min-h-[420px] sm:min-h-[500px]"
          >
            <div className="absolute top-6 right-6 bg-purple-600/10 border border-purple-500/30 text-purple-400 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-black uppercase tracking-wider backdrop-blur-md">
              <ShieldCheck size={14} /> Certified Spec
            </div>

            <img 
              src={product.image || 'https://via.placeholder.com/600'} 
              alt={productName} 
              className="w-full max-w-[380px] h-[320px] sm:h-[400px] object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            />
          </motion.div>

          {/* Details & Actions Block */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(product.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-purple-500 text-purple-500" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-400 tracking-wider">5.0 (Verified Standard)</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-white">
                {productName}
              </h1>

              <div className="flex items-baseline gap-4">
                <p className="text-3xl sm:text-4xl font-black text-purple-400">{productPrice}</p>
                {isOutOfStock ? (
                  <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full">
                    Out of Stock
                  </span>
                ) : (
                  <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                    In Stock ({stockCount} available)
                  </span>
                )}
              </div>
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              {product.description || "Designed for maximum structural protection, ergonomic safety compliance, and industrial durability."}
            </p>

            {/* Spec Highlights */}
            {product.features && product.features.length > 0 && (
              <div className="border-t border-b border-white/10 py-6 space-y-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle size={18} className="text-purple-500 shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector & Add To Cart */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                
                {/* Quantity Control */}
                {!isOutOfStock && (
                  <div className="flex items-center bg-slate-900 border border-white/10 rounded-2xl p-1.5">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center text-sm font-extrabold">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                      disabled={quantity >= stockCount}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                )}

                {/* Submit Action */}
                <button 
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 min-w-[200px] py-5 px-8 rounded-2xl uppercase text-xs sm:text-sm font-black tracking-[2px] flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(147,51,234,0.3)] ${
                    isOutOfStock 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none' 
                      : 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:scale-[1.02] active:scale-95 text-white'
                  }`}
                >
                  <ShoppingCart size={18} /> 
                  {isOutOfStock ? 'Currently Unavailable' : 'Add To Equipment Order'}
                </button>
              </div>

              {/* Feedback Banner */}
              <AnimatePresence>
                {addedToCartAlert && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-400 text-xs font-bold uppercase tracking-wider"
                  >
                    <PackageCheck size={18} />
                    Added {quantity} unit(s) of {productName} to your cart.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Trust Assurances */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs uppercase tracking-widest text-slate-400 font-bold border-t border-white/5">
              <span className="flex items-center gap-2">
                <Truck size={16} className="text-purple-500" /> Express Freight
              </span>
              <span className="flex items-center gap-2">
                <Shield size={16} className="text-purple-500" /> 1-Year Structural Warranty
              </span>
            </div>

          </motion.div>
        </div>

        {/* Tabbed Specifications & Documentation */}
        <section className="mt-20 border-t border-white/10 pt-12">
          <div className="flex border-b border-white/10 gap-8 mb-8">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-xs font-black uppercase tracking-widest transition-colors relative ${
                activeTab === 'specs' ? 'text-purple-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Technical Specifications
              {activeTab === 'specs' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('compliance')}
              className={`pb-4 text-xs font-black uppercase tracking-widest transition-colors relative ${
                activeTab === 'compliance' ? 'text-purple-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Safety Compliance
              {activeTab === 'compliance' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />
              )}
            </button>
          </div>

          {/* Tab Panes */}
          <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-6 sm:p-8">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.specs ? (
                  Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-xs uppercase font-bold text-slate-400">{key}</span>
                      <span className="text-xs font-extrabold text-white">{value}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-xs uppercase font-bold text-slate-400">Material Standard</span>
                      <span className="text-xs font-extrabold text-white">Polycarbonate / ABS Hybrid</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-3">
                      <span className="text-xs uppercase font-bold text-slate-400">Impact Class</span>
                      <span className="text-xs font-extrabold text-white">Class E (Electrical)</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'compliance' && (
              <div className="space-y-4 text-slate-300 text-sm">
                <div className="flex items-start gap-3">
                  <FileText className="text-purple-500 shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="font-extrabold text-white uppercase text-xs tracking-wider mb-1">OSHA Standard Certified</h4>
                    <p className="text-xs text-slate-400">Fully compliant with workplace hazardous occupational headgear standards under section 1910.135.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 text-center relative z-10 bg-[#030307]">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="text-purple-500" size={18} />
          <h2 className="font-black uppercase text-xl tracking-tight text-white">Luu Safety</h2>
        </div>
        <p className="text-slate-600 uppercase text-[10px] tracking-[4px]">
          © 2026 Industrial Protection Systems
        </p>
      </footer>
    </div>
  );
};

export default ProductScreen;