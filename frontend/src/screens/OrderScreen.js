import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, Truck, CheckCircle, ChevronRight } from 'lucide-react';

const OrderScreen = () => {
  // Mock data for orders
  const myOrders = [
    {
      id: "ORD-9921",
      name: "Titanium Series Helmet",
      status: "Processing",
      deliveryTime: "Waiting 2 Days",
      date: "March 30, 2026",
      img: "https://images.pexels.com/photos/6492100/pexels-photo-6492100.jpeg",
      price: "$55.00"
    },
    {
      id: "ORD-8842",
      name: "Steel-Toe Heavy Duty Boots",
      status: "In Transit",
      deliveryTime: "Waiting 3 Days",
      date: "March 28, 2026",
      img: "https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg",
      price: "$110.00"
    }
  ];

  // Helper function to get status-specific UI configurations
  const getStatusConfig = (status) => {
    switch (status) {
      case "In Transit":
        return {
          bg: "bg-blue-50 border-blue-100",
          text: "text-blue-700",
          subtext: "text-blue-500",
          dotColor: "bg-blue-500 animate-pulse",
          icon: <Truck size={16} />,
          label: "Until Delivery"
        };
      case "Processing":
        return {
          bg: "bg-orange-50 border-orange-100",
          text: "text-orange-700",
          subtext: "text-orange-500",
          dotColor: "bg-orange-400",
          icon: <Clock size={16} />,
          label: "In Production"
        };
      case "Delivered":
        return {
          bg: "bg-green-50 border-green-100",
          text: "text-green-700",
          subtext: "text-green-500",
          dotColor: "bg-green-500",
          icon: <CheckCircle size={16} />,
          label: "Completed"
        };
      default:
        return {
          bg: "bg-gray-50 border-gray-100",
          text: "text-gray-700",
          subtext: "text-gray-500",
          dotColor: "bg-gray-400",
          icon: <Package size={16} />,
          label: "Status Pending"
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">My Orders</h1>
          <p className="text-gray-500 text-sm font-medium mt-2">Track your safety equipment delivery status.</p>
        </div>

        <div className="space-y-6">
          {myOrders.map((order) => {
            const config = getStatusConfig(order.status);
            
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-blue-200 transition-all">
                <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
                  
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={order.img} alt={order.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Order Details */}
                  <div className="flex-grow text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{order.id}</span>
                      <span className="hidden md:block text-gray-300">•</span>
                      <span className="text-xs text-gray-400 font-bold">{order.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{order.name}</h3>
                    <p className="text-blue-600 font-black text-sm mt-1">{order.price}</p>
                  </div>

                  {/* Dynamic Delivery Status Card */}
                  <div className={`${config.bg} border rounded-2xl p-4 flex flex-col items-center justify-center min-w-[160px]`}>
                    <div className={`flex items-center gap-2 ${config.text} mb-1`}>
                      {config.icon}
                      <span className="text-xs font-black uppercase tracking-wider">{order.deliveryTime}</span>
                    </div>
                    <p className={`text-[10px] ${config.subtext} font-bold uppercase tracking-widest italic`}>{config.label}</p>
                  </div>

                  {/* Track Button */}
                  <button className="flex items-center gap-2 text-gray-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest transition-colors">
                    Details <ChevronRight size={16} />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${config.dotColor}`}></div>
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{order.status}</span>
                  </div>
                  <Link to="/shop" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
                    Order Again
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State Link */}
        <div className="mt-12 text-center border-2 border-dashed border-gray-200 rounded-3xl p-10">
          <Package className="mx-auto text-gray-300 mb-4" size={40} />
          <p className="text-gray-500 font-bold text-sm mb-6">Need more protection for your team?</p>
          <Link to="/shop" className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all">
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;