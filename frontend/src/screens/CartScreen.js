import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, ArrowLeft } from 'lucide-react';

const CartScreen = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // 1. Load dynamic cart data from localStorage & listen for local changes
  useEffect(() => {
    const loadCart = () => {
      const stored = localStorage.getItem('cartItems');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCartItems(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
          console.error("Failed to parse cart items:", e);
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    };

    // Load initial cart
    loadCart();

    // Listen for changes from other tabs (storage) and same tab (cartUpdated)
    window.addEventListener('storage', loadCart);
    window.addEventListener('cartUpdated', loadCart);

    return () => {
      window.removeEventListener('storage', loadCart);
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  // Helper to persist updates and notify Navbar and other components
  const updateStorageAndNotify = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // 2. Quantity Operations
  const handleQuantityChange = (id, delta) => {
    const updated = cartItems.map((item) => {
      const itemKey = item._id || item.id;
      if (itemKey === id) {
        const currentQty = Number(item.qty) || 1;
        const newQty = Math.max(1, currentQty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    });
    updateStorageAndNotify(updated);
  };

  // 3. Remove Item
  const handleRemoveItem = (id) => {
    const updated = cartItems.filter((item) => (item._id || item.id) !== id);
    updateStorageAndNotify(updated);
  };

  // 4. Price Calculations
  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    return acc + price * qty;
  }, 0);

  const estimatedTax = subtotal > 0 ? subtotal * 0.08 : 0; // 8% estimated tax
  const total = subtotal + estimatedTax;

  // 5. Checkout Navigation
  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-sans text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Shopping Cart
            </h1>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Review your tactical gear order before proceeding to deployment checkout.
            </p>
          </div>
          <Link 
            to="/shop" 
            className="hidden sm:flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          /* Empty State UX */
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-slate-200 dark:border-slate-800 text-center shadow-sm max-w-xl mx-auto my-12">
            <div className="w-20 h-20 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-5">
              <ShoppingBag size={36} />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">Your Cart is Empty</h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2 mb-6">
              You haven't added any industrial safety gear or equipment to your list yet.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
            >
              Explore Shop Marketplace <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          /* Main Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-7 space-y-4">
              {cartItems.map((item, index) => {
                const itemId = item._id || item.id || `cart-item-${index}`;
                const itemImage = item.image || item.imageUrl || '/placeholder.png';
                const itemPrice = Number(item.price) || 0;
                const itemQty = Number(item.qty) || 1;

                return (
                  <div 
                    key={itemId}
                    className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 transition-all hover:border-slate-300 dark:hover:border-slate-700"
                  >
                    {/* Image & Title */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                        <img 
                          src={itemImage} 
                          alt={item.name || 'Product Image'} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150?text=LUU+SAFETY';
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1">
                          {item.name || 'Safety Equipment'}
                        </h3>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                          {item.category || 'ANSI Z89.1 COMPLIANT'}
                        </p>
                        <p className="text-xs font-black text-purple-600 dark:text-purple-400 mt-2 sm:hidden">
                          ${itemPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls & Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                      
                      {/* Stepper */}
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl p-1">
                        <button 
                          onClick={() => handleQuantityChange(itemId, -1)}
                          className="p-1.5 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-black text-slate-900 dark:text-white">
                          {String(itemQty).padStart(2, '0')}
                        </span>
                        <button 
                          onClick={() => handleQuantityChange(itemId, 1)}
                          className="p-1.5 hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Single Item Total */}
                      <div className="hidden sm:block text-right min-w-[80px]">
                        <span className="text-sm font-black text-slate-900 dark:text-white">
                          ${(itemPrice * itemQty).toFixed(2)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => handleRemoveItem(itemId)}
                        className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-3.5 text-xs font-bold">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-slate-900 dark:text-white font-extrabold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-slate-900 dark:text-white font-extrabold">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Shipping</span>
                  <span className="text-amber-500 uppercase tracking-wider font-extrabold">Calculated at Checkout</span>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex justify-between items-center">
                <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Total</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">${total.toFixed(2)}</span>
              </div>

              {/* Proceed to Checkout Button */}
              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-2xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-1">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Encrypted 256-Bit SSL Procurement</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default CartScreen;