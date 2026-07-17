import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import AdminSidebar from './components/AdminSidebar';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';

// --- ROUTE COMPONENTS ---
import ShopScreen from './screens/ShopScreen';      // <-- Import the grid/sidebar list component
import ProductScreen from './screens/ProductScreen';   // <-- Keep this as your single-product details view

import AboutScreen from './screens/About'; 
import ContactScreen from './screens/Contact';

// Admin Screen Imports
import Dashboard from './screens/admin/Dashboard'; 
import UploadProduct from './screens/admin/UploadProduct';
import ManageUsers from './screens/admin/ManageUsers';

const ProtectedRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo'); 
  return userInfo ? children : <Navigate to="/login" replace />;
};

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const hideNavPaths = ['/admin', '/login', '/signup'];
  const shouldHideNav = hideNavPaths.some(path => location.pathname.startsWith(path));
  
  return (
    <div className="min-h-screen bg-white">
      {!shouldHideNav && <Navbar />}
      <main className={!shouldHideNav ? "pt-16" : ""}>{children}</main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/contact" element={<ContactScreen />} />

          {/* --- FIXED ROUTING --- */}
          {/* 1. Point "/shop" to the grid-sidebar list screen */}
          <Route path="/shop" element={<ShopScreen />} />
          
          {/* 2. Point "/product/:id" to the single-product details view */}
          <Route path="/product/:id" element={<ProductScreen />} />
          
          <Route path="/orders" element={<ProtectedRoute><OrderScreen /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><PaymentScreen /></ProtectedRoute>} />

          {/* Admin Section */}
          <Route path="/admin" element={<div className="flex"><AdminSidebar /><Dashboard /></div>} />
          <Route path="/admin/upload" element={<div className="flex"><AdminSidebar /><UploadProduct /></div>} />
          <Route path="/admin/users" element={<div className="flex"><AdminSidebar /><ManageUsers /></div>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;