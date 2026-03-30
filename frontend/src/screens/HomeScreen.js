import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

const HomeScreen = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      
      {/* --- STEP 1: CLEAR, VIVID BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg" 
          alt="Industrial Safety Gear" 
          className="h-full w-full object-cover object-center brightness-110" 
        />
        {/* Subtle darkening overlay only if needed for text readability */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* --- STEP 2: CONTENT OVERLAY --- */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 pt-20">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl space-y-6"
        >
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white drop-shadow-lg">
            UNCOMPROMISED <br /> 
            <span className="text-blue-500">PROTECTION.</span>
          </h1>

          <p className="text-white text-lg md:text-xl max-w-md font-bold drop-shadow-md leading-relaxed">
            Drs Safety Cloth provides the industry standard in high-performance PPE. Built to protect, designed to last.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest px-12 py-5 transition-all flex items-center gap-2 group">
              Shop the Collection <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/40 text-white font-black text-xs uppercase tracking-widest px-12 py-5 hover:bg-white/20 transition-all">
              Technical Catalog
            </button>
          </div>
        </motion.div>
      </div>

      {/* Industrial scroll line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-50">
        <div className="w-[2px] h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
      </div>
    </div>
  );
};

export default HomeScreen;