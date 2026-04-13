import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Branding Section */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-black text-slate-900 tracking-tighter mb-4">
            LUU<span className="text-blue-600">SAFETY</span>
          </h1>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Info Card - Glassmorphism Style using only Tailwind */}
        <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-12 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            
            <div className="flex-1">
              <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
                The AuraSync Protocol
              </span>
              <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase">
                Premium Safety <br/> Engineering
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8 font-medium">
                Developed as part of the QuickBuy ecosystem, LUU SAFETY provides high-fidelity 
                protection gear. Our platform was built by developers from <strong>ASTU</strong> 
                to ensure real-time synchronization between our global warehouse and your safety needs.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <p className="text-blue-600 font-black text-2xl">100%</p>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Verified Gear</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <p className="text-blue-600 font-black text-2xl">ASTU</p>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Engineered</p>
                </div>
              </div>
            </div>

            {/* Visual Decorative Box */}
            <div className="w-full md:w-80 h-80 bg-slate-900 rounded-[2.5rem] flex items-center justify-center border-8 border-white shadow-xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
               <span className="text-blue-500 font-black text-6xl relative z-10">AS</span>
            </div>

          </div>
        </div>

        {/* Footer Reference */}
        <p className="text-center mt-16 text-slate-300 font-black text-[10px] uppercase tracking-[0.5em]">
          Adama Science & Technology University © 2026
        </p>
      </div>
    </div>
  );
};

export default About;