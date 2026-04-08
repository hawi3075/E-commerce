import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';

const About = () => {
  const features = [
    { 
      icon: <ShieldCheck className="text-blue-500" size={32} />, 
      title: "Premium Security", 
      description: "Integrated with Supabase and NextAuth to ensure enterprise-grade data protection." 
    },
    { 
      icon: <Zap className="text-blue-500" size={32} />, 
      title: "Ultra Fast", 
      description: "Built on the Next.js and MongoDB stack for lightning-quick product synchronization." 
    },
    { 
      icon: <Cpu className="text-blue-500" size={32} />, 
      title: "AuraSync Engine", 
      description: "Proprietary logic designed to bridge the gap between admins and global guests." 
    },
    { 
      icon: <Globe className="text-blue-500" size={32} />, 
      title: "Global Reach", 
      description: "Part of the QuickBuy ecosystem, scaling commerce across borders seamlessly." 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100">
      
      {/* HERO SECTION WITH LAYERED GRADIENT */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[50%] bg-indigo-200/20 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-8 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block"
          >
            Evolution of Commerce
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8"
          >
            AuraSync: The Heart of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">QuickBuy Ecosystem</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-500 font-medium text-lg"
          >
            We are redefining full-stack commerce by merging high-end aesthetics with powerful 
            backend synchronization. AuraSync isn't just a platform; it's a premium experience.
          </motion.p>
        </div>
      </section>

      {/* GLASSMORPHISM FEATURES GRID */}
      <section className="max-w-6xl mx-auto px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/40 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:bg-white/60 transition-all cursor-default"
            >
              <div className="mb-6">{f.icon}</div>
              <h3 className="font-black text-sm uppercase tracking-wider mb-3">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="max-w-5xl mx-auto px-8 pb-32">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight mb-6 uppercase tracking-tighter">
                Designed for the <br /> <span className="text-blue-400">Modern Engineer</span>
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed">
                As a student-led project originating from **ASTU**, AuraSync focuses on 
                the intersection of theoretical computer science and practical web 
                scalability. We believe software should be as beautiful as it is functional.
              </p>
            </div>
            <div className="space-y-6 border-l border-slate-800 pl-8">
              <div>
                <span className="text-blue-500 font-black text-4xl">99.9%</span>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Uptime Sync</p>
              </div>
              <div>
                <span className="text-blue-500 font-black text-4xl">NEXT.JS</span>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Architecture</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;