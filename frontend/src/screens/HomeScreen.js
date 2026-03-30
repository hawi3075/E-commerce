import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownCircle, ShieldCheck, MapPin } from 'lucide-react';

// Animation Variants (The "interesting" movement)
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] } }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const HomeScreen = () => {
  return (
    // font-inter sets the default font to "Inter"
    <div className="font-inter bg-slate-950 text-white min-h-screen overflow-x-hidden relative">
      
      {/* --- STEP 2.1: FULL SCREEN IMAGE BACKGROUND --- */}
      {/* This image covers the entire viewport, including behind the header. */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/8961555/pexels-photo-8961555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Professional industrial welder image
          alt="Full Body Safety Gear in Action" 
          className="w-full h-full object-cover grayscale opacity-30 scale-105"
        />
        {/* A subtle gradient overlay from dark to clear to dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-transparent to-slate-950/70"></div>
      </div>

      {/* --- STEP 2.2: IMMERSIVE HERO CONTENT --- */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 min-h-screen flex flex-col justify-end pb-24 px-6 md:px-16"
      >
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-end">
          
          {/* Main Title Area */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-blue-500/20 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-black tracking-[0.2em] uppercase">
              <ShieldCheck size={16} /> Certified Drs Safety Gear
            </div>
            {/* The font-syncopate class switches the font for an "interesting" look */}
            <h1 className="font-syncopate text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter text-white">
              ENGINEERED TO <br/> <span className="text-blue-500">PROTECT.</span>
            </h1>
            <p className="text-slate-300 text-base max-w-sm font-medium leading-relaxed">
              Minimizing the risk with maximizing performance. DRS provides the full shield of safety clothing for professionals in hazardous environments.
            </p>
          </motion.div>

          {/* Action and Category Area */}
          <motion.div variants={fadeInUp} className="space-y-10 md:text-right">
             <button className="inline-flex items-center gap-2 border border-slate-700 bg-slate-800 text-slate-100 px-10 py-4 rounded-full font-bold hover:bg-slate-700 hover:text-white transition-all">
                Shop Our Full Catalog
                <ArrowDownCircle size={20} className="text-blue-500"/>
             </button>
             
             {/* Dynamic Category List */}
             <div className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end text-xs font-black uppercase tracking-[0.15em] text-slate-400">
               {[
                 { name: "Helmet", href: "/helmet" },
                 { name: "Jacket", href: "/jacket" },
                 { name: "Mask", href: "/mask" },
                 { name: "Gloves", href: "/gloves" },
                 { name: "Boots", href: "/boots" },
                 { name: "Full Cover Cloths", href: "/full-cover-cloths" }
               ].map((item, i) => (
                 <motion.a 
                    whileHover={{ scale: 1.05, y: -2 }}
                    key={i} 
                    href={item.href} 
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                 >
                   <span className="w-1.5 h-1.5 bg-blue-500 rounded-full block"></span> {item.name}
                 </motion.a>
               ))}
             </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- STEP 2.3: SRS FEATURES (The "Jonsson" Trust Bar) --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="relative z-10 bg-slate-900/50 backdrop-blur-sm py-20 px-6 md:px-16"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
           {[
             { title: "FLASH RATED", text: "Electric Arc Protection", img: "https://images.pexels.com/photos/5935754/pexels-photo-5935754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
             { title: "ISO 9001", text: "Global Quality Standards", img: "https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
             { title: "STEEL REINFORCED", text: "Steel Toe Boot Technology", img: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
             { title: "DRS EXPRESS", text: "Global Delivery from Warehouse", img: "https://cdn.pixabay.com/photo/2022/10/24/09/27/cargo-7543003_1280.jpg" }
           ].map((feature, i) => (
             <motion.div key={i} variants={fadeInUp} className="group cursor-pointer">
                <div className="relative h-60 rounded-3xl overflow-hidden mb-5">
                   <img src={feature.img} alt={feature.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"/>
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-500">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.text}</p>
             </motion.div>
           ))}
        </div>
      </motion.section>

    </div>
  );
};

export default HomeScreen;