import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import ProductGrid from '../components/products/ProductGrid';
import { getNewProducts, getPopularProducts } from '../data/products';
import { ShoppingBag, Truck, CreditCard, LifeBuoy } from 'lucide-react';

const features = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Ücretsiz Kargo",
    description: "300₺ ve üzeri alışverişlerde Türkiye'nin her yerine ücretsiz kargo"
  },
  {
    icon: <ShoppingBag className="w-8 h-8" />,
    title: "Kolay İade",
    description: "30 gün içinde ücretsiz iade garantisi"
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "Güvenli Ödeme",
    description: "En güvenli ödeme yöntemleri ve SSL sertifikası"
  },
  {
    icon: <LifeBuoy className="w-8 h-8" />,
    title: "7/24 Destek",
    description: "Her zaman yanınızda olan müşteri hizmetleri"
  }
];

const HomePage: React.FC = () => {
  const newProducts = getNewProducts();
  const popularProducts = getPopularProducts();

  return (
    <div>
      <HeroSlider />
      
      {/* Features Section */}
      <div className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center p-6 bg-primary-light rounded-lg shadow-3d transition-transform duration-300 hover:transform hover:scale-105"
              >
                <div className="mr-4 text-primary-dark">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* New Products Section */}
      <ProductGrid 
        products={newProducts} 
        title="Yeni Ürünler" 
      />
      
      {/* Banner Section */}
      <div className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/5632386/pexels-photo-5632386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            filter: "brightness(0.7)"
          }}
        />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-lg text-center mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Özel Koleksiyon</h2>
            <p className="text-lg mb-8">
              En trend parçaları şimdi keşfedin ve stilinizi tamamlayın.
              Sınırlı sayıda ve özel olarak sizin için hazırlandı.
            </p>
            <a 
              href="#" 
              className="inline-block bg-white text-primary-dark font-bold py-3 px-8 rounded-md shadow-lg transition transform hover:scale-105"
            >
              Koleksiyonu Keşfet
            </a>
          </div>
        </div>
      </div>
      
      {/* Popular Products Section */}
      <ProductGrid 
        products={popularProducts} 
        title="Popüler Ürünler" 
      />
      
      {/* Newsletter Section */}
      <div className="bg-primary-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary-dark">Bültenimize Abone Olun</h2>
            <p className="mb-6 text-gray-600">
              En yeni ürünler, kampanyalar ve indirimler hakkında bilgi almak için bültenimize abone olun.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="E-posta adresiniz" 
                className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark"
                required
              />
              <button 
                type="submit" 
                className="bg-primary-dark hover:bg-primary text-white font-semibold py-3 px-6 rounded-md transition-colors"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;