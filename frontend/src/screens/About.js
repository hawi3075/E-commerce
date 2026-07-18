import React from 'react';
import { Shield, Eye, Target } from 'lucide-react';

const AboutScreen = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-16 px-6 font-sans text-slate-700">
      <div className="max-w-[1000px] mx-auto bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm space-y-12">
        
        {/* Header Section */}
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
            LUU<span className="text-purple-600">SAFETY</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 font-medium max-w-2xl leading-relaxed">
            Engineered for ultimate protection, comfort, and durability in high-risk work environments. We provide premier, certified industrial-grade equipment tailored for the modern safety workforce.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-purple-50/50 border border-purple-100/60 rounded-2xl space-y-3">
            <div className="p-3 bg-purple-100/80 rounded-xl w-fit text-purple-700">
              <Shield size={20} />
            </div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">Our Mission</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              To supply cutting-edge personal protective equipment (PPE) that guarantees absolute site protection, ensuring high-density impact resistance and flawless functionality under stress.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
            <div className="p-3 bg-slate-200/80 rounded-xl w-fit text-slate-700">
              <Target size={20} />
            </div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">Our Target</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Delivering high-end certified products with reliable unit valuations, keeping tracking frameworks simple, efficient, and readily available for complex industrial projects.
            </p>
          </div>
        </div>

        {/* Technical Specification Footer Tag */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">System Standard</span>
            <span className="text-slate-800 text-xs font-extrabold uppercase tracking-wider">Premium Industrial-Grade PPE</span>
          </div>
          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wide">
            <Eye size={12} /> Certified Protection
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutScreen;