import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

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
import ManageUsers from './screens/admin/ManageUsers';

// AUTH PROTECTOR: Checks if user is registered/logged in
const ProtectedRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo'); // Check if user exists in DB/Storage
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Admin Dashboard Component
const Dashboard = () => (
  <div className="p-8 bg-gray-50 min-h-screen w-full font-sans">
    <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Admin Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Sales</p>
        <p className="text-2xl font-black text-blue-600 mt-2">$4,250.00</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Orders</p>
        <p className="text-2xl font-black text-slate-900 mt-2">12</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">New Users</p>
        <p className="text-2xl font-black text-slate-900 mt-2">48</p>
      </div>
    </div>
  </div>
);

// Layout Logic: Hides Navbar on Admin/Login/Signup for a cleaner look
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const hideNavPaths = ['/admin', '/login', '/signup'];
  const shouldHideNav = hideNavPaths.some(path => location.pathname.startsWith(path));
  
  return (
    <div className="min-h-screen bg-white">
      {!shouldHideNav && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />

          {/* PROTECTED CLIENT PAGES: Impossible to access before Register/Login */}
          <Route path="/shop" element={<ProtectedRoute><ProductScreen /></ProtectedRoute>} />
          <Route path="/product" element={<ProtectedRoute><ProductScreen /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrderScreen /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><PaymentScreen /></ProtectedRoute>} />

          {/* Admin Section */}
          <Route path="/admin" element={<div className="flex"><AdminSidebar /><Dashboard /></div>} />
          <Route path="/admin/upload" element={<div className="flex"><AdminSidebar /><UploadProduct /></div>} />
          <Route path="/admin/users" element={<div className="flex"><AdminSidebar /><ManageUsers /></div>} />
          <Route path="/admin/codes" element={<div className="flex"><AdminSidebar /><div className="p-8 font-bold text-slate-400">Codes Page Coming Soon...</div></div>} />

          {/* Redirect any unknown route to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;