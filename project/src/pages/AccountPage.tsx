import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { User, Package, Heart, LogOut, CreditCard, Settings, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/products/ProductCard';

// Login Form Component
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const { login, register } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegister) {
      await register(name, email, password);
    } else {
      await login(email, password);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isRegister ? 'Hesap Oluştur' : 'Giriş Yap'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Ad Soyad
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-posta
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Şifre
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        {!isRegister && (
          <div className="text-sm">
            <a href="#" className="text-primary-dark hover:underline">
              Şifremi Unuttum
            </a>
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-primary-dark hover:bg-primary text-white font-bold py-3 px-4 rounded-md transition-colors"
        >
          {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <button
          type="button"
          className="text-primary-dark hover:underline text-sm"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Zaten bir hesabın var mı? Giriş yap' : 'Hesabın yok mu? Kayıt ol'}
        </button>
      </div>
    </div>
  );
};

// Profile Component
const Profile: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Hesap Bilgileri</h2>
      
      <div className="mb-6">
        <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-primary-dark font-bold text-2xl mb-4">
          {user?.name.substring(0, 1)}
        </div>
        <h3 className="text-lg font-semibold">{user?.name}</h3>
        <p className="text-gray-600">{user?.email}</p>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Kişisel Bilgiler</h3>
        <div className="space-y-2 text-sm">
          <p className="grid grid-cols-3">
            <span className="text-gray-600">Ad Soyad:</span>
            <span className="col-span-2">{user?.name}</span>
          </p>
          <p className="grid grid-cols-3">
            <span className="text-gray-600">E-posta:</span>
            <span className="col-span-2">{user?.email}</span>
          </p>
          <p className="grid grid-cols-3">
            <span className="text-gray-600">Telefon:</span>
            <span className="col-span-2">+90 (555) 123 45 67</span>
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Adres Bilgileri</h3>
        <div className="space-y-2 text-sm">
          <p className="grid grid-cols-3">
            <span className="text-gray-600">Teslimat Adresi:</span>
            <span className="col-span-2">
              Atatürk Mah. Cumhuriyet Cad. No:123 D:4, Kadıköy / İstanbul
            </span>
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <button className="bg-primary-dark hover:bg-primary text-white font-semibold py-2 px-4 rounded-md transition-colors">
          Bilgilerimi Güncelle
        </button>
      </div>
    </div>
  );
};

// Orders Component
const Orders: React.FC = () => {
  const orders = [
    {
      id: 'SP-2023-0001',
      date: '15.05.2025',
      status: 'Teslim Edildi',
      total: 1499.99,
      items: 3,
    },
    {
      id: 'SP-2023-0002',
      date: '02.05.2025',
      status: 'Kargoda',
      total: 499.50,
      items: 1,
    },
    {
      id: 'SP-2023-0003',
      date: '25.04.2025',
      status: 'İptal Edildi',
      total: 2899.90,
      items: 2,
    },
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Siparişlerim</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <p className="text-gray-600">Henüz hiç siparişiniz bulunmuyor.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-semibold">Sipariş No: {order.id}</span>
                  <span className="text-sm text-gray-600 ml-4">{order.date}</span>
                </div>
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Teslim Edildi' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'Kargoda'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              
              <div className="flex justify-between text-sm border-t border-gray-100 pt-2">
                <div className="text-gray-600">
                  <span>{order.items} Ürün</span>
                </div>
                <div>
                  <span className="font-semibold">{order.total.toLocaleString('tr-TR')} ₺</span>
                </div>
              </div>
              
              <div className="mt-3 flex justify-between">
                <button className="text-sm text-primary-dark hover:underline">
                  Detayları Görüntüle
                </button>
                {order.status === 'Teslim Edildi' && (
                  <button className="text-sm text-primary-dark hover:underline">
                    Fatura İndir
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Wishlist Component
const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Favorilerim</h2>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-8">
          <Heart className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <p className="text-gray-600">Henüz favorilerinize ürün eklemediniz.</p>
          <Link 
            to="/" 
            className="mt-4 inline-block bg-primary-dark hover:bg-primary text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

// Settings Component
const SettingsPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Ayarlar</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Şifre Değiştir</h3>
          <form className="space-y-3">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Mevcut Şifre
              </label>
              <input
                type="password"
                id="currentPassword"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Yeni Şifre
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Yeni Şifre (Tekrar)
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
            </div>
            
            <button
              type="submit"
              className="bg-primary-dark hover:bg-primary text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Şifreyi Güncelle
            </button>
          </form>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <h3 className="font-semibold mb-3">Bildirim Tercihleri</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-primary-dark focus:ring-primary-dark h-4 w-4"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">
                E-posta ile kampanya bildirimleri
              </span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-primary-dark focus:ring-primary-dark h-4 w-4"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">
                SMS ile kampanya bildirimleri
              </span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-primary-dark focus:ring-primary-dark h-4 w-4"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">
                Sipariş durumu bildirimleri
              </span>
            </label>
          </div>
          
          <button
            className="mt-4 bg-primary-dark hover:bg-primary text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Tercihleri Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Account Page Component
const AccountPage: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated && !location.pathname.includes('/hesabim/giris')) {
    return <Navigate to="/hesabim/giris" />;
  }
  
  const menuItems = [
    { path: '/hesabim', label: 'Profilim', icon: <User className="mr-2 h-5 w-5" /> },
    { path: '/hesabim/siparisler', label: 'Siparişlerim', icon: <Package className="mr-2 h-5 w-5" /> },
    { path: '/hesabim/favoriler', label: 'Favorilerim', icon: <Heart className="mr-2 h-5 w-5" /> },
    { path: '/hesabim/ayarlar', label: 'Ayarlar', icon: <Settings className="mr-2 h-5 w-5" /> },
  ];
  
  return (
    <div className="container mx-auto px-4 py-12 mt-16">
      {isAuthenticated ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white rounded-lg shadow-md p-4 h-fit">
            <h2 className="text-xl font-semibold mb-6 px-2">Hesabım</h2>
            
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    location.pathname === item.path
                      ? 'bg-primary-light text-primary-dark font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              
              <button
                onClick={logout}
                className="flex items-center px-3 py-2 rounded-md text-red-600 hover:bg-red-50 w-full text-left"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Çıkış Yap
              </button>
            </nav>
          </div>
          
          {/* Content */}
          <div className="md:col-span-3">
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/siparisler" element={<Orders />} />
              <Route path="/favoriler" element={<Wishlist />} />
              <Route path="/ayarlar" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default AccountPage;