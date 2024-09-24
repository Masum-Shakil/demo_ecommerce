import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./components/Home";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp"
import { Routes, Route } from 'react-router-dom';
import Verified from "./components/Verified";
import { createContext, useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from "./components/ProductDetails";
import Dashboard from "./components/Dashboard";
import MyCart from "./components/MyCart";
import { CartWishlistProvider } from "./components/CartWishlistContext";
import MyWishlist from "./components/MyWishlist";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFail from "./components/PaymentFail";
import MyOrder from "./components/MyOrder";

const AuthContext = createContext();

export const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userID'));
  const [searchQuery, setSearchQuery] = useState('');

  const logout = () => {
      localStorage.removeItem('userID');
      setIsLoggedIn(false);
  };

  const login = (userID) => {
    localStorage.setItem('userID', userID);
    setIsLoggedIn(true);
  };

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, logout, login, searchQuery, setSearchQuery }}>
        <CartWishlistProvider>
          <Header />
          <Routes>
              <Route path="/signup" element={<UserSignUp />} />
              <Route path="/signin" element={<UserLogin />} />
              <Route path="/" element={<Home />} />
              <Route path="/verified/:user_id" element={<Verified />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mycart" element={<MyCart />} />
              <Route path="/mywishlist" element={<MyWishlist />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-fail" element={<PaymentFail />} />
              <Route path="/myorder" element={<MyOrder />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </CartWishlistProvider>
      </AuthContext.Provider>
    </>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
};