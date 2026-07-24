import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import AdminSidebar from './components/AdminSidebar';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';

import ShopScreen from './screens/ShopScreen';
import ProductScreen from './screens/ProductScreen';

import AboutScreen from './screens/About'; 
import ContactScreen from './screens/Contact';

// Admin Screen Imports
import Dashboard from './screens/admin/Dashboard'; 
import UploadProduct from './screens/admin/UploadProduct';
import ManageUsers from './screens/admin/ManageUsers';

// Auth Provider & Context
import { AuthProvider, AuthContext } from './context/AuthContext';

// Protected Route Handler (Supports User and Admin Access Control)
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const auth = useContext(AuthContext);
  // Support either userInfo or user depending on AuthContext key naming
  const activeUser = auth?.userInfo || auth?.user;

  if (!activeUser) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !(activeUser.isAdmin || activeUser.role === 'admin')) {
    return <Navigate to="/" replace />;
  }

  return children;
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
    <AuthProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/shop" element={<ShopScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            
            {/* User Protected Routes */}
            <Route path="/orders" element={<ProtectedRoute><OrderScreen /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><PaymentScreen /></ProtectedRoute>} />

            {/* Admin Protected Section */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <div className="flex"><AdminSidebar /><Dashboard /></div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/upload" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <div className="flex"><AdminSidebar /><UploadProduct /></div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <div className="flex"><AdminSidebar /><ManageUsers /></div>
                </ProtectedRoute>
              } 
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;