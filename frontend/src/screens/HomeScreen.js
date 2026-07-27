import React, { useState, useEffect, createContext, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Shield, ArrowRight, Star, ShoppingCart, 
  MapPin, Eye, Heart, 
  Grid, Clock, UserCheck, TrendingUp, Loader2,
  Lock, Truck, Headset, Headphones
} from 'lucide-react';

import headerVideo from '../components/luu.webm';

const animationStyles = `
  @keyframes floatSlow {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }
  .animate-float-slow {
    animation: floatSlow 5s ease-in-out infinite;
  }
`;

// --- 1. TRANSLATION DICTIONARY ---
const translations = {
  EN: {
    heroTitle1: "Defend",
    heroTitle2: "Your",
    heroTitle3: "Workforce.",
    heroSub: "High-fidelity protective armor, visibility gear, and high-tier utility instruments tailored for engineers and complex industrial operations.",
    enterMarketplace: "Enter Marketplace",
    contactSupport: "Contact Support",

    securePayment: "Secure Payment",
    encryptedTx: "Encrypted Transactions",
    freeShipping: "Free Shipping",
    onQualified: "On Qualified Orders",
    dedicatedSupport: "Dedicated Support",
    directEngineer: "Direct Engineer Consultation",
    service247: "24/7 Service",
    alwaysOperational: "Always Operational",

    shopByCategory: "Shop By Category",
    structuralSorting: "Structural Sorting",
    exploreCategory: "Explore Category",
    catHeadwear: "Headwear",
    catWorkwear: "Workwear",
    catFootwear: "Footwear",

    bestSellers: "Best Sellers",
    topMoving: "Top Moving Assets",
    viewAll: "View All",
    newArrivals: "New Arrivals",
    freshInfra: "Fresh Infrastructure",
    viewLatest: "View Latest",
    suggestedForYou: "Suggested For You",
    algorithm: "Rating & Likes Algorithm",
    configure: "Configure",
    topRanked: "Top-Ranked Safety Asset",
    items: "Items",
    units: "Units",
    inStock: "In Stock",
    assetValue: "Asset Value",
    topValue: "Top Value",
    spec2026: "2026 Spec",

    announcementTag: "System Announcement",
    announcementTitle: "Nationwide Logistics Sync & Enterprise Bulk Program",
    announcementDesc: "We now offer free nationwide delivery on all certified protective gear orders. Enterprise partners and safety officers can unlock bulk pricing tiers up to 25% off directly at checkout.",

    system: "System",
    marketplace: "Marketplace",
    contactHub: "Contact Hub",
    address: "Addis Ababa",
    rights: "© 2026 Luu Safety Systems • Efoy Engine"
  },
  OM: {
    heroTitle1: "Eegi",
    heroTitle2: "Humna",
    heroTitle3: "Hojii Kee.",
    heroSub: "Uffata nageenyaa, meeshaalee mul'ata sassaabaniifi instrumantiwwan injinerotaafi hojiiwwan indastrii xaxamaaf qophaa'an.",
    enterMarketplace: "Gabaatti Seeni",
    contactSupport: "Gargaarsa Quunnami",

    securePayment: "Kaffaltii Eeggamaa",
    encryptedTx: "Daddabarsa Dhokataa",
    freeShipping: "Ergaa Bilisaa",
    onQualified: "Ajaja Ulaagaa Guuterratti",
    dedicatedSupport: "Deeggirsa Injinariingii",
    directEngineer: "Marii Injineraa Battalaa",
    service247: "Tajaajila 24/7",
    alwaysOperational: "Yeroo Hunda Hoojjataa",

    shopByCategory: "Gosaan Bitadhu",
    structuralSorting: "Gurraandhina Caasaa",
    exploreCategory: "Gosa Caffee Ilaali",
    catHeadwear: "Eegumsa Mataa",
    catWorkwear: "Uffata Hojii",
    catFootwear: "Kophee Hojii",

    bestSellers: "Gurguramaa Hunda Caalu",
    topMoving: "Qabeenya Socho'aa Raawwataa",
    viewAll: "Hunda Ilaali",
    newArrivals: "Wanta Haaraa Dhufan",
    freshInfra: "Caasaa Haaraa",
    viewLatest: "Iskoorii Haaraa Ilaali",
    suggestedForYou: "Siif Kan Yaadame",
    algorithm: "Algoorizimii Sadarkaa & Jaallannoo",
    configure: "Qindeessi",
    topRanked: "Qabeenya Nageenyaa Olaanaa",
    items: "Meeshaalee",
    units: "Yuunitii",
    inStock: "Gulaalaa Keessa Jiruu",
    assetValue: "Gatii Qabeenyaa",
    topValue: "Gatii Olaanaa",
    spec2026: "Ispeesii 2026",

    announcementTag: "Beeksisa Sirnaa",
    announcementTitle: "Sinkingi Logistiksii Biyyaalessaa & Sagantaa Guddaa",
    announcementDesc: "Oomashaalee nageenyaa eeggaman hundaaf ergaa biyyaalessaa bilisaa dhiheessina. Tumsitootni enterprise gatii hanga 25% gadi kufiinsa argachuu danda'u.",

    system: "Sirna",
    marketplace: "Gabaa",
    contactHub: "Wiirtuu Quunnamtii",
    address: "Finfinnee",
    rights: "© 2026 Sirna Nageenyaa Luu • Injiinii Efoy"
  },
  AM: {
    heroTitle1: "ጠብቅ",
    heroTitle2: "የስራ",
    heroTitle3: "ኃይልህን።",
    heroSub: "ለኢንጂነሮች እና ለከባድ የኢንዱስትሪ ስራዎች የተሰሩ አስተማማኝ የደህንነት መጠበቂያ አልባሳት እና መሳሪያዎች።",
    enterMarketplace: "ወደ ገበያ ግባ",
    contactSupport: "እርዳታ ለማግኘት ግንኙነት ያድርጉ",

    securePayment: "የተጠበቀ ክፍያ",
    encryptedTx: "የተመሰጠረ የክፍያ ሂደት",
    freeShipping: "ነፃ ማጓጓዣ",
    onQualified: "ብቁ ለሆኑ ትዕዛዞች",
    dedicatedSupport: "የኢንጂነሪንግ ድጋፍ",
    directEngineer: "ቀጥታ የባለሙያ አማካሪ",
    service247: "የ24/7 አገልግሎት",
    alwaysOperational: "ሁልጊዜ ዝግጁ",

    shopByCategory: "በምድብ ይግዙ",
    structuralSorting: "በምድብ የመለየት ሂደት",
    exploreCategory: "ምድቡን ይመልከቱ",
    catHeadwear: "የራስ ደህንነት",
    catWorkwear: "የስራ አልባሳት",
    catFootwear: "የስራ ጫማዎች",

    bestSellers: "በብዛት የተሸጡ",
    topMoving: "ከፍተኛ ተፈላጊነት ያላቸው",
    viewAll: "ሁሉንም ይመልከቱ",
    newArrivals: "አዲስ የገቡ",
    freshInfra: "አዲስ አቅርቦቶች",
    viewLatest: "አዲሶቹን ይመልከቱ",
    suggestedForYou: "ለእርስዎ የተመረጡ",
    algorithm: "የደረጃ እና የመውደዶች ስልተ ቀመር",
    configure: "አዘጋጅ",
    topRanked: "ከፍተኛ የደህንነት እቃ",
    items: "እቃዎች",
    units: "ክፍሎች",
    inStock: "በክምችት ላይ ያለ",
    assetValue: "የእቃው ዋጋ",
    topValue: "ከፍተኛ ዋጋ",
    spec2026: "የ2026 መግለጫ",

    announcementTag: "የስርዓት ማስታወቂያ",
    announcementTitle: "ሀገር አቀፍ የሎጂስቲክስ ስርጭት እና የጅምላ ቅናሽ ፕሮግራም",
    announcementDesc: "ለተረጋገጡ የደህንነት መጠበቂያ እቃዎች በሙሉ ነፃ ሀገር አቀፍ ማጓጓዣ እናቀርባለን። የጅምላ ገዢዎች እስከ 25% ቅናሽ ማግኘት ይችላሉ።",

    system: "ስርዓት",
    marketplace: "ገበያ",
    contactHub: "የግንኙነት ማዕከል",
    address: "አዲስ አበባ",
    rights: "© 2026 የሉ ደህንነት ስርዓት • ኤፎይ ኢንጂን"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('EN');
  const t = translations[lang] || translations.EN;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

// --- 2. REUSABLE PRODUCT CARD COMPONENT (WITH ICONS BELOW IMAGE) ---
const ProductCard = ({ p, ribbon, onAddToCart }) => {
  const { t } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);

  const imageUrl = p.image || 'https://via.placeholder.com/500';
  const productId = p._id || p.id;
  const productName = p.product_name || p.name;
  const productPrice = p.price ? Number(p.price) : 0;
  const productStock = p.countInStock !== undefined ? p.countInStock : p.stock;

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-200/80 hover:border-purple-300 shadow-sm hover:shadow-md transition-all duration-300 group relative flex flex-col justify-between">
      {/* Product Image Box */}
      <div className="relative h-48 bg-slate-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center border border-slate-100">
        <img 
          src={imageUrl} 
          alt={productName} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          loading="lazy"
        />
        
        {ribbon && (
          <span className="absolute top-3 left-3 bg-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm z-10">
            {ribbon}
          </span>
        )}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-700 border border-slate-100 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase z-10">
          {productStock !== undefined ? `${productStock} ${t.units}` : t.inStock}
        </span>
      </div>

      {/* Details & Actions Under Image */}
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={`${i < Math.round(p.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
            ))}
          </div>
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide line-clamp-2 mb-0.5 min-h-[2rem]">{productName}</h4>
        </div>

        {/* Bottom Bar with Price on Left & Icons (Heart, View, Cart) Under Image */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">{t.assetValue}</span>
            <p className="text-slate-900 font-black text-base">${productPrice.toFixed(2)}</p>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Like Icon Button */}
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 bg-slate-50 hover:bg-purple-50 border border-slate-200/80 hover:border-purple-200 rounded-xl text-slate-500 hover:text-purple-600 transition-colors"
              title="Like product"
            >
              <Heart size={15} className={isLiked ? "fill-purple-600 text-purple-600" : ""} />
            </button>

            {/* View Details Icon Button */}
            <Link 
              to={`/product/${productId}`} 
              className="p-2 bg-slate-50 hover:bg-purple-50 border border-slate-200/80 hover:border-purple-200 rounded-xl text-slate-500 hover:text-purple-600 transition-colors"
              title="View details"
            >
              <Eye size={15} />
            </Link>

            {/* Add to Cart Button */}
            <button 
              onClick={() => onAddToCart(p)}
              className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-xl transition-all shadow-md shadow-purple-600/10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 ml-0.5"
              title="Add to cart"
            >
              <ShoppingCart size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN HOMESCREEN CONTENT ---
const HomeScreenContent = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        if (Array.isArray(data)) {
          setApiProducts(data);
        }
      } catch (error) {
        console.error('Error fetching live backend products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { id: 'Head Protection', name: t.catHeadwear, count: 14, image: 'https://images.unsplash.com/photo-1590483736622-39da8caf3ef8?auto=format&fit=crop&q=80&w=200' },
    { id: 'High-Visibility', name: t.catWorkwear, count: 28, image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=200' },
    { id: 'Safety Shoes', name: t.catFootwear, count: 19, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=200' },
  ];

  const staticProducts = [
    { id: '1', name: 'Vanguard Industrial Hard Hat', price: 25.00, rating: 5.0, likes: 320, sold: 1240, stock: 18, image: 'https://images.unsplash.com/photo-1590483736622-39da8caf3ef8?auto=format&fit=crop&q=80&w=500' },
    { id: '2', name: 'Aegis High-Vis Safety Vest', price: 12.99, rating: 4.9, likes: 290, sold: 890, stock: 46, image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=500' },
    { id: '3', name: 'Titan Steel Toe Work Boots', price: 85.00, rating: 4.8, likes: 210, sold: 745, stock: 12, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=500' },
    { id: '4', name: 'Anti-Fog Ballistic Goggles', price: 15.00, rating: 4.7, likes: 180, sold: 610, stock: 51, image: 'https://images.unsplash.com/photo-1551150431-993b1139ecc5?auto=format&fit=crop&q=80&w=500' },
    { id: '5', name: 'Mantis Thermal Shield Gloves', price: 19.50, rating: 5.0, likes: 450, sold: 34, stock: 8, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=500' }, 
    { id: '6', name: 'Pro Arc Welding Face Shield', price: 42.00, rating: 4.9, likes: 380, sold: 12, stock: 15, image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=500' },
  ];

  const productsSource = apiProducts.length > 0 ? apiProducts : staticProducts;
  const bestSellers = productsSource.slice(0, 4);
  const newArrivals = productsSource.length > 4 ? productsSource.slice(4, 8) : productsSource.slice(0, 4);

  const suggestedForYou = [...productsSource]
    .sort((a, b) => (((b.rating || 4.5) * 10) + (b.likes || b.sold || 0)) - (((a.rating || 4.5) * 10) + (a.likes || a.sold || 0)))
    .slice(0, 2);

  return (
    <div className="bg-slate-100 min-h-screen font-sans antialiased text-slate-600 relative overflow-x-hidden">
      <style>{animationStyles}</style>

      {/* Hero Header */}
      <section className="relative min-h-[85vh] flex items-center pt-16 overflow-hidden bg-slate-900">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={headerVideo} type="video/webm" />
        </video>

        <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10 py-16">
          <div className="max-w-xl space-y-6 animate-float-slow transition-all duration-700 ease-out">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-none drop-shadow-lg transition-transform duration-500 ease-in-out hover:translate-y-[-4px]">
              {t.heroTitle1} <br /> {t.heroTitle2} <span className="text-purple-400 italic inline-block transition-transform duration-300 hover:scale-105">{t.heroTitle3}</span>
            </h1>
            <p className="text-white text-sm sm:text-base font-semibold leading-relaxed max-w-lg drop-shadow transition-opacity duration-500 hover:opacity-100">
              {t.heroSub}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link 
                to="/shop" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-7 py-4 rounded-xl font-bold uppercase text-[10px] tracking-wider inline-flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-xl"
              >
                {t.enterMarketplace} <ArrowRight size={14} />
              </Link>
              <button 
                onClick={() => navigate('/contact')} 
                className="bg-white/20 hover:bg-white/30 border border-white/40 text-white px-7 py-4 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm shadow-md"
              >
                {t.contactSupport}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-slate-200/80 bg-white py-6 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><Lock size={20} /></div>
            <div>
              <p className="text-xs font-extrabold text-slate-800 uppercase">{t.securePayment}</p>
              <p className="text-[10px] font-semibold text-slate-400">{t.encryptedTx}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><Truck size={20} /></div>
            <div>
              <p className="text-xs font-extrabold text-slate-800 uppercase">{t.freeShipping}</p>
              <p className="text-[10px] font-semibold text-slate-400">{t.onQualified}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><Headset size={20} /></div>
            <div>
              <p className="text-xs font-extrabold text-slate-800 uppercase">{t.dedicatedSupport}</p>
              <p className="text-[10px] font-semibold text-slate-400">{t.directEngineer}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><Headphones size={20} /></div>
            <div>
              <p className="text-xs font-extrabold text-slate-800 uppercase">{t.service247}</p>
              <p className="text-[10px] font-semibold text-slate-400">{t.alwaysOperational}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1200px] mx-auto px-6 pt-16">
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-purple-600 mb-1">
            <Grid size={12} />
            <span className="text-[9px] font-bold uppercase tracking-[2px]">{t.structuralSorting}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{t.shopByCategory}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link to={`/shop?category=${encodeURIComponent(cat.id)}`} key={cat.id} className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-purple-300 transition-all flex flex-col justify-between h-48 shadow-sm">
              <div className="flex items-start justify-between w-full">
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-800">{cat.name}</h3>
                  <span className="text-[10px] text-slate-400 font-medium">{cat.count} {t.items}</span>
                </div>
                <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded-xl object-cover" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-purple-600 pt-4 border-t border-slate-100">
                {t.exploreCategory} <ArrowRight size={10} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-6 py-16 space-y-16">
        {/* Best Sellers */}
        <section>
          <div className="flex items-end justify-between mb-6 border-b border-slate-200/80 pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-purple-600 mb-1">
                <TrendingUp size={12} />
                <span className="text-[9px] font-bold uppercase tracking-[2px]">{t.topMoving}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{t.bestSellers}</h2>
            </div>
            <Link to="/shop" className="text-[10px] font-bold uppercase text-purple-600 flex items-center gap-1">
              {t.viewAll} <ArrowRight size={10} />
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-purple-600" size={24} /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bestSellers.map(p => <ProductCard key={p._id || p.id} p={p} ribbon={t.topValue} onAddToCart={() => {}} />)}
            </div>
          )}
        </section>

        {/* Announcement Section */}
        <section className="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-900 border border-purple-800/40 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-lg text-white">
          <div className="space-y-2 lg:max-w-2xl">
            <span className="text-purple-300 text-[9px] font-bold bg-purple-900/60 border border-purple-700/50 px-2.5 py-1 rounded-md uppercase tracking-wider">
              {t.announcementTag}
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">{t.announcementTitle}</h2>
            <p className="text-purple-200/90 text-xs leading-relaxed font-medium">{t.announcementDesc}</p>
          </div>
          <div className="w-full lg:w-48 h-24 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-1 shrink-0">
            <Shield size={32} className="text-purple-300" />
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-purple-200">ISO Certified</span>
          </div>
        </section>

        {/* New Arrivals */}
        <section>
          <div className="flex items-end justify-between mb-6 border-b border-slate-200/80 pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-purple-600 mb-1">
                <Clock size={12} />
                <span className="text-[9px] font-bold uppercase tracking-[2px]">{t.freshInfra}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{t.newArrivals}</h2>
            </div>
            <Link to="/shop" className="text-[10px] font-bold uppercase text-purple-600 flex items-center gap-1">
              {t.viewLatest} <ArrowRight size={10} />
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-purple-600" size={24} /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {newArrivals.map(p => <ProductCard key={p._id || p.id} p={p} ribbon={t.spec2026} onAddToCart={() => {}} />)}
            </div>
          )}
        </section>

        {/* Suggested For You */}
        <section className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="mb-6 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-purple-600 mb-1">
              <UserCheck size={12} />
              <span className="text-[9px] font-bold uppercase tracking-[2px]">{t.algorithm}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{t.suggestedForYou}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestedForYou.map((item) => (
              <div key={item._id || item.id} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
                <div className="w-24 h-24 bg-white rounded-xl overflow-hidden flex items-center justify-center shrink-0 relative">
                  <img src={item.image || 'https://via.placeholder.com/500'} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-3 text-left w-full">
                  <div>
                    <h3 className="text-slate-800 font-bold text-xs uppercase">{item.product_name || item.name}</h3>
                    <p className="text-slate-400 text-[9px] uppercase font-bold mt-0.5">{t.topRanked}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                    <p className="text-slate-950 font-black text-base">${Number(item.price || 0).toFixed(2)}</p>
                    <Link to={`/product/${item._id || item.id}`} className="text-purple-600 text-[10px] font-bold uppercase flex items-center gap-0.5">
                      {t.configure} <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-white border-t border-slate-200/80">
        <div className="max-w-[1200px] mx-auto py-8 px-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs border-b border-slate-200/60 pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-purple-600 p-1.5 rounded-lg text-white"><Shield size={14} /></div>
                <h2 className="font-black italic uppercase text-slate-900">LUU<span className="text-purple-600">SAFETY</span></h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:col-span-2">
              <div>
                <h4 className="font-bold uppercase text-[10px] text-purple-600 mb-3">{t.system}</h4>
                <ul className="space-y-1.5 text-[10px] font-semibold uppercase text-slate-500">
                  <li><Link to="/shop" className="hover:text-purple-600">{t.marketplace}</Link></li>
                  <li><Link to="/contact" className="hover:text-purple-600">{t.contactHub}</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase text-[10px] text-purple-600 mb-3">Location</h4>
                <p className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 uppercase"><MapPin size={10} /> {t.address}</p>
              </div>
            </div>
          </div>
          <div className="pt-6 text-center">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function HomeScreen() {
  return (
    <LanguageProvider>
      <HomeScreenContent />
    </LanguageProvider>
  );
}