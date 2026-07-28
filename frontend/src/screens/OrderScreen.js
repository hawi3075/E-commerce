import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

const OrdersScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('payment') === 'success') {
      setShowSuccessToast(true);
    }
  }, [location]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* SUCCESS NOTIFICATION TOAST */}
      {showSuccessToast && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-emerald-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-sm text-emerald-950">Payment Successful!</h3>
              <p className="text-xs text-emerald-700">
                Your payment was received via Chapa/Telebirr and your order has been placed.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowSuccessToast(false)}
            className="p-1 hover:bg-emerald-100 rounded-lg text-emerald-700 transition-all"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* ORDERS HEADER & CONTENT */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
          <ShoppingBag className="text-purple-700" size={24} /> My Orders
        </h1>
        <p className="text-gray-600 text-sm">
          Thank you for shopping with Luu Safety! Your items are being prepared for delivery.
        </p>
        
        <div className="mt-6">
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-purple-700 text-white font-bold rounded-xl shadow hover:bg-purple-800 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersScreen;