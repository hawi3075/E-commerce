import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShoppingBag, CreditCard, MapPin, User, Phone, 
  CheckCircle, Mail, Plus, Minus, Palette, Smartphone, DollarSign 
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

    if (paymentMethod === 'telebirr') {
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

          console.error('Telebirr Error:', errorMessage);
          alert(`Payment Error: ${errorMessage}`);
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error('Telebirr Connection Error:', error);
        alert('Could not connect to payment backend. Check if your backend server routes are properly configured.');
        setIsSubmitting(false);
      }
    } else {
      // Cash on Delivery / Standard Flow
      setTimeout(() => {
        setIsSubmitting(false);
        localStorage.removeItem('checkout_product');
        navigate('/orders');
      }, 1200);
    }
  };

  if (!productData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-black text-gray-900 mb-4">No product selected for checkout</h2>
        <p className="text-gray-600 mb-6">Please select an item from the shop to proceed with purchase.</p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-3 bg-purple-700 text-white font-bold rounded-xl shadow hover:bg-purple-800 transition-all"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all text-sm"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="text-3xl font-black text-gray-900 mb-8">Checkout & Purchase</h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Delivery Details & Payment */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Delivery Details */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="text-purple-700" size={20} /> Delivery Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Abebe Kebede"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      placeholder="0911234567"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. abebe@gmail.com"
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Postal / ZIP Code</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. 1000"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Specific Location / Street</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bole Medhanialem, House #104"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Options */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="text-purple-700" size={20} /> Select Payment Method
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'telebirr', name: 'Telebirr', icon: Smartphone },
                { id: 'cbe', name: 'CBE Birr', icon: CreditCard },
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
                        ? 'border-purple-600 bg-purple-50/50 text-purple-900 font-bold shadow-sm ring-2 ring-purple-600/20'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 font-medium'
                    }`}
                  >
                    <Icon className={isSelected ? 'text-purple-700' : 'text-gray-400'} size={20} />
                    <span className="text-sm">{method.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-700 hover:bg-purple-800 disabled:bg-gray-400 text-white font-black py-4 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-base"
          >
            {isSubmitting ? (
              <span>Connecting Telebirr...</span>
            ) : (
              <>
                <CheckCircle size={20} /> Pay with {paymentMethod === 'telebirr' ? 'Telebirr' : 'Selected Method'} ({totalAmount.toFixed(2)} ETB)
              </>
            )}
          </button>
        </div>

        {/* Right Side: Order Summary & Item Customization */}
        <div className="lg:col-span-5 bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between h-fit space-y-6">
          <div>
            <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingBag className="text-purple-700" size={20} /> Order Summary
            </h2>

            {/* Product Card */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-4">
              <div className="flex gap-4">
                <img
                  src={productData.image || '/placeholder.png'}
                  alt={productData.name}
                  className="w-20 h-20 object-cover rounded-xl border border-gray-100"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="font-extrabold text-sm text-gray-900 line-clamp-2">{productData.name}</h3>
                  <p className="text-sm font-black text-purple-700 mt-1">{unitPrice.toFixed(2)} ETB each</p>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Color Selection */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-2 flex items-center gap-1">
                  <Palette size={14} /> Selected Color: <span className="text-purple-700">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        selectedColor === color
                          ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Quantity</label>
                <div className="inline-flex items-center border border-gray-200 rounded-xl bg-gray-50">
                  <button
                    type="button"
                    onClick={() => handleQtyChange(-1)}
                    className="p-2 text-gray-600 hover:text-purple-700 hover:bg-gray-100 rounded-l-xl transition-all"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 font-black text-sm text-gray-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => handleQtyChange(1)}
                    className="p-2 text-gray-600 hover:text-purple-700 hover:bg-gray-100 rounded-r-xl transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 text-sm font-bold border-t border-gray-200 pt-4 mt-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({quantity} {quantity === 1 ? 'item' : 'items'})</span>
                <span className="text-gray-900">{subtotal.toFixed(2)} ETB</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span className="text-gray-900">{shippingCost.toFixed(2)} ETB</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 border-t border-gray-200 pt-3">
                <span>Total Amount</span>
                <span className="text-purple-700 text-lg">{totalAmount.toFixed(2)} ETB</span>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default CheckoutScreen;