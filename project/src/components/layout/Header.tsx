import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, User, Menu, X } from 'lucide-react';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount } = useShoppingCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl text-primary-dark">
            <span className="text-accent">Mavi</span>Alışveriş
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-primary-dark transition-colors">
              Anasayfa
            </Link>
            <Link to="/kategori/erkek-giyim" className="font-medium hover:text-primary-dark transition-colors">
              Erkek
            </Link>
            <Link to="/kategori/kadin-giyim" className="font-medium hover:text-primary-dark transition-colors">
              Kadın
            </Link>
            <Link to="/kategori/elektronik-aksesuarlar" className="font-medium hover:text-primary-dark transition-colors">
              Elektronik
            </Link>
            <Link to="/kategori/ayakkabi" className="font-medium hover:text-primary-dark transition-colors">
              Ayakkabı
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-primary-light transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <Link to="/hesabim/favoriler" className="p-2 rounded-full hover:bg-primary-light transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
            
            <Link to="/sepet" className="p-2 rounded-full hover:bg-primary-light transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            
            <Link to={isAuthenticated ? "/hesabim" : "/hesabim/giris"} className="p-2 rounded-full hover:bg-primary-light transition-colors">
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-primary-light transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="font-medium py-2 border-b border-gray-100">
              Anasayfa
            </Link>
            <Link to="/kategori/erkek-giyim" className="font-medium py-2 border-b border-gray-100">
              Erkek
            </Link>
            <Link to="/kategori/kadin-giyim" className="font-medium py-2 border-b border-gray-100">
              Kadın
            </Link>
            <Link to="/kategori/elektronik-aksesuarlar" className="font-medium py-2 border-b border-gray-100">
              Elektronik
            </Link>
            <Link to="/kategori/ayakkabi" className="font-medium py-2">
              Ayakkabı
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;