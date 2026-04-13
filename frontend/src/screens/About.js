import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, Globe, Layers } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Cpu className="text-blue-500" size={28} />,
      title: "Core Architecture",
      desc: "Powered by Next.js and MongoDB for real-time synchronization across the luxury resort network."
    },
    {
      icon: <ShieldCheck className="text-blue-500" size={28} />,
      title: "Secure Terminal",
      desc: "Enterprise-grade authentication and data protection using Supabase and JWT protocols."
    },
    {
      icon: <Zap className="text-blue-500" size={28} />,
      title: "High Fidelity",
      desc: "A sleek, responsive interface designed for the modern administrator with 99.9% uptime."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 overflow-hidden">
      
      {/* BACKGROUND DECOR */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-6xl mx-auto px-6 py-20">
        
        {/* HERO SECTION */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block"
          >
            The AuraSync Initiative
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-8"
          >
            Luxury Management <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Reimagined.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-500 font-medium text-lg leading-relaxed"
          >
            AuraSync is the premium administrative core of the QuickBuy ecosystem. 
            Born from high-level research at **ASTU**, we specialize in bridging 
            luxury inventory with high-speed web environments.
          </motion.p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="bg-white/40 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:bg-white/60 transition-all group"
            >
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg mb-3">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* VISION BANNER */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight uppercase">
                Bridging Tech <br /> & <span className="text-blue-400">Experience</span>
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed">
                Our mission is to provide resort administrators with a tool that feels 
                as premium as the services they provide. Every line of code in AuraSync 
                is optimized for the QuickBuy global cluster, ensuring your guests 
                receive instant updates and verified security.
              </p>
            </div>
            <div className="flex gap-10">
              <div className="text-center">
                <p className="text-blue-400 font-black text-4xl">ASTU</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Origin</p>
              </div>
              <div className="text-center border-l border-slate-800 pl-10">
                <p className="text-blue-400 font-black text-4xl">v2.0</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Terminal</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FOOTER NOD */}
        <div className="text-center mt-24">
          <Globe className="mx-auto text-slate-200 mb-4" size={32} />
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">
            AuraSync Protocol © 2026 | Part of QuickBuy Ecosystem
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;