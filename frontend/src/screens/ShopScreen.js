import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  ChevronDown, Grid, ShoppingCart, Star, 
  SlidersHorizontal, Eye, Heart, Loader2, RotateCcw, Briefcase, User, Layers, Search
} from 'lucide-react';

import Navbar from '../components/Navbar';

// COMPLETE TRANSLATIONS DICTIONARY
const TRANSLATIONS = {
  en: {
    filterEngine: 'Filter Engine',
    reset: 'Reset',
    productCategory: 'Product Category',
    workSector: 'Work Field / Sector',
    targetGender: 'Target Gender',
    rawMaterial: 'Raw Material',
    showing: 'Showing',
    safetyAssets: 'Safety Assets',
    newest: 'Newest First',
    lowToHigh: 'Price: Low to High',
    highToLow: 'Price: High to Low',
    scanning: 'Scanning Inventory...',
    noGear: 'No Matching Safety Gear Found',
    noGearDesc: 'Try clearing your filters or selecting a different work field or category combination.',
    clearFilters: 'Clear All Filters',
    soldOut: 'Sold Out',
    inStock: 'In Stock',
    units: 'Units',
    assetValue: 'Asset Value',
    gear: 'Gear',
    searchResultFor: 'Results for',
    categories: {
      All: 'All Categories',
      Headwear: 'Headwear',
      Workwear: 'Workwear',
      Footwear: 'Footwear'
    },
    genders: {
      All: 'All Genders',
      Male: 'Male',
      Female: 'Female'
    },
    workSectors: {
      All: 'All Work Sectors',
      Farmer: 'Farmer',
      Construction: 'Construction',
      Mining: 'Mining',
      Welding: 'Welding',
      Electrical: 'Electrical'
    },
    materials: {
      All: 'All Materials',
      'Cotton/Polyester': 'Cotton/Polyester',
      'Steel/Polymer': 'Steel/Polymer',
      Leather: 'Leather',
      Kevlar: 'Kevlar',
      Rubber: 'Rubber'
    }
  },
  am: {
    filterEngine: 'ማጣሪያ',
    reset: 'እንደገና ጀምር',
    productCategory: 'የምርት ምድብ',
    workSector: 'የሥራ ዘርፍ',
    targetGender: 'ፆታ',
    rawMaterial: 'የጥሬ ዕቃ ዓይነት',
    showing: 'የሚታዩ',
    safetyAssets: 'የደህንነት እቃዎች',
    newest: 'አዲስ የመጡ',
    lowToHigh: 'ዋጋ: ከአነስተኛ ወደ ከፍተኛ',
    highToLow: 'ዋጋ: ከከፍተኛ ወደ አነስተኛ',
    scanning: 'ዕቃዎችን በመፈለግ ላይ...',
    noGear: 'ምንም የተገኘ የደህንነት ዕቃ የለም',
    noGearDesc: 'እባክዎን ማጣሪያዎቹን ያፅዱ ወይም የተለየ የሥራ ዘርፍ ይምረጡ።',
    clearFilters: 'ሁሉንም ማጣሪያዎች አጽዳ',
    soldOut: 'ያለቀ',
    inStock: 'አለ',
    units: 'እቃዎች',
    assetValue: 'ዋጋ',
    gear: 'ዕቃ',
    searchResultFor: 'የፍለጋ ውጤቶች ለ',
    categories: {
      All: 'ሁሉንም ምድቦች',
      Headwear: 'የራስ ቆብ',
      Workwear: 'የሥራ ልብስ',
      Footwear: 'የሥራ ጫማ'
    },
    genders: {
      All: 'ሁሉንም ፆታ',
      Male: 'ወንድ',
      Female: 'ሴት'
    },
    workSectors: {
      All: 'ሁሉንም የሥራ ዘርፎች',
      Farmer: 'ግብርና',
      Construction: 'ግንባታ',
      Mining: 'ማዕድን',
      Welding: 'ብረታ ብረት / ዌልዲንግ',
      Electrical: 'ኤሌክትሪክ'
    },
    materials: {
      All: 'ሁሉንም ጥሬ ዕቃዎች',
      'Cotton/Polyester': 'ጥጥ / ፖሊስተር',
      'Steel/Polymer': 'ብረት / ፖሊመር',
      Leather: 'ቆዳ',
      Kevlar: 'ኬቭላር',
      Rubber: 'ላስቲክ'
    }
  },
  om: {
    filterEngine: 'Calaltuu',
    reset: 'Irra Deebi\'i',
    productCategory: 'Gosa Meeshaa',
    workSector: 'Ceesisa Hojii',
    targetGender: 'Kornayaa',
    rawMaterial: 'Uffata/Meeshaa Dhaabaa',
    showing: 'Kan Mul\'atu',
    safetyAssets: 'Meeshaalee Nageenyaa',
    newest: 'Haaraa Jalqaba',
    lowToHigh: 'Gattii: Xiqqaa gara Guddaatti',
    highToLow: 'Gattii: Guddaa gara Xiqqaatti',
    scanning: 'Meeshaalee Barbaadaa Jira...',
    noGear: 'Meeshaan Nageenyaa Barbaadame Hin Argamne',
    noGearDesc: 'Mala calallii keessan haqaatii irra deebi\'aatii yaalaa.',
    clearFilters: 'Calaltuu Hundumaa Haqaa',
    soldOut: 'Dhumateera',
    inStock: 'Jira',
    units: 'Qophii',
    assetValue: 'Gattii',
    gear: 'Meeshaa',
    searchResultFor: 'Bu\'aa barbaacha',
    categories: {
      All: 'Gosoota Hunda',
      Headwear: 'Gonfoo / Baallii',
      Workwear: 'Uffata Hojii',
      Footwear: 'Kopphee Hojii'
    },
    genders: {
      All: 'Kornayaa Hunda',
      Male: 'Dhiira',
      Female: 'Dubara'
    },
    workSectors: {
      All: 'Sekteroota Hojii Hunda',
      Farmer: 'Qonnaa',
      Construction: 'Ijaarsa',
      Mining: 'Abooba / Qotiisa',
      Welding: 'Soddaarii',
      Electrical: 'Elektiriikii'
    },
    materials: {
      All: 'Meeshaa Hunda',
      'Cotton/Polyester': 'Jiinii / Poliyestarii',
      'Steel/Polymer': 'Sibiila / Polimarii',
      Leather: 'Gogaa',
      Kevlar: 'Keevlaarii',
      Rubber: 'Roppii / Gommaa'
    }
  }
};

const MOCK_PRODUCTS = [
  { 
    _id: 'p1', 
    product_name: 'Vanguard Hard Hat Helmet', 
    price: 89.99, 
    stock: 18, 
    category: 'Headwear',
    gender: 'Male',
    rawProduct: 'Steel/Polymer',
    workCategory: 'Construction',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1590483736622-39da8caf3ef8?auto=format&fit=crop&q=80&w=500' 
  },
  { 
    _id: 'p2', 
    product_name: 'Aegis High-Vis Safety Vest', 
    price: 24.99, 
    stock: 0, 
    category: 'Workwear',
    gender: 'Female',
    rawProduct: 'Cotton/Polyester',
    workCategory: 'Farmer',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=500' 
  }
];

const ShopScreen = () => {
  const [products, setProducts] = useState([]);

  // Helper to safely fetch target language key
  const getCurrentLang = () => {
    const raw = localStorage.getItem('lang') || localStorage.getItem('language') || localStorage.getItem('appLang') || 'en';
    const lower = raw.toLowerCase();
    if (lower.includes('am') || lower.includes('አማ')) return 'am';
    if (lower.includes('om') || lower.includes('or')) return 'om';
    return 'en';
  };

  const [lang, setLang] = useState(getCurrentLang());

  // Sync language selection
  useEffect(() => {
    const syncLang = () => {
      const current = getCurrentLang();
      setLang((prev) => (prev !== current ? current : prev));
    };

    const interval = setInterval(syncLang, 150);
    window.addEventListener('languageChange', syncLang);
    window.addEventListener('storage', syncLang);

    return () => {
      clearInterval(interval);
      window.removeEventListener('languageChange', syncLang);
      window.removeEventListener('storage', syncLang);
    };
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const translateKey = (group, key) => {
    if (!key) return '';
    return t[group]?.[key] || TRANSLATIONS.en[group]?.[key] || key;
  };

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedWorkCategory, setSelectedWorkCategory] = useState('All');
  const [selectedRawProduct, setSelectedRawProduct] = useState('All');
  
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [likedItems, setLikedItems] = useState({});

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Search Query Param
  const searchQuery = searchParams.get('search') || '';

  // Filter Lists
  const categoriesList = ['All', 'Headwear', 'Workwear', 'Footwear'];
  const genderList = ['All', 'Male', 'Female'];
  const workCategoriesList = ['All', 'Farmer', 'Construction', 'Mining', 'Welding', 'Electrical'];
  const rawProductsList = ['All', 'Cotton/Polyester', 'Steel/Polymer', 'Leather', 'Kevlar', 'Rubber'];

  const normalizeCategory = (catParam) => {
    if (!catParam) return 'All';
    const lower = catParam.toLowerCase();
    if (lower.includes('head') || lower.includes('helmet')) return 'Headwear';
    if (lower.includes('vis') || lower.includes('work') || lower.includes('high')) return 'Workwear';
    if (lower.includes('shoe') || lower.includes('foot') || lower.includes('boot')) return 'Footwear';
    
    const found = categoriesList.find(c => c.toLowerCase() === lower);
    return found || 'All';
  };

  useEffect(() => {
    const queryCategory = searchParams.get('category');
    if (queryCategory) {
      setSelectedCategory(normalizeCategory(queryCategory));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('/api/products');
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(MOCK_PRODUCTS);
        }
      } catch (error) {
        setProducts(MOCK_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const productId = product._id || product.id;
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const itemIndex = existingCart.findIndex((item) => (item._id || item.id) === productId);

    if (itemIndex > -1) {
      existingCart[itemIndex].qty = (Number(existingCart[itemIndex].qty) || 1) + 1;
    } else {
      existingCart.push({
        _id: productId,
        name: product.product_name || product.name,
        price: Number(product.price) || 0,
        image: product.image,
        qty: 1,
        countInStock: product.countInStock !== undefined ? product.countInStock : product.stock
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Multi-Filter Matching Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const pName = (p.product_name || p.name || '').toLowerCase();
      const matchSearch = !searchQuery.trim() || 
        pName.includes(searchQuery.toLowerCase().trim()) || 
        (p.category || '').toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (p.workCategory || '').toLowerCase().includes(searchQuery.toLowerCase().trim());

      const pCat = (p.category || '').toLowerCase();
      const matchCat = selectedCategory === 'All' || 
                       pCat === selectedCategory.toLowerCase() || 
                       normalizeCategory(pCat) === selectedCategory;

      const pGender = (p.gender || '').toLowerCase();
      const matchGender = selectedGender === 'All' || pGender === selectedGender.toLowerCase();

      const pWork = (p.workCategory || '').toLowerCase();
      const matchWork = selectedWorkCategory === 'All' || pWork === selectedWorkCategory.toLowerCase();

      const pRaw = (p.rawProduct || '').toLowerCase();
      const matchRaw = selectedRawProduct === 'All' || pRaw.includes(selectedRawProduct.toLowerCase());

      return matchSearch && matchCat && matchGender && matchWork && matchRaw;
    });
  }, [searchQuery, selectedCategory, selectedGender, selectedWorkCategory, selectedRawProduct, products]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'low-to-high') {
      return list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    }
    if (sortBy === 'high-to-low') {
      return list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    }
    return list; 
  }, [filteredProducts, sortBy]);

  const toggleLike = (id) => {
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('All');
    setSelectedWorkCategory('All');
    setSelectedRawProduct('All');
    setSortBy('newest');
    if (searchQuery) {
      navigate('/shop');
    }
  };

  return (
    /* MAIN WRAPPER - FORCED LIGHT GRAY BACKGROUND */
    <div className="bg-gray-200 min-h-screen font-sans antialiased text-gray-800">
      
      <Navbar />

      {/* Main Container */}
      <main className="max-w-[1600px] mx-auto px-6 pt-28 pb-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* ================= SIDEBAR FILTERS ================= */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto bg-white p-6 rounded-3xl border border-gray-300 shadow-sm">
            
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 sticky top-0 bg-white z-10 pt-1">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-purple-600" />
                <h2 className="text-base font-black uppercase tracking-wide text-gray-900">{t.filterEngine}</h2>
              </div>
              <button 
                onClick={resetFilters} 
                className="text-[11px] font-extrabold uppercase text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors"
              >
                <RotateCcw size={12} /> {t.reset}
              </button>
            </div>
            
            {/* 1. CATEGORY FILTER */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-gray-900 flex items-center gap-1.5">
                <Grid size={13} className="text-purple-600" /> {t.productCategory}
              </label>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all ${
                      selectedCategory === cat 
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {translateKey('categories', cat)}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. WORK CATEGORY / FIELD FILTER */}
            <div className="space-y-2 pt-3 border-t border-gray-200">
              <label className="text-xs font-extrabold uppercase text-gray-900 flex items-center gap-1.5">
                <Briefcase size={13} className="text-purple-600" /> {t.workSector}
              </label>
              <div className="relative">
                <select 
                  value={selectedWorkCategory}
                  onChange={(e) => setSelectedWorkCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 uppercase appearance-none focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  {workCategoriesList.map(w => (
                    <option key={w} value={w} className="bg-white">
                      {translateKey('workSectors', w)}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* 3. GENDER TARGET */}
            <div className="space-y-2 pt-3 border-t border-gray-200">
              <label className="text-xs font-extrabold uppercase text-gray-900 flex items-center gap-1.5">
                <User size={13} className="text-purple-600" /> {t.targetGender}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                {genderList.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`px-2 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all text-center ${
                      selectedGender === g 
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {translateKey('genders', g)}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. RAW PRODUCT / MATERIAL */}
            <div className="space-y-2 pt-3 border-t border-gray-200">
              <label className="text-xs font-extrabold uppercase text-gray-900 flex items-center gap-1.5">
                <Layers size={13} className="text-purple-600" /> {t.rawMaterial}
              </label>
              <div className="relative">
                <select 
                  value={selectedRawProduct}
                  onChange={(e) => setSelectedRawProduct(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 uppercase appearance-none focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  {rawProductsList.map(mat => (
                    <option key={mat} value={mat} className="bg-white">
                      {translateKey('materials', mat)}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
              </div>
            </div>

          </aside>

          {/* ================= PRODUCTS GRID ================= */}
          <section className="flex-1 w-full space-y-6">
            
            {/* Toolbar Summary & Sorting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-300 p-4 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-600 font-extrabold uppercase tracking-wider">
                  {t.showing} <span className="text-purple-600 font-black text-sm">{sortedProducts.length}</span> {t.safetyAssets}
                </p>
                {searchQuery && (
                  <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-purple-200">
                    <Search size={12} /> "{searchQuery}"
                  </span>
                )}
              </div>
              
              <div className="relative flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 cursor-pointer">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent pr-6 appearance-none cursor-pointer focus:outline-none text-xs font-extrabold uppercase tracking-wider text-gray-800"
                >
                  <option value="newest" className="bg-white">{t.newest}</option>
                  <option value="low-to-high" className="bg-white">{t.lowToHigh}</option>
                  <option value="high-to-low" className="bg-white">{t.highToLow}</option>
                </select>
                <ChevronDown size={14} className="text-gray-500 absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Content States */}
            {isLoading ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3">
                <Loader2 className="animate-spin text-purple-600" size={32} />
                <p className="text-gray-500 font-extrabold uppercase tracking-widest text-xs">{t.scanning}</p>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 space-y-3 p-6">
                <Grid size={40} className="text-gray-400 mx-auto" />
                <p className="text-gray-900 font-black uppercase tracking-wide text-base">{t.noGear}</p>
                <p className="text-gray-500 text-xs font-medium max-w-md mx-auto">{t.noGearDesc}</p>
                <button 
                  onClick={resetFilters} 
                  className="bg-purple-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mt-2 shadow-md shadow-purple-600/20"
                >
                  <RotateCcw size={12} /> {t.clearFilters}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {sortedProducts.map((p) => {
                  const productId = p._id || p.id;
                  const productName = p.product_name || p.name;
                  const productPrice = Number(p.price) || 0;
                  const productStock = p.countInStock !== undefined ? p.countInStock : p.stock;
                  const isSoldOut = productStock === 0;
                  const imageUrl = p.image || 'https://via.placeholder.com/500';
                  const isLiked = !!likedItems[productId];

                  return (
                    <div 
                      key={productId}
                      className="bg-white rounded-3xl p-4 border border-gray-300 hover:border-purple-400 shadow-sm hover:shadow-md transition-all duration-300 group relative flex flex-col justify-between"
                    >
                      {/* Product Image Container */}
                      <div className="relative h-48 bg-gray-100 rounded-2xl mb-4 overflow-hidden flex items-center justify-center border border-gray-200">
                        <img 
                          src={imageUrl} 
                          alt={productName} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          loading="lazy"
                        />
                        
                        {isSoldOut ? (
                          <span className="absolute top-3 right-3 bg-red-100 text-red-600 border border-red-200 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider z-10">
                            {t.soldOut}
                          </span>
                        ) : (
                          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 border border-gray-200 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase z-10">
                            {productStock !== undefined ? `${productStock} ${t.units}` : t.inStock}
                          </span>
                        )}

                        <span className="absolute top-3 left-3 bg-purple-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-widest z-10 shadow-sm">
                          {translateKey('workSectors', p.workCategory) || translateKey('categories', p.category) || p.workCategory || p.category || t.gear}
                        </span>
                      </div>

                      {/* Details & Actions Under Image */}
                      <div className="space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={11} 
                                className={`${i < Math.round(p.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <h3 className="font-extrabold text-gray-900 text-xs uppercase tracking-wide line-clamp-2 mb-1 min-h-[2.25rem]">
                            {productName}
                          </h3>
                        </div>

                        {/* Bottom Bar */}
                        <div className="pt-3 border-t border-gray-200 flex items-center justify-between gap-2">
                          <div>
                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">{t.assetValue}</span>
                            <p className="text-gray-900 font-black text-base">${productPrice.toFixed(2)}</p>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button 
                              onClick={() => toggleLike(productId)}
                              className="p-2 bg-gray-50 hover:bg-purple-50 border border-gray-300 hover:border-purple-300 rounded-xl text-gray-600 hover:text-purple-600 transition-colors"
                              title="Favorite"
                            >
                              <Heart size={15} className={isLiked ? "fill-purple-600 text-purple-600" : ""} />
                            </button>

                            <Link 
                              to={`/product/${productId}`} 
                              className="p-2 bg-gray-50 hover:bg-purple-50 border border-gray-300 hover:border-purple-300 rounded-xl text-gray-600 hover:text-purple-600 transition-colors"
                              title="View Details"
                            >
                              <Eye size={15} />
                            </Link>

                            {isSoldOut ? (
                              <button 
                                disabled
                                className="bg-gray-200 text-gray-400 p-2 rounded-xl text-[10px] font-bold uppercase cursor-not-allowed"
                              >
                                Off
                              </button>
                            ) : (
                              <button 
                                onClick={() => addToCart(p)}
                                className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 active:scale-95"
                                title="Add to Cart"
                              >
                                <ShoppingCart size={15} />
                              </button>
                            )}
                          </div>
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