```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Star,
  Truck,
  Lock,
  Headphones,
} from 'lucide-react';

import Navbar from '../components/Navbar';

const HomeScreen = () => {
  return (
    <div className="bg-[#05050a] text-white min-h-screen overflow-hidden relative">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-900/10 rounded-full blur-[120px]" />

      <Navbar />

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full">
              <Sparkles size={14} className="text-purple-400" />
              <span className="uppercase text-[10px] tracking-[3px] font-black text-purple-300">
                Premium Safety Equipment
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              Protect <br />
              Every <span className="text-purple-500 italic">Worker.</span>
            </h1>

            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Industrial-grade safety equipment designed for engineers,
              factories, construction teams, and modern industrial operations.
            </p>

            <div className="flex flex-wrap gap-5 pt-4">
              <Link
                to="/shop"
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-5 rounded-2xl uppercase text-sm font-black tracking-[2px] flex items-center gap-3 hover:scale-105 transition-all"
              >
                Explore Products
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/about"
                className="border border-white/10 px-8 py-5 rounded-2xl uppercase text-sm font-black tracking-[2px] hover:border-purple-500 transition-all"
              >
                Learn More
              </Link>
            </div>

            {/* STATS */}
            <div className="flex flex-wrap gap-10 pt-10">
              <div>
                <h3 className="text-3xl font-black">10K+</h3>
                <p className="text-slate-500 uppercase text-xs tracking-[2px]">
                  Products Sold
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black">500+</h3>
                <p className="text-slate-500 uppercase text-xs tracking-[2px]">
                  Companies Served
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black">99%</h3>
                <p className="text-slate-500 uppercase text-xs tracking-[2px]">
                  Satisfaction
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="absolute w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px]" />

            <div className="bg-slate-900/50 border border-white/10 backdrop-blur-2xl rounded-[3rem] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.5)] relative">
              <div className="absolute -top-5 -right-5 bg-purple-600 p-4 rounded-2xl">
                <Shield size={24} />
              </div>

              <img
                src="https://images.unsplash.com/photo-1584285418504-0051b6d51f6e"
                alt="Safety Helmet"
                className="w-[400px] h-[400px] object-contain"
              />

              <div className="pt-8">
                <p className="uppercase text-[10px] tracking-[3px] text-purple-400 font-black">
                  Featured Equipment
                </p>

                <h2 className="text-3xl font-black uppercase pt-2">
                  Vanguard Helmet X
                </h2>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 py-28">
        <div className="max-w-[1400px] mx-auto px-8">

          <div className="text-center mb-20">
            <h2 className="text-5xl font-black uppercase tracking-tighter">
              Why Choose Us
            </h2>

            <p className="text-slate-500 uppercase text-xs tracking-[4px] mt-4">
              Industrial Safety Reinvented
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                icon: <CheckCircle size={26} />,
                title: 'Certified Quality',
                desc: 'All products meet international safety standards.',
              },
              {
                icon: <Truck size={26} />,
                title: 'Fast Delivery',
                desc: 'Nationwide secure and rapid shipping system.',
              },
              {
                icon: <Lock size={26} />,
                title: 'Secure Payments',
                desc: 'Protected checkout and transaction systems.',
              },
              {
                icon: <Headphones size={26} />,
                title: '24/7 Support',
                desc: 'Dedicated industrial support specialists.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-8 backdrop-blur-xl"
              >
                <div className="bg-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>

                <h3 className="text-xl font-black uppercase mb-4">
                  {item.title}
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24">
        <div className="max-w-[1200px] mx-auto px-8">

          <div className="bg-gradient-to-r from-purple-700 to-fuchsia-700 rounded-[3rem] p-16 text-center relative overflow-hidden">

            <div className="absolute inset-0 bg-black/10" />

            <div className="relative z-10">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">
                Ready To Upgrade Safety?
              </h2>

              <p className="text-purple-100 max-w-2xl mx-auto leading-relaxed mb-10">
                Explore high-performance industrial protection equipment
                engineered for modern workplaces.
              </p>

              <Link
                to="/shop"
                className="bg-white text-black px-10 py-5 rounded-2xl uppercase text-sm font-black tracking-[2px] inline-flex items-center gap-3 hover:scale-105 transition-all"
              >
                Start Shopping
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 py-24">
        <div className="max-w-[1200px] mx-auto px-8 text-center">

          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className="fill-purple-500 text-purple-500"
              />
            ))}
          </div>

          <h2 className="text-4xl font-black uppercase tracking-tighter max-w-4xl mx-auto leading-tight">
            “The best industrial safety platform we’ve used for our engineering operations.”
          </h2>

          <p className="text-slate-500 uppercase tracking-[3px] text-xs mt-8">
            Addis Industrial Group
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="text-purple-500" size={18} />

          <h2 className="font-black uppercase text-xl tracking-tight">
            Luu Safety
          </h2>
        </div>

        <p className="text-slate-600 uppercase text-[10px] tracking-[4px]">
          © 2026 Industrial Protection Systems
        </p>
      </footer>
    </div>
  );
};

export default HomeScreen;
```
