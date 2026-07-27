import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Star, ShoppingCart, Share2, ArrowLeft, CheckCircle2, 
  Package, Tag, Hash, ShoppingBag, MapPin, Phone, Mail, Loader2, AlertCircle
} from 'lucide-react';

import Navbar from '../components/Navbar';

// TRANSLATIONS DICTIONARY
const TRANSLATIONS = {
  en: {
    backToShop: 'Back to Shop',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    unitsAvailable: 'units available for immediate order.',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    availability: 'Availability',
    category: 'Category',
    sku: 'SKU',
    unitsSold: 'Units sold',
    overview: 'Overview',
    productDetails: 'Product Details',
    relatedItems: 'Related Products',
    relatedDesc: 'Other products you might be interested in.',
    browseAll: 'Browse all',
    customerReviews: 'Customer Reviews',
    feedbackDesc: 'Feedback from customers who purchased this item.',
    writeReview: 'Write a review',
    pleaseLogin: 'Please log in to leave a review.',
    noReviews: 'No reviews yet. Be the first to share your experience.',
    singleConfig: 'Single configuration',
    variants: 'Variants',
    rating: 'Rating',
    noReviewsYet: 'No reviews yet',
    productNotFound: 'Product not found',
    errorFetching: 'Failed to load product details.'
  },
  am: {
    backToShop: 'ወደ ሱቅ ተመለስ',
    inStock: 'አለ',
    outOfStock: 'ያለቀ',
    unitsAvailable: 'እቃዎች ለወዲያውኑ ትዕዛዝ ዝግጁ ናቸው።',
    addToCart: 'ወደ ቅርጫት ጨምር',
    buyNow: 'አሁኑኑ ይግዙ',
    availability: 'ተገኝነት',
    category: 'ምድብ',
    sku: 'መለያ ቁጥር',
    unitsSold: 'የተሸጡ እቃዎች',
    overview: 'አጠቃላይ እይታ',
    productDetails: 'የምርት ዝርዝሮች',
    relatedItems: 'ተዛማጅ ምርቶች',
    relatedDesc: 'ሊወዷቸው የሚችሏቸው ሌሎች ምርቶች።',
    browseAll: 'ሁሉንም ይመልከቱ',
    customerReviews: 'የደንበኞች አስተያየት',
    feedbackDesc: 'ይህን እቃ የገዙ ደንበኞች የሰጡት አስተያየት።',
    writeReview: 'አስተያየት ይፃፉ',
    pleaseLogin: 'አስተያየት ለመተው እባክዎ አስቀድመው ይግቡ።',
    noReviews: 'እስካሁን ምንም አስተያየት የለም። የመጀመሪያው ይሁኑ!',
    singleConfig: 'አንድ ዓይነት ምርት',
    variants: 'ዓይነቶች',
    rating: 'ደረጃ',
    noReviewsYet: 'አስተያየት አልተሰጠም',
    productNotFound: 'ምርቱ አልተገኘም',
    errorFetching: 'የምርቱን ዝርዝር መጫን አልተቻለም።'
  },
  om: {
    backToShop: 'Gara Dukaatti Deebi\'i',
    inStock: 'Jira',
    outOfStock: 'Dhumateera',
    unitsAvailable: 'qophiin jira.',
    addToCart: 'Gara Geebaatti Dabali',
    buyNow: 'Amma Biti',
    availability: 'Qophiif Jira',
    category: 'Gosa',
    sku: 'Lakk. Addaa',
    unitsSold: 'Gurgurameera',
    overview: 'Waliigala',
    productDetails: 'Ibsa Meeshaa',
    relatedItems: 'Meeshoota Walfakkaatan',
    relatedDesc: 'Meeshoota biraa kanneen sirriitti si fayyadan.',
    browseAll: 'Hunda ilaali',
    customerReviews: 'Yaada Maamiltootaa',
    feedbackDesc: 'Yaada maamiltoota meeshaa kana bitaniirraa.',
    writeReview: 'Yaada barreessi',
    pleaseLogin: 'Yaada kennuuf mee dura seenaa.',
    noReviews: 'Hanga ammaatti yaadni hin kennamne.',
    singleConfig: 'Qofaa',
    variants: 'Gosoota',
    rating: 'Sadarkaa',
    noReviewsYet: 'Yaadni hin jiru',
    productNotFound: 'Meeshaan hin argamne',
    errorFetching: 'Odeeffannoo meeshaa fiduun hin danda\'amne.'
  }
};

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getCurrentLang = () => {
    const raw = localStorage.getItem('lang') || localStorage.getItem('language') || 'en';
    const lower = raw.toLowerCase();
    if (lower.includes('am') || lower.includes('አማ')) return 'am';
    if (lower.includes('om') || lower.includes('or')) return 'om';
    return 'en';
  };

  const [lang, setLang] = useState(getCurrentLang());
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const syncLang = () => setLang(getCurrentLang());
    window.addEventListener('languageChange', syncLang);
    window.addEventListener('storage', syncLang);
    return () => {
      window.removeEventListener('languageChange', syncLang);
      window.removeEventListener('storage', syncLang);
    };
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch Main Product Data
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);

        // Fetch Related Products
        try {
          const categoryParam = data.category ? `?category=${encodeURIComponent(data.category)}` : '';
          const relatedRes = await axios.get(`/api/products${categoryParam}`);
          const fetchedItems = relatedRes.data.products || relatedRes.data || [];
          setRelated(fetchedItems.filter(item => item._id !== id).slice(0, 4));
        } catch (e) {
          setRelated([]);
        }

      } catch (err) {
        setError(err.response?.data?.message || t.errorFetching);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id, t.errorFetching]);

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <Loader2 className="animate-spin text-purple-700 mb-3" size={44} />
          <p className="text-base font-extrabold text-gray-600 uppercase tracking-widest">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[70vh] px-4 text-center">
          <AlertCircle className="text-purple-600 mb-4" size={56} />
          <h2 className="text-2xl font-black text-gray-900 mb-3">{t.productNotFound}</h2>
          <p className="text-base text-gray-600 mb-6">{error || t.errorFetching}</p>
          <button 
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-purple-700 text-white rounded-xl text-sm font-bold hover:bg-purple-800 transition-all shadow-md"
          >
            {t.backToShop}
          </button>
        </div>
      </div>
    );
  }

  const currentStock = product.countInStock ?? product.stock ?? 0;
  const mainImage = product.images?.[0] || product.image || '/placeholder.png';

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 font-sans antialiased flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-[1240px] mx-auto px-4 lg:px-8 pt-24 pb-16">
          
          {/* Back Button with subtle Gray styling */}
          <div className="mb-6">
            <button 
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white hover:bg-purple-50 text-purple-700 rounded-2xl text-sm font-extrabold transition-all border border-gray-200 shadow-sm hover:shadow"
            >
              <ArrowLeft size={18} />
              <span>{t.backToShop}</span>
            </button>
          </div>

          {/* MAIN PRODUCT CARD */}
          <div className="bg-white rounded-3xl p-6 lg:p-10 border border-gray-200 shadow-sm mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Product Image Section */}
              <div className="lg:col-span-6 relative">
                {currentStock > 0 ? (
                  <span className="absolute top-4 left-4 z-10 px-4 py-1.5 bg-purple-50 text-purple-700 font-extrabold text-sm rounded-full border border-purple-200 shadow-sm">
                    {t.inStock}
                  </span>
                ) : (
                  <span className="absolute top-4 left-4 z-10 px-4 py-1.5 bg-red-50 text-red-700 font-extrabold text-sm rounded-full border border-red-200 shadow-sm">
                    {t.outOfStock}
                  </span>
                )}
                <div className="w-full h-[450px] lg:h-[520px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
                  <img 
                    src={mainImage} 
                    alt={product.name || product.product_name} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Product Details & Actions */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-extrabold uppercase tracking-wider text-purple-700">
                      {product.category || 'Safety Equipment'}
                    </span>
                    <button className="p-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                    {product.name || product.product_name}
                  </h1>

                  {/* Ratings and SKU */}
                  <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-600 mb-6">
                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className={i < Math.round(product.rating || 0) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                      ))}
                      <span className="font-extrabold text-gray-900 ml-1.5 text-base">{(product.rating || 0).toFixed(1)}</span>
                      <span>({product.numReviews || 0} reviews)</span>
                    </div>
                    {product.sku && (
                      <>
                        <span>•</span>
                        <span className="font-mono text-xs">{t.sku}: {product.sku}</span>
                      </>
                    )}
                  </div>

                  {/* Price Banner Box */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6">
                    <p className="text-5xl font-black text-purple-900 mb-2">
                      ${Number(product.price || 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-700 font-bold">
                      {currentStock} {t.unitsAvailable}
                    </p>
                  </div>

                  <p className="text-base text-gray-700 leading-relaxed font-medium mb-6">
                    {product.description}
                  </p>

                  {/* Feature Highlights Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Package size={16} />
                        <span className="text-xs font-bold">{t.availability}</span>
                      </div>
                      <p className="text-sm font-black text-gray-900">{currentStock} in stock</p>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Star size={16} />
                        <span className="text-xs font-bold">{t.rating}</span>
                      </div>
                      <p className="text-sm font-black text-gray-900">{product.rating ? `${product.rating} / 5` : t.noReviewsYet}</p>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                      <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <CheckCircle2 size={16} />
                        <span className="text-xs font-bold">{t.variants}</span>
                      </div>
                      <p className="text-sm font-black text-gray-900">{t.singleConfig}</p>
                    </div>
                  </div>
                </div>

                {/* Quantity & CTA Buttons */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black text-gray-900">Quantity</span>
                    <div className="flex items-center border border-gray-300 bg-gray-50 rounded-xl p-1">
                      <button 
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        disabled={currentStock === 0 || qty <= 1}
                        className="w-8 h-8 flex items-center justify-center font-black text-gray-700 hover:bg-white rounded-lg transition-all text-base disabled:opacity-40"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-base font-black">{qty}</span>
                      <button 
                        onClick={() => setQty(Math.min(currentStock, qty + 1))}
                        disabled={currentStock === 0 || qty >= currentStock}
                        className="w-8 h-8 flex items-center justify-center font-black text-gray-700 hover:bg-white rounded-lg transition-all text-base disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      disabled={currentStock === 0}
                      onClick={() => navigate('/cart')}
                      className="w-full bg-purple-700 hover:bg-purple-800 disabled:bg-gray-300 text-white py-4 px-6 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-700/10"
                    >
                      <ShoppingCart size={18} /> {t.addToCart}
                    </button>
                    <button 
                      disabled={currentStock === 0}
                      onClick={() => navigate('/checkout')}
                      className="w-full bg-purple-50 hover:bg-purple-100 disabled:bg-gray-100 text-purple-900 py-4 px-6 rounded-xl font-extrabold text-sm transition-all border border-purple-200"
                    >
                      {t.buyNow}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* OVERVIEW AND PRODUCT DETAILS CARDS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-black text-gray-900 mb-4">{t.overview}</h2>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Product Details Specs */}
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-xl font-black text-gray-900 mb-4">{t.productDetails}</h2>
              
              <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-4">
                <Package size={20} className="text-purple-700" />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">{t.availability}</p>
                  <p className="text-sm font-black text-gray-800">{currentStock} in stock</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-4">
                <Tag size={20} className="text-purple-700" />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">{t.category}</p>
                  <p className="text-sm font-black text-gray-800">{product.category || 'General'}</p>
                </div>
              </div>

              {product.sku && (
                <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-4">
                  <Hash size={20} className="text-purple-700" />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-400">{t.sku}</p>
                    <p className="text-sm font-mono font-bold text-gray-800">{product.sku}</p>
                  </div>
                </div>
              )}

              <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-4">
                <ShoppingBag size={20} className="text-purple-700" />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">{t.unitsSold}</p>
                  <p className="text-sm font-black text-gray-800">{product.soldCount || 0} total</p>
                </div>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS SECTION */}
          {related.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-black text-gray-900">{t.relatedItems}</h2>
                  <p className="text-sm text-gray-500 font-medium">{t.relatedDesc}</p>
                </div>
                <Link to="/shop" className="text-sm font-extrabold text-purple-700 hover:underline">
                  {t.browseAll}
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((item) => {
                  const itemStock = item.countInStock ?? item.stock ?? 0;
                  const itemImg = item.images?.[0] || item.image || '/placeholder.png';
                  return (
                    <div 
                      key={item._id} 
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between cursor-pointer group hover:border-purple-300 hover:shadow-md transition-all"
                    >
                      <div className="relative">
                        {itemStock > 0 ? (
                          <span className="absolute top-3 right-3 z-10 px-3 py-1 bg-purple-50 text-purple-700 font-extrabold text-xs rounded-full border border-purple-200">
                            {itemStock} in stock
                          </span>
                        ) : (
                          <span className="absolute top-3 right-3 z-10 px-3 py-1 bg-red-100 text-red-700 font-extrabold text-xs rounded-full">
                            Sold out
                          </span>
                        )}
                        <div className="h-64 bg-gray-50 overflow-hidden">
                          <img 
                            src={itemImg} 
                            alt={item.name || item.product_name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-grow">
                        <div>
                          <h3 className="text-sm font-extrabold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
                            {item.name || item.product_name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                            <Star size={14} className="fill-amber-400 text-amber-400" />
                            <span className="font-extrabold text-gray-800">{(item.rating || 0).toFixed(1)}</span>
                          </div>
                        </div>
                        <p className="text-base font-black text-purple-800">${Number(item.price || 0).toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CUSTOMER REVIEWS */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-200 shadow-sm mb-12">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div>
                <h2 className="text-xl font-black text-gray-900">{t.customerReviews}</h2>
                <p className="text-sm text-gray-500 font-medium">{t.feedbackDesc}</p>
              </div>
              <div className="flex items-center gap-2 text-base font-black text-gray-800">
                <span>{(product.rating || 0).toFixed(1)}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < Math.round(product.rating || 0) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-sm font-black text-gray-900 mb-2">{t.writeReview}</h3>
                <p className="text-sm text-gray-600 font-medium">
                  Please <Link to="/login" className="text-purple-700 font-extrabold underline">log in</Link> to leave a review.
                </p>
              </div>

              <div className="lg:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-center">
                <p className="text-sm text-gray-600 font-semibold">
                  {product.reviews && product.reviews.length > 0 ? `${product.reviews.length} reviews available.` : t.noReviews}
                </p>
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* LUU SAFETY FOOTER */}
      <footer className="bg-black text-white pt-12 pb-8 rounded-t-3xl">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-purple-600 flex items-center justify-center font-black text-sm text-white">L</div>
              <span className="text-lg font-black tracking-tight">Luu Safety</span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed font-medium">
              Your trusted marketplace for quality safety gear and protective products with reliable service across Ethiopia.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-zinc-400 mb-3">Quick Links</h4>
            <ul className="space-y-2.5 text-sm font-semibold text-zinc-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-zinc-400 mb-3">Headquarters</h4>
            <ul className="space-y-3 text-sm font-medium text-zinc-300">
              <li className="flex items-center gap-2.5">
                <MapPin size={16} className="text-purple-400" /> Bole Road, Addis Ababa
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-purple-400" /> +251 911 223344
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-purple-400" /> support@luusafety.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductScreen;