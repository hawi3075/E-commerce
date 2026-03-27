const AdminScreen = () => {
  return (
    <div className="p-6 pb-24 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-black uppercase mb-6">Command Center</h1>
      <button className="bg-yellow-400 w-full py-4 rounded-xl font-black uppercase flex items-center justify-center gap-2 mb-8">
        <span>+</span> New Product
      </button>

      {/* Revenue Card */}
      <div className="bg-slate-900 p-8 rounded-3xl text-white mb-6 relative overflow-hidden">
        <p className="text-xs uppercase font-bold text-gray-400">Total Revenue</p>
        <h2 className="text-4xl font-black mt-2">$242,901.50</h2>
        <span className="text-yellow-400 text-xs mt-4 block">+12.5% from last quarter</span>
      </div>

      {/* Live Fulfillment */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black uppercase">Live Fulfillment</h3>
          <button className="text-[10px] font-bold uppercase text-yellow-600">View All Logs</button>
        </div>
        <div className="space-y-6">
          {['Apex Construction', 'Industrial Sols.'].map((client, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-4 border-gray-50">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">#ORD-999{i}</p>
                <p className="font-bold">{client}</p>
              </div>
              <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                In Transit
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};