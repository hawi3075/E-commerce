import React from 'react';
import { ArrowRight, ShoppingCart, Heart, ShieldCheck, Zap } from 'lucide-react';

const HomeScreen = () => {
  const categories = [
    { id: 1, name: 'Head & Face Protection', sub: 'Safety Helmets', img: 'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg', color: 'bg-zinc-900', textColor: 'text-white' },
    { id: 2, name: 'High-Visibility Apparel', sub: 'Reflective Gear', img: 'https://images.pexels.com/photos/8961555/pexels-photo-8961555.jpeg', color: 'bg-white', textColor: 'text-slate-900', border: 'border border-slate-100' },
    { id: 3, name: 'Hand & Arm Protection', sub: 'Industrial Gloves', img: 'https://images.pexels.com/photos/5582869/pexels-photo-5582869.jpeg', color: 'bg-white', textColor: 'text-slate-900', border: 'border border-slate-100' },
    { id: 4, name: 'Work Boots & Footwear', sub: 'Steel Toe', img: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg', color: 'bg-yellow-400', textColor: 'text-slate-900' },
  ];

  const products = [
    { id: 1, name: 'Industrial Heavy Duty Safety Helmet', price: 45.00, img: 'https://images.pexels.com/photos/6474487/pexels-photo-6474487.jpeg', tag: 'Top Rated' },
    { id: 2, name: 'Class 3 High-Visibility Reflective Vest', price: 25.50, img: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg', tag: 'Essential' },
    { id: 3, name: 'Cut-Resistant Nitrile Coated Gloves', price: 12.99, img: 'https://images.pexels.com/photos/5582869/pexels-photo-5582869.jpeg', tag: 'Best Seller' },
    { id: 4, name: 'Waterproof Steel Toe Construction Boots', price: 129.00, img: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg', tag: 'New Arrival' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 pt-8 space-y-20 pb-20">
      
      {/* --- HERO BANNER (Drs Safety Cloth Theme) --- */}
      <div className="bg-[#f3f4f6] rounded-[40px] p-8 md:p-20 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
        <div className="flex-1 space-y-8 z-10">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm tracking-widest uppercase">
            <ShieldCheck size={20} /> Professional PPE Provider
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] text-slate-900 tracking-tight">
            Premium <span className="text-blue-600">Safety Gear</span> for Every Professional!
          </h1>
          <p className="text-slate-500 text-lg max-w-sm font-medium">
            Certified industrial clothing and equipment. Safety first, style always.
          </p>
          
          <div className="flex gap-4">
             <div className="bg-yellow-400 p-6 rounded-3xl w-44 h-52 relative shadow-xl shadow-yellow-100 group cursor-pointer hover:-translate-y-1 transition-transform">
               <p className="font-extrabold text-blue-900 leading-tight text-xl">Site Safety <br/> Bundle</p>
               <button className="absolute bottom-5 left-5 bg-blue-600 text-[10px] font-bold text-white px-4 py-1.5 rounded-full uppercase tracking-wider">Order Now</button>
             </div>
             <div className="bg-white p-6 rounded-3xl w-44 h-52 relative border border-slate-100 shadow-xl shadow-slate-100 group cursor-pointer hover:-translate-y-1 transition-transform">
               <p className="font-bold text-slate-300 text-[10px] uppercase mb-1">BULK OFFER</p>
               <p className="font-extrabold text-blue-600 leading-tight text-xl">15% OFF for Companies</p>
               <button className="absolute bottom-5 left-5 bg-blue-400 text-[10px] font-bold text-white px-4 py-1.5 rounded-full uppercase tracking-wider">Get Quote</button>
             </div>
          </div>
        </div>
        
        <div className="flex-1 relative h-[550px] w-full hidden md:block">
           <img 
             src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg" 
             alt="Safety Specialist" 
             className="h-full w-full object-cover rounded-[40px] shadow-2xl"
           />
           <div className="absolute bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-50">
              <div className="bg-green-100 p-2 rounded-full text-green-600"><Zap size={24}/></div>
              <div>
                <p className="text-xs text-slate-400 font-bold">Fast Delivery</p>
                <p className="text-sm font-black text-slate-800">24h Express Shipping</p>
              </div>
           </div>
        </div>
      </div>

      {/* --- TRENDING CATEGORIES --- */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Browse Safety Categories</h2>
          <button className="text-blue-500 font-bold text-sm flex items-center gap-2 hover:underline">
            View all categories <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className={`${cat.color} ${cat.textColor} ${cat.border || ''} rounded-[32px] p-8 h-80 flex flex-col justify-between relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all`}>
              <div className="z-10">
                {cat.sub && <span className="bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-2 inline-block">{cat.sub}</span>}
                <h3 className="text-xl font-extrabold leading-tight max-w-[160px]">{cat.name}</h3>
              </div>
              <img src={cat.img} alt={cat.name} className="absolute -bottom-4 -right-4 w-3/4 h-3/5 object-cover rounded-tl-[40px] group-hover:scale-110 transition-transform" />
              <button className="z-10 w-fit mt-4 bg-blue-600 text-white p-2 rounded-full flex items-center gap-2 text-[10px] font-bold px-4 hover:bg-blue-700">
                View Products <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- BEST SELLERS --- */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Industrial Best Sellers</h2>
          <button className="text-blue-500 font-bold text-sm flex items-center gap-2 hover:underline">
            See all products <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((prod) => (
            <div key={prod.id} className="group cursor-pointer space-y-4">
              <div className="bg-slate-50 rounded-[32px] p-6 relative aspect-square overflow-hidden border border-transparent hover:border-blue-100 transition-colors">
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full z-10">{prod.tag}</span>
                <div className="absolute top-4 right-4 space-y-2 translate-x-12 group-hover:translate-x-0 transition-transform z-10">
                  <button className="bg-white p-2 rounded-full shadow-md block hover:text-red-500 transition-colors"><Heart size={16}/></button>
                  <button className="bg-white p-2 rounded-full shadow-md block hover:text-blue-500 transition-colors"><ShoppingCart size={16}/></button>
                </div>
                <img src={prod.img} alt={prod.name} className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="px-2">
                <p className="text-blue-600 font-black text-xl">${prod.price.toFixed(2)}</p>
                <h4 className="text-slate-600 text-sm font-bold group-hover:text-blue-600 transition-colors">{prod.name}</h4>
                <button className="w-full mt-4 bg-slate-900 text-white font-bold py-3 rounded-2xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomeScreen;