import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  ShoppingCart,
  Star
} from 'lucide-react';

const HomeScreen = () => {
  const currentYear = new Date().getFullYear();

  // Updated List of Products Ready for Sale
  const products = [
    { id: 1, name: "Vanguard Alpha Helmet", price: "$45.00", category: "Helmet", img: "https://images.pexels.com/photos/6492100/pexels-photo-6492100.jpeg" },
    { id: 2, name: "Titanium Weave Jacket", price: "$120.00", category: "Jacket", img: "https://images.pexels.com/photos/7667442/pexels-photo-7667442.jpeg" },
    { id: 3, name: "Storm-Guard Full Cover", price: "$180.00", category: "Full Cover", img: "https://images.pexels.com/photos/8961555/pexels-photo-8961555.jpeg" },
    { id: 4, name: "Impact-Pro Steel Boots", price: "$95.00", category: "Boots", img: "https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg" },
    { id: 5, name: "Thermal-Grip Gloves", price: "$25.00", category: "Gloves", img: "https://images.pexels.com/photos/5582869/pexels-photo-5582869.jpeg" },
    { id: 6, name: "Respirator X-9 Mask", price: "$35.00", category: "Mask", img: "https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg" },
  ];

  return (
    <div className="bg-white font-sans">
      
      {/* --- SECTION 1: HERO --- */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg" 
            alt="Safety Gear Background" 
            className="h-full w-full object-cover brightness-[0.85]" 
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 pt-48">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl uppercase tracking-tighter">
              ARMOUR FOR <br /> <span className="text-blue-500">INDUSTRY.</span>
            </h1>
            <p className="text-white/90 text-sm max-w-sm font-semibold tracking-wider">
              Premium protective equipment for the world's toughest environments. 
            </p>
            <button className="bg-blue-600 text-white font-black text-[9px] uppercase tracking-widest px-10 py-4 transition-all hover:bg-blue-700 shadow-xl">
              EXPLORE COLLECTION
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: PRODUCT GRID (READY FOR SALE) --- */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12 border-l-4 border-blue-600 pl-6">
            <div>
              <h2 className="text-[10px] font-black text-blue-600 tracking-[0.4em] uppercase">Inventory</h2>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">READY FOR DISPATCH</h3>
            </div>
            <p className="hidden md:block text-slate-500 text-[10px] font-bold uppercase tracking-widest">Showing 6 high-demand items</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -10 }}
                className="group relative bg-slate-50 border border-slate-100 p-4 rounded-sm transition-all hover:shadow-2xl hover:bg-white"
              >
                {/* Product Image */}
                <div className="relative h-72 w-full overflow-hidden mb-6 bg-slate-200">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-[8px] font-black px-3 py-1 uppercase tracking-widest">
                    In Stock
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">{product.category}</p>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{product.name}</h4>
                  </div>
                  <span className="text-sm font-black text-slate-900">{product.price}</span>
                </div>

                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-blue-600 text-blue-600" />)}
                  <span className="text-[8px] font-bold text-slate-400 ml-2">(4.8)</span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 hover:bg-blue-600 transition-colors">
                  <ShoppingCart size={14} /> Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: TECHNICAL MATERIALS --- */}
      <section className="bg-slate-900 py-24 px-6 md:px-16 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
           {[
              { name: "Ripstop Nylon", use: "Jackets & Covers", icon: <Zap /> },
              { name: "Kevlar Weave", use: "Gloves & Armor", icon: <ShieldCheck /> },
              { name: "Heat-Seal PVC", use: "Waterproof Gear", icon: <Globe /> },
              { name: "Steel-Composite", use: "Industrial Boots", icon: <ShieldCheck /> }
            ].map((mat, i) => (
              <div key={i} className="border border-white/10 p-8 hover:bg-blue-600/10 transition-all">
                <div className="text-blue-500 mb-4">{mat.icon}</div>
                <h3 className="text-xs font-black uppercase tracking-widest">{mat.name}</h3>
                <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold">{mat.use}</p>
              </div>
            ))}
        </div>
      </section>

      {/* --- SECTION 4: CONTACT & FOOTER --- */}
      <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid md:grid-cols-4 gap-16 pb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter uppercase">LUU<span className="text-blue-500">SAFETY</span></h2>
            <p className="text-slate-400 text-[10px] leading-relaxed uppercase font-bold tracking-widest">Professional Grade PPE.</p>
            <div className="flex gap-4">
              <Facebook size={18} className="text-slate-500 hover:text-white" />
              <Instagram size={18} className="text-slate-500 hover:text-white" />
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-500">Links</h3>
            <ul className="space-y-3 text-[10px] text-slate-400 font-black uppercase tracking-widest">
              <li className="hover:text-white cursor-pointer">Technical SRS</li>
              <li className="hover:text-white cursor-pointer">Certifications</li>
              <li className="hover:text-white cursor-pointer">Bulk Sales</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-500">Contact</h3>
            <div className="text-[10px] text-slate-400 space-y-4 font-black uppercase tracking-widest">
              <p className="flex items-center gap-2"><Mail size={14} className="text-blue-500"/> SALES@LUUSAFETY.COM</p>
              <p className="flex items-center gap-2"><Phone size={14} className="text-blue-500"/> +1 800-LUU-SAFE</p>
            </div>
          </div>
          <div className="space-y-6">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-500">Update</h3>
             <input type="text" placeholder="EMAIL" className="bg-transparent border border-white/20 w-full p-3 text-[10px] focus:border-blue-500 outline-none" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-16 pt-12 flex justify-between items-center border-t border-white/5">
          <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">© {currentYear} LUU SAFETY. PROPERTY RIGHTS PROTECTED.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;