import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import CategoryPage from './pages/CategoryPage';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import ScrollToTop from './components/utils/ScrollToTop';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary-light">
        <div className="animate-pulse text-2xl font-semibold text-primary-dark font-poppins">
          Yükleniyor...
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <WishlistProvider>
        <ShoppingCartProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-primary-light to-secondary font-poppins">
            <ScrollToTop />
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/urun/:id" element={<ProductPage />} />
                <Route path="/kategori/:category" element={<CategoryPage />} />
                <Route path="/sepet" element={<CartPage />} />
                <Route path="/odeme" element={<CheckoutPage />} />
                <Route path="/hesabim/*" element={<AccountPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ShoppingCartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;