import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Smartphone, CreditCard, ChevronLeft, Lock } from 'lucide-react';

const PaymentScreen = () => {
  const [method, setMethod] = useState('telebirr');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API call to Telebirr Gateway
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/orders'); // Redirect to the orders page you just built!
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12">
        
        {/* LEFT: PAYMENT SELECTION */}
        <div className="md:col-span-7">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 hover:text-blue-600 transition-colors">
            <ChevronLeft size={16} /> Back to Cart
          </button>

          <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">Checkout</h1>
          <p className="text-gray-500 text-sm mb-10">Select your preferred secure payment method.</p>

          <div className="space-y-4">
            {/* Telebirr Option */}
            <div 
              onClick={() => setMethod('telebirr')}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${method === 'telebirr' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 bg-white'}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs">
                  TB
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Telebirr</h3>
                  <p className="text-xs text-gray-500">Pay securely using your mobile account</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'telebirr' ? 'border-blue-600' : 'border-gray-300'}`}>
                {method === 'telebirr' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
              </div>
            </div>

            {/* Credit Card Option (Placeholder) */}
            <div 
              onClick={() => setMethod('card')}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${method === 'card' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 bg-white'}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Credit / Debit Card</h3>
                  <p className="text-xs text-gray-500">Visa, Mastercard, or American Express</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'card' ? 'border-blue-600' : 'border-gray-300'}`}>
                {method === 'card' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
              </div>
            </div>
          </div>

          {method === 'telebirr' && (
            <div className="mt-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Enter Telebirr Phone Number</label>
              <div className="flex gap-2">
                <div className="bg-gray-100 px-4 py-4 rounded-xl font-bold text-gray-500">+251</div>
                <input 
                  type="text" 
                  placeholder="911 22 33 44"
                  className="flex-grow bg-gray-50 border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-600 font-bold"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-4 leading-relaxed italic">
                * After clicking pay, you will receive a push notification on your mobile device to authorize the transaction.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="md:col-span-5">
          <div className="bg-gray-900 rounded-[2rem] p-8 text-white sticky top-32">
            <h2 className="text-xl font-bold mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-bold">$165.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span className="text-green-400 font-bold">FREE</span>
              </div>
              <div className="h-px bg-gray-800 my-4"></div>
              <div className="flex justify-between text-xl">
                <span className="font-bold">Total</span>
                <span className="font-black text-blue-500">$165.00</span>
              </div>
            </div>

            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${isProcessing ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 active:scale-95 shadow-xl shadow-blue-900/20'}`}
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>Pay with Telebirr <Smartphone size={16} /></>
              )}
            </button>

            <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              <Lock size={12} /> 256-bit SSL Secure Payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;