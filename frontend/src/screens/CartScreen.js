const CartScreen = () => {
  const cartItems = [
    { id: 1, name: 'Sentinel-X Impact Helmet', price: 89.00, qty: 1, img: '/helmet.jpg' },
    { id: 2, name: 'Titan-Vision Goggles', price: 110.00, qty: 2, img: '/goggles.jpg' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-black uppercase mb-8">Shopping <br/> Cart</h1>
      
      <div className="space-y-8">
        {cartItems.map(item => (
          <div key={item.id} className="flex gap-4 items-center">
            <img src={item.img} className="w-24 h-24 bg-gray-200 rounded-2xl object-cover" alt="" />
            <div className="flex-1">
              <h3 className="font-bold text-sm uppercase">{item.name}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">ANSI Z89.1 Compliant</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center bg-gray-100 rounded-lg px-2">
                  <button className="p-1 font-bold">-</button>
                  <span className="px-3 font-bold text-xs">0{item.qty}</span>
                  <button className="p-1 font-bold">+</button>
                </div>
                <span className="font-black text-lg ml-auto">${item.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-12 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
        <h2 className="font-black uppercase mb-6">Order Summary</h2>
        <div className="space-y-3 text-sm border-b pb-6 border-gray-100">
          <div className="flex justify-between">
            <span className="text-gray-400 font-bold">Subtotal</span>
            <span className="font-black">$244.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-bold">Shipping</span>
            <span className="text-[10px] font-black uppercase text-yellow-600">Calculated at Checkout</span>
          </div>
        </div>
        <div className="flex justify-between items-center py-8">
          <span className="font-black uppercase text-xl">Total</span>
          <span className="font-black text-3xl">$263.52</span>
        </div>
        <button className="w-full bg-sentinel-yellow py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-3 shadow-lg shadow-yellow-200">
          Proceed to Checkout 
          <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
};
export default CartScreen;