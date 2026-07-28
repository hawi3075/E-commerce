import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import AdminSidebar from './components/AdminSidebar';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import OrderScreen from './screens/OrderScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import PaymentScreen from './screens/PaymentScreen';

import ShopScreen from './screens/ShopScreen';
import ProductScreen from './screens/ProductScreen';

import AboutScreen from './screens/About'; 
import ContactScreen from './screens/Contact';

// Cart & Profile
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';

// Admin Screen Imports
import Dashboard from './screens/admin/Dashboard'; 
import UploadProduct from './screens/admin/UploadProduct';
import Orders from './screens/admin/Orders';

// Updated Admin Screens
import Messages from './screens/admin/Messages';
import Customers from './screens/admin/Customers'; // <--- THIS COMPONENT HAS THE SEARCH BAR
import Performance from './screens/admin/Performance';
import AdminTeam from './screens/admin/AdminTeam';

// Auth Provider & Context
import { AuthProvider, AuthContext } from './context/AuthContext';

// Protected Route Handler
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  
  const activeUser = auth?.userInfo || auth?.user;

  if (!activeUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !(activeUser.isAdmin || activeUser.role === 'admin' || activeUser.role === 'SUPER_ADMIN')) {
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
            
            {/* Cart & Profile Routes */}
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
            
            {/* User Protected Routes */}
            <Route path="/orders" element={<ProtectedRoute><OrderScreen /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><CheckoutScreen /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><PaymentScreen /></ProtectedRoute>} />

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
              path="/admin/inventory" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <div className="flex"><AdminSidebar /><UploadProduct /></div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/orders" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <div className="flex"><AdminSidebar /><Orders /></div>
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

            {/* FIXED: Changed ManageUsers to Customers */}
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <div className="flex"><AdminSidebar /><Customers /></div>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/admin/messages" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <div className="flex"><AdminSidebar /><Messages /></div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/customers" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <div className="flex"><AdminSidebar /><Customers /></div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/performance" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <div className="flex"><AdminSidebar /><Performance /></div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/team" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <div className="flex"><AdminSidebar /><AdminTeam /></div>
                </ProtectedRoute>
              } 
            />

            {/* Fallback Catch-All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;