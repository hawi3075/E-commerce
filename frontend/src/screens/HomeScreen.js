const HomeScreen = () => {
  return (
    <div className="pb-20 bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-slate-900 flex items-center px-8 overflow-hidden">
        <div className="z-10 max-w-md">
          <span className="bg-yellow-400 text-slate-900 px-3 py-1 text-xs font-black uppercase tracking-widest">
            Professional Grade PPE
          </span>
          <h1 className="text-white text-6xl font-black uppercase mt-4 leading-tight">
            Safety <br /> <span className="text-white/80">First</span>
          </h1>
          <p className="text-gray-400 mt-4 text-sm">Use your PPE. Engineered for the world's most demanding environments.</p>
          <div className="flex gap-4 mt-8">
            <button className="bg-yellow-400 px-8 py-3 font-bold uppercase text-sm">Shop Now</button>
            <button className="border border-white/30 text-white px-8 py-3 font-bold uppercase text-sm">View Standards</button>
          </div>
        </div>
        <img src="/hero-bg.jpg" className="absolute right-0 opacity-50 h-full object-cover" alt="Workers" />
      </div>

      {/* Protocol Section */}
      <div className="p-8 grid grid-cols-1 gap-4">
        <h2 className="text-2xl font-black uppercase">The Sentinel Protocol</h2>
        {['Proper Gear', 'Mindful Work', 'Stay Alert'].map((item) => (
          <div key={item} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-slate-900 rounded-lg mb-4"></div>
            <h3 className="font-bold uppercase">{item}</h3>
            <p className="text-gray-500 text-sm mt-2">Efficiency is built on reliability. Ensure safety at all times.</p>
          </div>
        ))}
      </div>
    </div>
  );
};