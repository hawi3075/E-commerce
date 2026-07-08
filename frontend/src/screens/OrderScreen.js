import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, Truck, CheckCircle, ChevronRight, ChevronDown, MapPin } from 'lucide-react';

// Configuration lookup helper moved outside to prevent re-creation on render
const getStatusConfig = (status) => {
  switch (status) {
    case "In Transit":
      return {
        bg: "bg-blue-50 border-blue-100",
        text: "text-blue-700",
        subtext: "text-blue-500",
        dotColor: "bg-blue-500 animate-pulse",
        icon: <Truck size={16} />,
        label: "Until Delivery",
        stepIndex: 1
      };
    case "Processing":
      return {
        bg: "bg-orange-50 border-orange-100",
        text: "text-orange-700",
        subtext: "text-orange-500",
        dotColor: "bg-orange-400",
        icon: <Clock size={16} />,
        label: "In Production",
        stepIndex: 0
      };
    case "Delivered":
      return {
        bg: "bg-green-50 border-green-100",
        text: "text-green-700",
        subtext: "text-green-500",
        dotColor: "bg-green-500",
        icon: <CheckCircle size={16} />,
        label: "Completed",
        stepIndex: 2
      };
    default:
      return {
        bg: "bg-gray-50 border-gray-100",
        text: "text-gray-700",
        subtext: "text-gray-500",
        dotColor: "bg-gray-400",
        icon: <Package size={16} />,
        label: "Status Pending",
        stepIndex: -1
      };
  }
};

const steps = ["Processing", "In Transit", "Delivered"];

const OrderScreen = () => {
  // State to handle expanded details for individual orders
  const [expandedOrders, setExpandedOrders] = useState({});

  // Mock data for orders
  const myOrders = [
    {
      id: "ORD-9921",
      name: "Titanium Series Helmet",
      status: "Processing",
      deliveryTime: "Waiting 2 Days",
      date: "March 30, 2026",
      img: "https://images.pexels.com/photos/6492100/pexels-photo-6492100.jpeg",
      price: "$55.00",
      history: [
        { title: "Order Confirmed", time: "March 30, 2026 - 10:30 AM", done: true },
        { title: "In Production", time: "March 31, 2026 - 08:00 AM", done: true },
        { title: "Quality Check", time: "Pending", done: false }
      ]
    },
    {
      id: "ORD-8842",
      name: "Steel-Toe Heavy Duty Boots",
      status: "In Transit",
      deliveryTime: "Waiting 3 Days",
      date: "March 28, 2026",
      img: "https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg",
      price: "$110.00",
      history: [
        { title: "Order Confirmed", time: "March 28, 2026 - 02:15 PM", done: true },
        { title: "Processing & Packaging", time: "March 29, 2026 - 09:00 AM", done: true },
        { title: "In Transit (Shipped via DHL)", time: "March 30, 2026 - 04:45 PM", done: true },
        { title: "Out for Delivery", time: "Estimated April 1, 2026", done: false }
      ]
    }
  ];


  const toggleDetails = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
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
            const isExpanded = Boolean(expandedOrders[order.id]);
            
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:border-gray-200 transition-all">
                <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
                  
                  
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={order.img} alt={order.name} className="w-full h-full object-cover" />
                  </div>

                  
                  <div className="flex-grow text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{order.id}</span>
                      <span className="hidden md:block text-gray-300">•</span>
                      <span className="text-xs text-gray-400 font-bold">{order.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{order.name}</h3>
                    <p className="text-blue-600 font-black text-sm mt-1">{order.price}</p>
                  </div>

                  
                  <div className={`${config.bg} border rounded-2xl p-4 flex flex-col items-center justify-center min-w-[160px]`}>
                    <div className={`flex items-center gap-2 ${config.text} mb-1`}>
                      {config.icon}
                      <span className="text-xs font-black uppercase tracking-wider">{order.deliveryTime}</span>
                    </div>
                    <p className={`text-[10px] ${config.subtext} font-bold uppercase tracking-widest italic`}>{config.label}</p>
                  </div>

                  {/* Interactive Details Toggle Button */}
                  <button 
                    onClick={() => toggleDetails(order.id)}
                    className="flex items-center gap-1 text-gray-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest transition-colors"
                  >
                    Details {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                </div>

                {/* Expanded Detailed Tracking Timeline */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-50 bg-gray-50/30 transition-all">
                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1">
                      <MapPin size={12} /> Live Milestone Logs
                    </h4>
                    <div className="relative pl-4 border-l-2 border-gray-200 space-y-4 ml-2">
                      {order.history.map((item, idx) => (
                        <div key={idx} className="relative">
                          <div className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${item.done ? 'bg-blue-600' : 'bg-gray-300'}`} />
                          <p className={`text-xs font-bold ${item.done ? 'text-gray-800' : 'text-gray-400'}`}>{item.title}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{item.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-50 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                  <div className="flex items-center gap-4 flex-grow max-w-md">
                    {steps.map((step, index) => {
                      const isCompleted = index <= config.stepIndex;
                      const isCurrent = index === config.stepIndex;
                      return (
                        <div key={step} className="flex items-center gap-2 flex-grow last:flex-grow-0">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2.5 h-2.5 rounded-full ${isCurrent ? config.dotColor : isCompleted ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                            <span className={`text-[9px] font-black tracking-wider uppercase ${isCurrent ? config.text : isCompleted ? 'text-gray-700' : 'text-gray-300'}`}>
                              {step}
                            </span>
                          </div>
                          {index < steps.length - 1 && (
                            <div className={`h-[2px] flex-grow rounded-full ${index < config.stepIndex ? 'bg-blue-600' : 'bg-gray-200'}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <Link to="/shop" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline self-end sm:self-auto">
                    Order Again
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        
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