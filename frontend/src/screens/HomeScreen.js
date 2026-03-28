import React from 'react';
// Changed Mask to VenetianMask
import { 
  ShieldCheck, 
  Zap, 
  Eye, 
  Trash2, 
  HardHat, 
  Shirt, 
  VenetianMask, 
  PencilRuler, 
  Footprints 
} from 'lucide-react';

const HomeScreen = () => {
  return (
    <div className="pb-24 bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[600px] bg-slate-900 flex items-center px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80" 
            className="w-full h-full object-cover opacity-40" 
            alt="Industrial Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-xl">
          <span className="bg-yellow-400 text-slate-900 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm">
            Professional Grade PPE
          </span>
          <h1 className="text-white text-7xl font-black uppercase mt-6 leading-[0.9] tracking-tighter">
            Safety <br /> <span className="text-white/40 italic">First</span>
          </h1>
          <p className="text-slate-300 mt-6 text-lg font-medium leading-relaxed">
            Use Your PPE. Engineered for the world’s <br /> most demanding environments.
          </p>
          <div className="flex gap-4 mt-10">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-10 py-4 font-black uppercase text-sm transition-all transform hover:scale-105 shadow-xl shadow-yellow-400/20">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* 2. THE SENTINEL PROTOCOL */}
      <div className="px-6 py-16">
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 text-slate-900">The Sentinel <br /> Protocol</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { title: 'Proper Gear', icon: <ShieldCheck className="text-yellow-400" />, desc: 'Wear proper protective gear at all times.' },
            { title: 'Mindful Work', icon: <Zap className="text-yellow-400" />, desc: 'Practice safe and mindful work habits.' },
            { title: 'Stay Alert', icon: <Eye className="text-yellow-400" />, desc: 'Stay alert and aware of your surroundings.' },
            { title: 'Clean Workspace', icon: <Trash2 className="text-yellow-400" />, desc: 'Maintain strict order and sanitation.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-start group hover:bg-slate-900 transition-all duration-300">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-800">
                {item.icon}
              </div>
              <h3 className="font-black uppercase text-xl mb-3 group-hover:text-white">{item.title}</h3>
              <p className="text-slate-500 text-sm group-hover:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. EQUIPMENT ARCHIVE */}
      <div className="bg-white py-20 px-6 text-center">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-1">Equipment Archive</h2>
        <div className="w-16 h-1 bg-yellow-400 mx-auto mb-12"></div>
        
        <div className="flex justify-center items-start overflow-x-auto gap-8 no-scrollbar">
          {[
            { name: 'Helmet', icon: <HardHat size={32} /> },
            { name: 'Jacket', icon: <Shirt size={32} /> },
            { name: 'Mask', icon: <VenetianMask size={32} /> }, // Updated Icon usage here
            { name: 'Gloves', icon: <PencilRuler size={32} /> },
            { name: 'Boots', icon: <Footprints size={32} /> }
          ].map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[80px]">
              <div className="w-20 h-20 rounded-full border border-slate-100 shadow-lg flex items-center justify-center mb-4 hover:border-yellow-400 transition-colors cursor-pointer text-slate-600">
                {cat.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomeScreen;