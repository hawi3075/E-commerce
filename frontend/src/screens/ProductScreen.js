import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Star, ShoppingCart, Share2, ArrowLeft, CheckCircle2, 
  Package, Tag, Hash, ShoppingBag, MapPin, Phone, Mail, Loader2 
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
    relatedItems: 'Related Items',
    relatedDesc: 'Products from the same category and style.',
    browseAll: 'Browse all',
    customerReviews: 'Customer Reviews',
    feedbackDesc: 'Feedback from customers who purchased this item.',
    writeReview: 'Write a review',
    pleaseLogin: 'Please log in to leave a review.',
    noReviews: 'No reviews yet. Be the first to share your experience.',
    singleConfig: 'Single configuration',
    variants: 'Variants',
    rating: 'Rating',
    noReviewsYet: 'No reviews yet'
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
    relatedItems: 'ተዛማጅ እቃዎች',
    relatedDesc: 'ከተመሳሳይ ምድብ እና ዘይቤ የተመረጡ ምርቶች።',
    browseAll: 'ሁሉንም ይመልከቱ',
    customerReviews: 'የደንበኞች አስተያየት',
    feedbackDesc: 'ይህን እቃ የገዙ ደንበኞች የሰጡት አስተያየት።',
    writeReview: 'አስተያየት ይፃፉ',
    pleaseLogin: 'አስተያየት ለመተው እባክዎ አስቀድመው ይግቡ።',
    noReviews: 'እስካሁን ምንም አስተያየት የለም። የመጀመሪያው ይሁኑ!',
    singleConfig: 'አንድ ዓይነት ምርት',
    variants: 'ዓይነቶች',
    rating: 'ደረጃ',
    noReviewsYet: 'አስተያየት አልተሰጠም'
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
    relatedDesc: 'Meeshoota gosa fi akkaataa walfakkaatu qaban.',
    browseAll: 'Hunda ilaali',
    customerReviews: 'Yaada Maamiltootaa',
    feedbackDesc: 'Yaada maamiltoota meeshaa kana bitaniirraa.',
    writeReview: 'Yaada barreessi',
    pleaseLogin: 'Yaada kennuuf mee dura seenaa.',
    noReviews: 'Hanga ammaatti yaadni hin kennamne.',
    singleConfig: 'Qofaa',
    variants: 'Gosoota',
    rating: 'Sadarkaa',
    noReviewsYet: 'Yaadni hin jiru'
  }
};

// FALLBACK MOCK DATA
const MOCK_DETAIL = {
  _id: '69e6b41bed56c4bf66376a27',
  product_name: 'Slim Fit Chinos',
  sku: 'SKU-1776727065730-11',
  price: 0.34,
  stock: 56,
  rating: 0.0,
  numReviews: 0,
  category: 'MEN',
  description: 'Comfortable and stylish chinos for daily use.',
  images: [
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800'
  ],
  soldCount: 4
};

const MOCK_RELATED = [
  { _id: 'r1', name: 'Classic Casual Shirt', price: 0.28, stock: 80, rating: 4.6, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=400' },
  { _id: 'r2', name: 'Kids Cotton Hoodie', price: 0.22, stock: 100, rating: 4.7, image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=400' },
  { _id: 'r3', name: 'Decorative Wall Mirror', price: 0.78, stock: 18, rating: 5.0, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=400' },
  { _id: 'r4', name: 'Leather Minimalist Wallet', price: 0.28, stock: 0, rating: 5.0, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400' }
];

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
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        setProduct(MOCK_DETAIL);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
    setRelated(MOCK_RELATED);
  }, [id]);

  if (isLoading) {
    return (
      <div className="bg-[#f9f8f3] min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <Loader2 className="animate-spin text-emerald-700 mb-3" size={36} />
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const currentStock = product.stock ?? product.countInStock ?? 0;
  const mainImage = product.images?.[0] || product.image || MOCK_DETAIL.images[0];

  return (
    <div className="bg-[#f9f8f3] min-h-screen text-slate-800 font-sans antialiased flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-[1240px] mx-auto px-4 lg:px-8 pt-24 pb-16">
          
          {/* Back Button */}
          <div className="mb-6">
            <button 
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-slate-800 text-slate-900 rounded-xl text-xs font-extrabold hover:bg-slate-900 hover:text-white transition-all shadow-sm"
            >
              <ArrowLeft size={16} /> {t.backToShop}
            </button>
          </div>

          {/* MAIN PRODUCT CARD */}
          <div className="bg-white rounded-3xl p-6 lg:p-10 border border-slate-200/80 shadow-sm mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Product Image Section */}
              <div className="lg:col-span-6 relative">
                {currentStock > 0 && (
                  <span className="absolute top-4 left-4 z-10 px-3.5 py-1 bg-[#dcfce7] text-[#15803d] font-bold text-xs rounded-full border border-emerald-200">
                    {t.inStock}
                  </span>
                )}
                <div className="w-full h-[450px] lg:h-[500px] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center">
                  <img 
                    src={mainImage} 
                    alt={product.product_name} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Product Details & Actions */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#15803d]">
                      {product.category || 'General'}
                    </span>
                    <button className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>

                  <h1 className="text-2xl lg:text-3xl font-black text-slate-900 mb-3 tracking-tight">
                    {product.product_name}
                  </h1>

                  {/* Ratings and SKU */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-slate-300" />
                      ))}
                      <span className="font-bold text-slate-900 ml-1">{(product.rating || 0).toFixed(1)}</span>
                      <span>{product.numReviews || 0} reviews</span>
                    </div>
                    <span>•</span>
                    <span className="font-mono">{t.sku}: {product.sku || 'N/A'}</span>
                  </div>

                  {/* Price Banner Box */}
                  <div className="bg-[#fcfbf9] border border-slate-200/80 rounded-2xl p-6 mb-6">
                    <p className="text-4xl font-black text-[#166534] mb-2">
                      ${Number(product.price || 0).toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-600 font-medium">
                      {currentStock} {t.unitsAvailable}
                    </p>
                  </div>

                  <p className="text-xs lg:text-sm text-slate-600 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Feature Highlights Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <Package size={14} />
                        <span className="text-[11px] font-semibold">{t.availability}</span>
                      </div>
                      <p className="text-xs font-black text-slate-900">{currentStock} in stock</p>
                    </div>

                    <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <Star size={14} />
                        <span className="text-[11px] font-semibold">{t.rating}</span>
                      </div>
                      <p className="text-xs font-black text-slate-900">{t.noReviewsYet}</p>
                    </div>

                    <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="flex items-center gap-2 text-slate-500 mb-1">
                        <CheckCircle2 size={14} />
                        <span className="text-[11px] font-semibold">{t.variants}</span>
                      </div>
                      <p className="text-xs font-black text-slate-900">{t.singleConfig}</p>
                    </div>
                  </div>
                </div>

                {/* Quantity & CTA Buttons */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-900">Quantity</span>
                    <div className="flex items-center border border-slate-200 bg-slate-50 rounded-xl p-1">
                      <button 
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-lg transition-all"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-black">{qty}</span>
                      <button 
                        onClick={() => setQty(Math.min(currentStock, qty + 1))}
                        className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-lg transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button 
                      onClick={() => navigate('/cart')}
                      className="w-full bg-[#15803d] hover:bg-[#166534] text-white py-3.5 px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <ShoppingCart size={16} /> {t.addToCart}
                    </button>
                    <button 
                      onClick={() => navigate('/checkout')}
                      className="w-full bg-[#fef2f2] hover:bg-[#fee2e2] text-[#991b1b] py-3.5 px-6 rounded-xl font-bold text-xs transition-all border border-red-100"
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
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm">
              <h2 className="text-base font-black text-slate-900 mb-4">{t.overview}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Details Specs */}
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm space-y-3">
              <h2 className="text-base font-black text-slate-900 mb-4">{t.productDetails}</h2>
              
              <div className="p-3 bg-slate-50/80 rounded-2xl flex items-center gap-3">
                <Package size={16} className="text-[#15803d]" />
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400">{t.availability}</p>
                  <p className="text-xs font-black text-slate-800">{currentStock} in stock</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-2xl flex items-center gap-3">
                <Tag size={16} className="text-[#15803d]" />
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400">{t.category}</p>
                  <p className="text-xs font-black text-slate-800">{product.category || 'General'}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-2xl flex items-center gap-3">
                <Hash size={16} className="text-[#15803d]" />
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400">{t.sku}</p>
                  <p className="text-xs font-mono font-bold text-slate-800">{product.sku || 'N/A'}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-2xl flex items-center gap-3">
                <ShoppingBag size={16} className="text-[#15803d]" />
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400">{t.unitsSold}</p>
                  <p className="text-xs font-black text-slate-800">{product.soldCount || 4} total</p>
                </div>
              </div>
            </div>
          </div>

          {/* RELATED ITEMS */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-black text-slate-900">{t.relatedItems}</h2>
                <p className="text-xs text-slate-500">{t.relatedDesc}</p>
              </div>
              <Link to="/shop" className="text-xs font-bold text-[#15803d] hover:underline">
                {t.browseAll}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <div key={item._id} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between group">
                  <div className="relative">
                    {item.stock > 0 ? (
                      <span className="absolute top-3 right-3 z-10 px-2.5 py-0.5 bg-[#dcfce7] text-[#15803d] font-bold text-[10px] rounded-full">
                        {item.stock} in stock
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 z-10 px-2.5 py-0.5 bg-red-100 text-red-700 font-bold text-[10px] rounded-full">
                        Sold out
                      </span>
                    )}
                    <div className="h-64 bg-slate-50 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      {item.name === 'Kids Cotton Hoodie' && (
                        <button className="w-full bg-[#15803d] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 mb-3">
                          <ShoppingCart size={14} /> Add to Cart
                        </button>
                      )}
                      <h3 className="text-xs font-extrabold text-slate-900 mb-1">{item.name}</h3>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-800">{item.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm font-black text-[#166534]">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CUSTOMER REVIEWS */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-sm mb-12">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h2 className="text-base font-black text-slate-900">{t.customerReviews}</h2>
                <p className="text-xs text-slate-500">{t.feedbackDesc}</p>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-slate-800">
                <span>0.0</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-slate-200" />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-slate-50/80 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-xs font-black text-slate-900 mb-2">{t.writeReview}</h3>
                <p className="text-xs text-slate-500">
                  Please <Link to="/login" className="text-[#15803d] font-bold underline">log in</Link> to leave a review.
                </p>
              </div>

              <div className="lg:col-span-7 bg-slate-50/80 p-6 rounded-2xl border border-slate-100 flex items-center justify-center">
                <p className="text-xs text-slate-500 font-medium">{t.noReviews}</p>
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* EFOY GABEYA FOOTER */}
      <footer className="bg-black text-white pt-12 pb-8 rounded-t-3xl">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-[#15803d] flex items-center justify-center font-bold text-xs">E</div>
              <span className="text-base font-black tracking-tight">Efoy Gabeya</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Your trusted marketplace for quality products and fast delivery. Providing excellent service across Ethiopia.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs font-medium text-zinc-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-3">Headquarters</h4>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-[#15803d]" /> Bole Road, Addis Ababa
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#15803d]" /> +251 911 223344
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#15803d]" /> hub@efoygabeya.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductScreen;