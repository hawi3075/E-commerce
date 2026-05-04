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
import ShopScreen from './screens/ShopScreen'; 

// --- ADDED THESE IMPORTS SO THE PAGES ARE NOT EMPTY ---
import AboutScreen from './screens/AboutScreen'; 
import ContactScreen from './screens/ContactScreen';

// Admin Screen Imports
import Dashboard from './screens/admin/Dashboard'; 
import UploadProduct from './screens/admin/UploadProduct';
import ManageUsers from './screens/admin/ManageUsers';

// --- AUTH PROTECTOR ---
const ProtectedRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo'); 
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// --- LAYOUT LOGIC ---
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  
  // Hide standard Navbar on Admin, Login, and Signup screens
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
          {/* --- PUBLIC ACCESSIBLE PAGES --- */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          
          {/* --- UPDATED THESE ROUTES TO USE YOUR ACTUAL SCREENS --- */}
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/search" element={<div className="p-20 text-center font-black uppercase text-slate-400">Search PPE Inventory</div>} />

          {/* --- PROTECTED CLIENT PAGES --- */}
          <Route path="/shop" element={<ProtectedRoute><ShopScreen /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><ProductScreen /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrderScreen /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><PaymentScreen /></ProtectedRoute>} />

          {/* --- ADMIN SECTION --- */}
          <Route path="/admin" element={<div className="flex"><AdminSidebar /><Dashboard /></div>} />
          <Route path="/admin/upload" element={<div className="flex"><AdminSidebar /><UploadProduct /></div>} />
          <Route path="/admin/users" element={<div className="flex"><AdminSidebar /><ManageUsers /></div>} />
          <Route path="/admin/codes" element={<div className="flex"><AdminSidebar /><div className="p-8 font-bold text-slate-400 uppercase tracking-widest">Discount Codes Coming Soon...</div></div>} />

          {/* --- CATCH-ALL REDIRECT --- */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;