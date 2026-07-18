import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, Grid, ShoppingCart, Star, 
  SlidersHorizontal, Eye, Heart 
} from 'lucide-react';

// Beautiful Mock Database fallback in case your API/Database is empty
const MOCK_PRODUCTS = [
  { 
    _id: 'p1', 
    product_name: 'Vanguard Helmet X', 
    price: 89.99, 
    stock: 18, 
    category: 'Headwear', 
    image: 'https://images.unsplash.com/photo-1590483736622-39da8caf3ef8?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    _id: 'p2', 
    product_name: 'Aegis High-Vis Safety Vest', 
    price: 24.99, 
    stock: 0, // Sold out sample
    category: 'Workwear', 
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    _id: 'p3', 
    product_name: 'Titan Steel Toe Work Boots', 
    price: 145.00, 
    stock: 12, 
    category: 'Footwear', 
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    _id: 'p4', 
    product_name: 'Anti-Fog Ballistic Goggles', 
    price: 18.50, 
    stock: 72, 
    category: 'Headwear', 
    image: 'https://images.unsplash.com/photo-1551150431-993b1139ecc5?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    _id: 'p5', 
    product_name: 'Mantis Thermal Gloves', 
    price: 19.50, 
    stock: 8, 
    category: 'Workwear', 
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    _id: 'p6', 
    product_name: 'Elite Shield Welding Mask', 
    price: 112.00, 
    stock: 15, 
    category: 'Headwear', 
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=500' 
  }
];

const ShopScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Defined static categories list matching your sidebar
  const categoriesList = [
    'All Products', 
    'Headwear', 
    'Workwear', 
    'Footwear'
  ];

  // Fetch API Products with Mock Fallback
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('/api/products');
        
        // If API returns successfully but has no products, fallback to Mock Data
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(MOCK_PRODUCTS);
        }
      } catch (error) {
        console.warn("API offline or failed. Sourcing fallback mock database.", error);
        setProducts(MOCK_PRODUCTS); // Set mock fallback on network failure
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All Products') {
      return products;
    }
    return products.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory, products]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'low-to-high') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'high-to-low') {
      return list.sort((a, b) => b.price - a.price);
    }
    return list; 
  }, [filteredProducts, sortBy]);

  const handleBuyNow = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen font-sans antialiased text-slate-700">
      
      {/* Hero Header */}
      <header className="bg-white border-b border-slate-100 pt-28 pb-12">
        <div className="max-w-[1280px] mx-auto px-6 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Shop Collection</h1>
          <p className="text-sm text-slate-400 font-medium">Find exactly what you are looking for.</p>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ================= SIDEBAR (LEFT COLUMN) ================= */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60">
              <SlidersHorizontal size={14} className="text-slate-800" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">Categories</h2>
            </div>
            
            <div className="flex flex-col gap-1.5">
              {categoriesList.map((cat) => {
                const isSelected = selectedCategory === cat;
                
                // Calculate dynamic quantity counts
                const count = cat === 'All Products' 
                  ? products.length 
                  : products.filter(p => p.category?.toLowerCase() === cat.toLowerCase()).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-xs font-bold uppercase tracking-wide transition-all ${
                      isSelected 
                        ? 'bg-purple-50 text-purple-700 border border-purple-100/80' 
                        : 'bg-white hover:bg-slate-100/50 text-slate-500 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Grid size={12} className={isSelected ? "text-purple-600" : "text-slate-400"} />
                      <span>{cat}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ================= PRODUCTS GRID (RIGHT COLUMN) ================= */}
          <section className="flex-1 w-full space-y-6">
            
            {/* Toolbar Summary & Sorting */}
            <div className="flex items-center justify-between bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Showing <span className="text-slate-800 font-extrabold">{sortedProducts.length}</span> Products
              </p>
              
              <div className="relative flex items-center gap-2 bg-slate-50 border border-slate-200/70 hover:border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 transition-colors cursor-pointer">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent pr-6 appearance-none cursor-pointer focus:outline-none focus:ring-0 text-xs font-extrabold uppercase tracking-wider"
                >
                  <option value="newest">Newest First</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                </select>
                <ChevronDown size={14} className="text-slate-500 absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Content States */}
            {isLoading ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-bold uppercase tracking-widest animate-pulse text-xs">Scanning Inventory...</p>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200 space-y-2">
                <Grid size={32} className="text-slate-200 mx-auto" />
                <p className="text-slate-800 font-bold uppercase tracking-wide text-sm">No items configured</p>
                <p className="text-slate-400 text-xs">We couldn't find any products in this specific category selection.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((p) => {
                  const isSoldOut = p.stock === 0;

                  return (
                    <div 
                      key={p._id}
                      className="bg-white rounded-3xl border border-slate-100 hover:border-purple-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Image Block */}
                      <div className="relative h-56 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100/80">
                        <img 
                          src={p.image} 
                          alt={p.product_name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          loading="lazy"
                        />

                        {isSoldOut ? (
                          <span className="absolute top-4 right-4 bg-red-50 text-red-600 border border-red-100 text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wide">
                            Sold out
                          </span>
                        ) : (
                          <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wide">
                            {p.stock} In Stock
                          </span>
                        )}

                        {/* Interactive overlays */}
                        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                          <button className="p-3 bg-white rounded-xl shadow-lg text-slate-600 hover:text-purple-600 hover:scale-110 transition-all">
                            <Heart size={16} />
                          </button>
                          <button 
                            onClick={() => handleBuyNow(p._id)} 
                            className="p-3 bg-white rounded-xl shadow-lg text-slate-600 hover:text-purple-600 hover:scale-110 transition-all"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Detail Section */}
                      <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 mb-1.5">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={11} 
                                  className="fill-amber-400 text-amber-400" 
                                />
                              ))}
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 ml-1">5.0</span>
                          </div>

                          <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide line-clamp-2 min-h-[2.5rem] leading-snug group-hover:text-purple-600 transition-colors">
                            {p.product_name}
                          </h3>
                        </div>

                        {/* Purchase Options Footer */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest block">Unit Value</span>
                            <span className="text-slate-900 font-black text-lg">${p.price.toFixed(2)}</span>
                          </div>

                          {isSoldOut ? (
                            <button 
                              disabled
                              className="bg-slate-100 text-slate-400 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-not-allowed"
                            >
                              Unavailable
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleBuyNow(p._id)}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/10 hover:shadow-purple-600/25 active:scale-95"
                            >
                              <ShoppingCart size={13} />
                              Buy Now
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </section>

        </div>
      </main>
    </div>
  );
};

export default ShopScreen;