import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ShoppingCart, Award, CheckCircle, ArrowRight, Truck, Clock } from 'lucide-react';

const HomeScreen = () => {
  const products = [
    { id: 1, name: "Alpha Safety Helmet", price: "$45.00", cat: "Headwear", img: "https://images.pexels.com/photos/6492100/pexels-photo-6492100.jpeg" },
    { id: 2, name: "High-Visibility Jacket", price: "$120.00", cat: "Workwear", img: "https://images.pexels.com/photos/7667442/pexels-photo-7667442.jpeg" },
    { id: 3, name: "Industrial Coverall", price: "$180.00", cat: "Body Protection", img: "https://images.pexels.com/photos/8961555/pexels-photo-8961555.jpeg" },
    { id: 4, name: "Reinforced Steel Boots", price: "$95.00", cat: "Footwear", img: "https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg" }
  ];

  return (
    <div className="bg-white text-gray-800 font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION - Full Display fixed */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg" 
            alt="PPE Equipment" 
            className="w-full h-full object-cover brightness-[0.4]" 
          />
        </div>

        <div className="relative z-10 px-6 md:px-16 max-w-3xl">
          <div className="inline-block bg-blue-600/20 backdrop-blur-md border border-blue-500/30 px-3 py-1 rounded-full mb-6">
            <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Premium Safety Gear</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Protection Engineered <br /> for <span className="text-blue-500">Industry Leaders.</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base mb-10 max-w-lg leading-relaxed">
            Drs Safety Cloth provides durable, certified personal protective equipment. We ensure your team is equipped for the toughest conditions on site.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-10 py-4 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20">
              Browse Inventory
            </button>
            <button className="bg-white/5 border border-white/20 text-white px-10 py-4 rounded-xl text-sm font-bold hover:bg-white/10 transition-all flex items-center gap-2">
              Our Standards <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. TRUST FEATURES SECTION */}
      <section className="py-12 bg-gray-50 px-6 md:px-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-center gap-4">
            <Truck className="text-blue-600" size={30} />
            <div>
              <h4 className="font-bold text-sm uppercase">Quick Delivery</h4>
              <p className="text-xs text-gray-500 font-medium">Fast shipping to your worksite.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-x border-gray-200 px-0 md:px-12">
            <Award className="text-blue-600" size={30} />
            <div>
              <h4 className="font-bold text-sm uppercase">Certified PPE</h4>
              <p className="text-xs text-gray-500 font-medium">Meets ISO global standards.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="text-blue-600" size={30} />
            <div>
              <h4 className="font-bold text-sm uppercase">24/7 Support</h4>
              <p className="text-xs text-gray-500 font-medium">Technical help when you need it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPLANATION SECTION - Side by Side (Safety Focused) */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-blue-600"></div>
          <img 
            src="https://images.pexels.com/photos/3806749/pexels-photo-3806749.jpeg" 
            alt="Safety Clothing" 
            className="rounded-2xl shadow-xl w-full h-[450px] object-cover" 
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.4em]">Our Mission</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Quality Protection <br /> for Every Professional.
          </h3>
          <p className="text-gray-600 text-sm leading-loose font-medium">
            At Drs Safety Cloth, we understand that safety isn't just a requirement—it's a priority. We specialize in safety clothing and accessories that balance maximum protection with the comfort needed for a full day's work.
          </p>
          <div className="space-y-4">
            {["High-Visibiltiy Standards", "Flame & Heat Resistance", "Reinforced Durability"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                <CheckCircle size={18} className="text-blue-600" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRODUCT LIST SECTION - Ready for Sale */}
      <section className="bg-gray-50 py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Ready for Dispatch</h2>
              <p className="text-gray-500 text-xs mt-2 font-bold uppercase tracking-widest">In-Stock Equipment</p>
            </div>
            <Link to="/shop" className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors">See Full Catalog</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <div key={p.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all group">
                <div className="h-64 overflow-hidden relative bg-gray-100">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[8px] font-bold uppercase text-blue-600">
                    {p.cat}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{p.name}</h4>
                  <p className="text-gray-400 text-[10px] font-bold uppercase mb-4 tracking-widest">Professional Grade</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className="text-lg font-bold text-gray-900">{p.price}</span>
                    <button className="bg-gray-900 text-white p-2.5 rounded-lg hover:bg-blue-600 transition-colors">
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Drs<span className="text-blue-600">SafetyCloth</span></h2>
            <p className="text-gray-500 text-xs leading-relaxed font-medium">
              We provide the tools to keep you safe in high-risk environments. Your protection is our primary business.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6 text-gray-400">Navigation</h4>
            <div className="flex flex-col gap-3 text-xs font-bold text-gray-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <Link to="/about" className="hover:text-blue-600">Our Story</Link>
              <Link to="/shop" className="hover:text-blue-600">Shop PPE</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6 text-gray-400">Support</h4>
            <div className="flex flex-col gap-3 text-xs font-bold text-gray-600">
              <span>Shipping Policy</span>
              <span>Bulk Orders</span>
              <span>Contact Us</span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6 text-gray-400">Stay Informed</h4>
            <div className="flex bg-gray-50 rounded-lg p-1 border border-gray-200">
              <input type="text" placeholder="Email Updates" className="bg-transparent border-none text-xs w-full focus:ring-0 px-3" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-[10px] font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-gray-50">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.3em] italic">© 2026 Drs Safety Cloth. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;