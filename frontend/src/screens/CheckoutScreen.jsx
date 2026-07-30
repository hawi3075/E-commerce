import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShoppingBag, CreditCard, MapPin, User, Phone, 
  CheckCircle, Mail, Plus, Minus, Palette, Smartphone, DollarSign, ShieldCheck 
} from 'lucide-react';

const CheckoutScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Recover product data from router state OR localStorage fallback
  const [productData, setProductData] = useState(() => {
    return location.state?.product || JSON.parse(localStorage.getItem('checkout_product')) || null;
  });

  const initialQty = location.state?.qty || 1;
  const initialColor = location.state?.color || 'Yellow';

  // Save product to localStorage on mount so refresh doesn't wipe it
  useEffect(() => {
    if (location.state?.product) {
      localStorage.setItem('checkout_product', JSON.stringify(location.state.product));
    }
  }, [location.state]);

  // State management for order options
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [quantity, setQuantity] = useState(initialQty);
  const [paymentMethod, setPaymentMethod] = useState('telebirr');

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Addis Ababa',
    postalCode: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableColors = ['Yellow', 'Red', 'Blue', 'Orange', 'Black'];
  const unitPrice = productData ? Number(productData.price) : 0;
  const subtotal = unitPrice * quantity;
  const shippingCost = 150; // Fixed shipping cost in ETB
  const totalAmount = subtotal + shippingCost;

  const handleQtyChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  // Submit order and handle redirection safely
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (paymentMethod === 'telebirr' || paymentMethod === 'card') {
      try {
        // Sanitize email to guarantee Chapa API accepts it
        const rawEmail = (shippingAddress.email || '').trim().toLowerCase();
        const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(rawEmail);
        const safeEmail = isValidEmail ? rawEmail : 'customer@gmail.com';

        // Updated with the correct payment route endpoint on your Render backend
        const response = await fetch('https://luusafety-backend.onrender.com/api/payment/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: totalAmount,
            phone: shippingAddress.phone || '0911234567',
            fullName: shippingAddress.fullName || 'Customer User',
            email: safeEmail,
            orderId: productData?._id || Date.now(),
          }),
        });

        const data = await response.json();
        console.log('Backend response:', data);

        if (response.ok && data?.checkoutUrl) {
          // Clear cached item and redirect directly to payment gateway
          localStorage.removeItem('checkout_product');
          window.location.href = data.checkoutUrl;
        } else {
          const errorMessage = typeof data?.message === 'object' 
            ? JSON.stringify(data.message) 
            : (data?.message || data?.error || 'Payment initiation failed.');

          console.error('Payment Gateway Error:', errorMessage);
          alert(`Payment Error: ${errorMessage}`);
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error('Payment Connection Error:', error);
        alert('Could not connect to payment backend. Check if your backend server routes are properly configured.');
        setIsSubmitting(false);
      }
    } else {
      // Cash on Delivery / CBE Birr manual flow
      setTimeout(() => {
        setIsSubmitting(false);
        localStorage.removeItem('checkout_product');
        navigate('/orders');
      }, 1200);
    }
  };

  if (!productData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-sans text-slate-800 dark:text-slate-100 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-slate-200 dark:border-slate-800 text-center shadow-sm max-w-xl mx-auto">
          <div className="w-20 h-20 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag size={36} />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">No Product Selected</h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2 mb-6">
            Please select an industrial safety item from the shop marketplace to proceed with procurement.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            Return to Shop Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-sans text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button & Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Secure Checkout
            </h1>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Complete your delivery credentials and choose your preferred deployment payment gateway.
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all text-xs shadow-sm"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Delivery Details & Payment */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Delivery Details Card */}
            <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <MapPin className="text-purple-600 dark:text-purple-400" size={18} /> Delivery Credentials
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abebe Kebede"
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-3.5 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="0911234567"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-3.5 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. abebe@gmail.com"
                        value={shippingAddress.email}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">City</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Postal / ZIP Code</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. 1000"
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Specific Location / Street</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bole Medhanialem, House #104"
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-purple-600 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Options Card */}
            <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <CreditCard className="text-purple-600 dark:text-purple-400" size={18} /> Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'telebirr', name: 'Telebirr Gateway', icon: Smartphone },
                  { id: 'cbe', name: 'CBE Birr Transfer', icon: CreditCard },
                  { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
                  { id: 'cod', name: 'Cash on Delivery', icon: DollarSign },
                ].map((method) => {
                  const Icon = method.icon;
                  const isSelected = paymentMethod === method.id;
                  return (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-300 font-extrabold shadow-sm ring-2 ring-purple-600/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 font-bold bg-slate-50/50 dark:bg-slate-800/30'
                      }`}
                    >
                      <Icon className={isSelected ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'} size={18} />
                      <span className="text-xs uppercase tracking-tight">{method.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-slate-950 font-black text-xs uppercase tracking-widest py-4 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              {isSubmitting ? (
                <span>Initializing Secure Gateway...</span>
              ) : (
                <>
                  <CheckCircle size={18} /> Pay {totalAmount.toFixed(2)} ETB via {paymentMethod === 'telebirr' ? 'Telebirr' : paymentMethod.toUpperCase()}
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-1">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Verified Enterprise Procurement & Checkout</span>
            </div>

          </div>

          {/* Right Side: Order Summary & Item Customization */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <ShoppingBag className="text-purple-600 dark:text-purple-400" size={18} /> Order Summary
              </h2>
            </div>

            {/* Product Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                  <img
                    src={productData.image || '/placeholder.png'}
                    alt={productData.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150?text=LUU+SAFETY';
                    }}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-2 uppercase tracking-tight">{productData.name}</h3>
                  <p className="text-xs font-black text-purple-600 dark:text-purple-400 mt-1">{unitPrice.toFixed(2)} ETB each</p>
                </div>
              </div>

              <hr className="border-slate-200 dark:border-slate-700" />

              {/* Color Selection */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1">
                  <Palette size={14} /> Color: <span className="text-purple-600 dark:text-purple-400 font-black">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableColors.map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all ${
                        selectedColor === color
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Quantity</label>
                <div className="inline-flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 p-1">
                  <button
                    type="button"
                    onClick={() => handleQtyChange(-1)}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-xs font-black text-slate-900 dark:text-white">{String(quantity).padStart(2, '0')}</span>
                  <button
                    type="button"
                    onClick={() => handleQtyChange(1)}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-3.5 text-xs font-bold pt-2">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Subtotal ({quantity} {quantity === 1 ? 'item' : 'items'})</span>
                <span className="text-slate-900 dark:text-white font-extrabold">{subtotal.toFixed(2)} ETB</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Shipping Fee</span>
                <span className="text-slate-900 dark:text-white font-extrabold">{shippingCost.toFixed(2)} ETB</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-800 pt-4">
                <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Total Amount</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">{totalAmount.toFixed(2)} ETB</span>
              </div>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CheckoutScreen;