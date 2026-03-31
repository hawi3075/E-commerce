import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Component Imports
import Navbar from './components/Navbar';
import AdminSidebar from './components/AdminSidebar';

// Screen Imports
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import SignupScreen from './screens/SignupScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';

// Admin Screen Imports
import UploadProduct from './screens/admin/UploadProduct';

import ManageUsers from './screens/admin/ManageUsers'; // We will create this next

// A quick Dashboard component so the /admin page isn't empty
const Dashboard = () => (
  <div className="p-8 bg-gray-50 min-h-screen w-full">
    <h1 className="text-2xl font-black text-slate-900 uppercase">Admin Overview</h1>
    <div className="grid grid-cols-3 gap-6 mt-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase">Total Sales</p>
        <p className="text-2xl font-black text-blue-600 mt-2">$4,250.00</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase">Active Orders</p>
        <p className="text-2xl font-black text-slate-900 mt-2">12</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase">New Users</p>
        <p className="text-2xl font-black text-slate-900 mt-2">48</p>
      </div>
    </div>
  </div>
);

// This helper component hides the Navbar when on Admin pages
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  
  return (
    <div className="min-h-screen bg-white">
      {!isAdminPath && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* Main Client Pages */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/shop" element={<ProductScreen />} />
          <Route path="/orders" element={<OrderScreen />} />
          <Route path="/checkout" element={<PaymentScreen />} />
           <Route path="/product" element={<ProductScreen />} />
          {/* Admin Section - Notice the "flex" wrapper for the sidebar */}
          <Route path="/admin" element={<div className="flex"><AdminSidebar /><Dashboard /></div>} />
          <Route path="/admin/upload" element={<div className="flex"><AdminSidebar /><UploadProduct /></div>} />

          <Route path="/admin/users" element={<div className="flex"><AdminSidebar /><ManageUsers /></div>} />
          <Route path="/admin/codes" element={<div className="flex"><AdminSidebar /><div className="p-8">Codes Page Coming Soon...</div></div>} />

        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;