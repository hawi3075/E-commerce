import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Star, ShoppingCart, Share2, ArrowLeft,
  Package, Tag, Hash, ShoppingBag, MapPin, Phone, Mail, Loader2, AlertCircle,
  Palette, Check, User, Send
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
    customerReviews: 'Customer Reviews',
    feedbackDesc: 'Feedback from customers who purchased this item.',
    writeReview: 'Write a Customer Review',
    pleaseLogin: 'Please log in to leave a review.',
    noReviews: 'No reviews yet. Be the first to share your experience.',
    variants: 'Variants',
    rating: 'Rating',
    noReviewsYet: 'No reviews yet',
    productNotFound: 'Product not found',
    errorFetching: 'Failed to load product details.',
    color: 'Select Color',
    linkCopied: 'Link Copied!',
    yourRating: 'Your Rating',
    yourComment: 'Your Comment',
    submitReview: 'Submit Review',
    reviewSubmitted: 'Review submitted successfully!'
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
    customerReviews: 'የደንበኞች አስተያየት',
    feedbackDesc: 'ይህን እቃ የገዙ ደንበኞች የሰጡት አስተያየት።',
    writeReview: 'አስተያየት ይፃፉ',
    pleaseLogin: 'አስተያየት ለመተው እባክዎ አስቀድመው ይግቡ።',
    noReviews: 'እስካሁን ምንም አስተያየት የለም። የመጀመሪያው ይሁኑ!',
    variants: 'ዓይነቶች',
    rating: 'ደረጃ',
    noReviewsYet: 'አስተያየት አልተሰጠም',
    productNotFound: 'ምርቱ አልተገኘም',
    errorFetching: 'የምርቱን ዝርዝር መጫን አልተቻለም።',
    color: 'ቀለም ይምረጡ',
    linkCopied: 'ሊንኩ ተቀድቷል!',
    yourRating: 'የእርስዎ ደረጃ',
    yourComment: 'የእርስዎ አስተያየት',
    submitReview: 'አስተያየት ላክ',
    reviewSubmitted: 'አስተያየትዎ በተሳካ ሁኔታ ተልኳል!'
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
    customerReviews: 'Yaada Maamiltootaa',
    feedbackDesc: 'Yaada maamiltoota meeshaa kana bitaniirraa.',
    writeReview: 'Yaada barreessi',
    pleaseLogin: 'Yaada kennuuf mee dura seenaa.',
    noReviews: 'Hanga ammaatti yaadni hin kennamne.',
    variants: 'Gosoota',
    rating: 'Sadarkaa',
    noReviewsYet: 'Yaadni hin jiru',
    productNotFound: 'Meeshaan hin argamne',
    errorFetching: 'Odeeffannoo meeshaa fiduun hin danda\'amne.',
    color: 'Halluu Filadhu',
    linkCopied: 'Liankiin kopy godhameera!',
    yourRating: 'Sadarkaa Keessan',
    yourComment: 'Yaada Keessan',
    submitReview: 'Yaada Ergi',
    reviewSubmitted: 'Yaadni keessan ergameera!'
  }
};

const DEFAULT_COLORS = ['Yellow', 'Black', 'Red', 'Blue'];

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
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Yellow');
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // User Auth State
  const [userInfo, setUserInfo] = useState(null);

  // Review Form States
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewMsg, setReviewMsg] = useState('');
  const [reviewErr, setReviewErr] = useState('');

  // Check login state
  useEffect(() => {
    const userStr = localStorage.getItem('userInfo') || localStorage.getItem('user');
    if (userStr) {
      try {
        setUserInfo(JSON.parse(userStr));
      } catch (e) {
        setUserInfo(null);
      }
    }
  }, []);

  // Sync Language
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

  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);

      const mainImg = data.images?.[0] || data.image || '/placeholder.png';
      setSelectedImage(mainImg);

      const colors = data.colors && data.colors.length > 0 ? data.colors : DEFAULT_COLORS;
      setSelectedColor(colors[0]);

    } catch (err) {
      setError(err.response?.data?.message || TRANSLATIONS[getCurrentLang()]?.errorFetching || 'Failed to load product details.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductData();
    }
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || product?.product_name,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setReviewErr('Please write a comment.');
      return;
    }

    try {
      setReviewSubmitting(true);
      setReviewErr('');
      setReviewMsg('');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`
        }
      };

      await axios.post(
        `/api/products/${id}/reviews`,
        { rating: Number(rating), comment },
        config
      );

      setReviewMsg(t.reviewSubmitted);
      setComment('');
      setRating(5);
      fetchProductData();
    } catch (err) {
      setReviewErr(err.response?.data?.message || 'Failed to submit review.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleBuyNow = () => {
    if (!product) return;
    navigate('/checkout', {
      state: {
        product: {
          _id: product._id,
          name: product.name || product.product_name,
          price: product.price,
          image: selectedImage || product.images?.[0] || product.image
        },
        qty,
        color: selectedColor
      }
    });
  };

  const handleAddToCart = () => {
    navigate('/cart', {
      state: {
        product,
        qty,
        color: selectedColor
      }
    });
  };

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="animate-spin text-purple-700 mb-3" size={36} />
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] px-4 text-center">
          <AlertCircle className="text-purple-600 mb-3" size={48} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t.productNotFound}</h2>
          <p className="text-xs text-gray-600 mb-4">{error || t.errorFetching}</p>
          <button 
            onClick={() => navigate('/shop')}
            className="px-5 py-2 bg-purple-700 text-white rounded-xl text-xs font-bold hover:bg-purple-800 transition-all shadow"
          >
            {t.backToShop}
          </button>
        </div>
      </div>
    );
  }

  const currentStock = product.countInStock ?? product.stock ?? 0;
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image || '/placeholder.png'];
  const availableColors = product.colors && product.colors.length > 0 ? product.colors : DEFAULT_COLORS;

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 font-sans antialiased flex flex-col justify-between">
      <div>
        <Navbar />

        {/* TIGHTER CONTAINER TOP PADDING (pt-20 instead of pt-24) */}
        <main className="max-w-[1200px] mx-auto px-4 lg:px-6 pt-20 pb-8">
          
          {/* TIGHT BACK BUTTON DISTANCE */}
          <div className="mb-2">
            <button 
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-purple-50 text-purple-700 rounded-xl text-xs font-extrabold transition-all border border-gray-200 shadow-sm"
            >
              <ArrowLeft size={15} />
              <span>{t.backToShop}</span>
            </button>
          </div>

          {/* MAIN COMPACT PRODUCT CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
            
            {/* LEFT BOX: Compact Image Container */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                {/* Reduced Image Height to 200px-240px */}
                <div className="relative w-full h-[200px] sm:h-[240px] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-3">
                  {currentStock > 0 ? (
                    <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 bg-purple-50 text-purple-700 font-extrabold text-[10px] rounded-full border border-purple-200">
                      {t.inStock}
                    </span>
                  ) : (
                    <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 bg-red-50 text-red-700 font-extrabold text-[10px] rounded-full border border-red-200">
                      {t.outOfStock}
                    </span>
                  )}
                  
                  <img 
                    src={selectedImage} 
                    alt={product.name || product.product_name} 
                    className="max-h-full max-w-full object-contain rounded-lg transition-all duration-200"
                  />
                </div>

                {/* Thumbnails */}
                {productImages.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pt-3">
                    {productImages.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(imgUrl)}
                        className={`w-12 h-12 rounded-lg overflow-hidden border transition-all flex-shrink-0 ${
                          selectedImage === imgUrl ? 'border-purple-700 scale-105 shadow-sm' : 'border-gray-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Minimal Specs */}
              <div className="grid grid-cols-3 gap-1.5 mt-4 pt-3 border-t border-gray-100 text-center">
                <div className="p-1.5 bg-gray-50 rounded-lg">
                  <p className="text-[9px] font-bold text-gray-400 uppercase">{t.availability}</p>
                  <p className="text-xs font-black text-gray-900">{currentStock} in stock</p>
                </div>
                <div className="p-1.5 bg-gray-50 rounded-lg">
                  <p className="text-[9px] font-bold text-gray-400 uppercase">{t.rating}</p>
                  <p className="text-xs font-black text-gray-900">{product.rating ? `${product.rating} / 5` : '-'}</p>
                </div>
                <div className="p-1.5 bg-gray-50 rounded-lg">
                  <p className="text-[9px] font-bold text-gray-400 uppercase">{t.variants}</p>
                  <p className="text-xs font-black text-gray-900">{availableColors.length} Colors</p>
                </div>
              </div>
            </div>

            {/* RIGHT BOX: Compact Product Info */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-4 lg:p-6 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                    {product.category || 'Safety Equipment'}
                  </span>
                  <button 
                    onClick={handleShare}
                    title="Share Product"
                    className="p-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    {copied ? <Check size={15} className="text-emerald-600" /> : <Share2 size={15} />}
                  </button>
                </div>

                <h1 className="text-xl lg:text-2xl font-black text-gray-900 mb-2 tracking-tight">
                  {product.name || product.product_name}
                </h1>

                {/* Rating & Review counter */}
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.round(product.rating || 0) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                    ))}
                    <span className="font-black text-gray-900 ml-1">{(product.rating || 0).toFixed(1)}</span>
                    <span className="text-[11px] text-gray-500">({product.numReviews || product.reviews?.length || 0} reviews)</span>
                  </div>
                </div>

                {/* Compact Price Display */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-3">
                  <p className="text-2xl font-black text-purple-900">
                    ${Number(product.price || 0).toFixed(2)}
                  </p>
                  <p className="text-[11px] text-gray-500 font-bold">
                    {currentStock} {t.unitsAvailable}
                  </p>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-medium mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* COLOR SELECTION */}
                <div className="mb-4">
                  <label className="flex items-center gap-1.5 text-xs font-black text-gray-900 mb-1.5">
                    <Palette size={14} className="text-purple-700" />
                    {t.color}: <span className="text-purple-700 font-extrabold">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {availableColors.map((clr) => (
                      <button
                        key={clr}
                        type="button"
                        onClick={() => setSelectedColor(clr)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all border ${
                          selectedColor === clr
                            ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {clr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-gray-900">Quantity</span>
                  <div className="flex items-center border border-gray-300 bg-gray-50 rounded-lg p-0.5">
                    <button 
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      disabled={currentStock === 0 || qty <= 1}
                      className="w-6 h-6 flex items-center justify-center font-black text-gray-700 hover:bg-white rounded transition-all text-xs disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="w-7 text-center text-xs font-black">{qty}</span>
                    <button 
                      onClick={() => setQty(Math.min(currentStock, qty + 1))}
                      disabled={currentStock === 0 || qty >= currentStock}
                      className="w-6 h-6 flex items-center justify-center font-black text-gray-700 hover:bg-white rounded transition-all text-xs disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button 
                    disabled={currentStock === 0}
                    onClick={handleAddToCart}
                    className="w-full bg-purple-700 hover:bg-purple-800 disabled:bg-gray-300 text-white py-2.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <ShoppingCart size={16} /> {t.addToCart}
                  </button>
                  
                  <button 
                    disabled={currentStock === 0}
                    onClick={handleBuyNow}
                    className="w-full bg-purple-50 hover:bg-purple-100 disabled:bg-gray-100 text-purple-900 py-2.5 px-4 rounded-xl font-extrabold text-xs transition-all border border-purple-200"
                  >
                    {t.buyNow}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* OVERVIEW & SPECS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <h2 className="text-base font-black text-gray-900 mb-2">{t.overview}</h2>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-2">
              <h2 className="text-base font-black text-gray-900 mb-2">{t.productDetails}</h2>
              <div className="p-2.5 bg-gray-50 rounded-xl flex items-center gap-2.5">
                <Package size={16} className="text-purple-700" />
                <div>
                  <p className="text-[9px] font-bold uppercase text-gray-400">{t.availability}</p>
                  <p className="text-xs font-black text-gray-800">{currentStock} in stock</p>
                </div>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-xl flex items-center gap-2.5">
                <Tag size={16} className="text-purple-700" />
                <div>
                  <p className="text-[9px] font-bold uppercase text-gray-400">{t.category}</p>
                  <p className="text-xs font-black text-gray-800">{product.category || 'General'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CUSTOMER REVIEWS */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm mb-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <div>
                <h2 className="text-base font-black text-gray-900">{t.customerReviews}</h2>
                <p className="text-[11px] text-gray-500 font-medium">{t.feedbackDesc}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-black text-gray-800">
                <span>{(product.rating || 0).toFixed(1)}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.round(product.rating || 0) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Form Side */}
              <div className="lg:col-span-5 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h3 className="text-xs font-black text-gray-900 mb-2.5">{t.writeReview}</h3>

                {userInfo ? (
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    {reviewMsg && (
                      <div className="p-2 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-lg border border-emerald-200">
                        {reviewMsg}
                      </div>
                    )}
                    {reviewErr && (
                      <div className="p-2 bg-red-50 text-red-700 text-[11px] font-bold rounded-lg border border-red-200">
                        {reviewErr}
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-extrabold text-gray-700 mb-1">{t.yourRating}</label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-0.5 focus:outline-none"
                          >
                            <Star 
                              size={18} 
                              className={star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-gray-700 mb-1">{t.yourComment}</label>
                      <textarea
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your review here..."
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-purple-600 focus:outline-none"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={reviewSubmitting}
                      className="w-full py-2.5 bg-purple-700 text-white rounded-lg text-xs font-black uppercase tracking-wider hover:bg-purple-800 transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                    >
                      {reviewSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                      {t.submitReview}
                    </button>
                  </form>
                ) : (
                  <div className="py-2">
                    <p className="text-xs text-gray-600 font-medium mb-3">
                      Please <Link to="/login" className="text-purple-700 font-extrabold underline">log in</Link> to write a review.
                    </p>
                    <button 
                      onClick={() => navigate('/login')}
                      className="w-full py-2.5 bg-purple-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-purple-800 transition-all"
                    >
                      Log In
                    </button>
                  </div>
                )}
              </div>

              {/* Feed Side */}
              <div className="lg:col-span-7 space-y-2.5">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev, idx) => (
                    <div key={rev._id || idx} className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                            <User size={12} />
                          </div>
                          <span className="text-xs font-extrabold text-gray-900">{rev.name || 'Anonymous User'}</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} className={i < rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 font-medium">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
                    <p className="text-xs text-gray-500 font-semibold">{t.noReviews}</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-black text-white pt-8 pb-6 rounded-t-2xl">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center font-black text-xs text-white">L</div>
              <span className="text-base font-black tracking-tight">Luu Safety</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-medium">
              Your trusted marketplace for quality safety gear across Ethiopia.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-2">Quick Links</h4>
            <ul className="space-y-1 text-xs font-semibold text-zinc-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-2">Contact</h4>
            <ul className="space-y-1.5 text-xs font-medium text-zinc-300">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-purple-400" /> Bole Road, Addis Ababa
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-purple-400" /> +251 911 223344
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductScreen;