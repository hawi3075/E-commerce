import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, HardHat, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <ShieldCheck className="text-blue-600" />, title: "Certified Gear", desc: "All our PPE meets international safety standards." },
    { icon: <Zap className="text-blue-600" />, title: "Fast Sync", desc: "Real-time inventory management via the AuraSync protocol." },
    { icon: <Globe className="text-blue-600" />, title: "ASTU Roots", desc: "Proudly developed by engineers from Adama Science & Technology University." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-20 px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6"
          >
            LUU<span className="text-blue-600">SAFETY</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 font-medium max-w-2xl mx-auto"
          >
            Engineering safety for the modern workforce. We provide high-fidelity protection 
            integrated with the AuraSync administrative terminal.
          </motion.p>
        </div>

        {/* MISSION CARD (Glassmorphism) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/60 backdrop-blur-2xl border border-white/20 p-12 rounded-[3rem] shadow-xl shadow-blue-100/50 mb-16 flex flex-col md:flex-row items-center gap-12"
        >
          <div className="flex-1">
            <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">The AuraSync Protocol</h2>
            <p className="text-slate-600 leading-relaxed mb-6 font-medium">
              LUU SAFETY isn't just a store; it's a technical ecosystem. Our platform is 
              built to ensure that civil engineers, construction workers, and resort staff 
              have instant access to the gear they need, with 100% data transparency.
            </p>
            <div className="flex gap-4">
               <div className="bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Innovation</div>
               <div className="bg-slate-900 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Reliability</div>
            </div>
          </div>
          <div className="w-full md:w-1/3 aspect-square bg-blue-50 rounded-[2.5rem] flex items-center justify-center">
            <HardHat size={120} className="text-blue-600 opacity-20" />
          </div>
        </motion.div>

        {/* FEATURE GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 group transition-all hover:border-blue-200"
            >
              <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {stat.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{stat.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* FOOTER NOD */}
        <div className="text-center mt-24">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
            Developed at Adama Science & Technology University © 2026
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;