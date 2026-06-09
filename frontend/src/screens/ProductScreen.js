import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  ArrowLeft, 
  ShoppingCart, 
  CheckCircle, 
  Star, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';

import Navbar from '../components/Navbar';

const ProductScreen = () => {
  // Mock data for a single product view
  const product = {
    id: 1,
    name: "Vanguard Helmet X",
    price: "$89.99",
    rating: 5,
    description: "Industrial-grade safety helmet designed for ultimate protection, comfort, and durability in modern high-risk work environments.",
    features: [
      "High-density impact resistant shell",
      "Adjustable 6-point suspension system",
      "Integrated clear face shield mount",
      "Universal accessory slots for earmuffs"
    ]
  };

  return (
    <div className="bg-[#05050a] text-white min-h-screen overflow-hidden relative">
      {/* Background Grid & Blurs */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />

      <Navbar />

      <main className="relative z-10 max-w-[1400px] mx-auto px-8 pt-32 pb-24">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors uppercase text-xs tracking-widest font-bold">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Product Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/50 border border-white/10 backdrop-blur-2xl rounded-[3rem] p-12 flex justify-center relative group"
          >
            <div className="absolute top-6 right-6 bg-purple-600/10 border border-purple-500/30 text-purple-400 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-black uppercase tracking-wider">
              <ShieldCheck size={14} /> Certified
            </div>

            <img 
              src="https://images.unsplash.com/photo-1584285418504-0051b6d51f6e" 
              alt={product.name} 
              className="w-full max-w-[400px] h-[400px] object-contain transform group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex gap-1">
                {[...Array(product.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-purple-500 text-purple-500" />
                ))}
              </div>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
                {product.name}
              </h1>
              <p className="text-3xl font-black text-purple-400">{product.price}</p>
            </div>

            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              {product.description}
            </p>

            {/* Key specs */}
            <div className="border-t border-b border-white/5 py-6 space-y-3">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-purple-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-5 rounded-2xl uppercase text-sm font-black tracking-[2px] flex items-center gap-3 hover:scale-105 transition-all shadow-[0_10px_30px_rgba(147,51,234,0.3)]">
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>

            {/* Trust badge */}
            <div className="pt-4 flex items-center gap-6 text-xs uppercase tracking-widest text-slate-500 font-bold">
              <span className="flex items-center gap-2"><Truck size={16} className="text-purple-500" /> Free Shipping</span>
              <span className="flex items-center gap-2"><Shield size={16} className="text-purple-500" /> 1-Year Warranty</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="text-purple-500" size={18} />
          <h2 className="font-black uppercase text-xl tracking-tight">Luu Safety</h2>
        </div>
        <p className="text-slate-600 uppercase text-[10px] tracking-[4px]">
          © 2026 Industrial Protection Systems
        </p>
      </footer>
    </div>
  );
};

// CRITICAL: This default export prevents the "is not a function" bundle crash!
export default ProductScreen;