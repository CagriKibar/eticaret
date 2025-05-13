import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">MaviAlışveriş</h3>
            <p className="mb-4">Türkiye'nin en modern ve güvenilir alışveriş deneyimi için yanınızdayız.</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white hover:text-primary-light transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-light transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-light transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary-light transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hızlı Erişim</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-light transition-colors">Anasayfa</Link>
              </li>
              <li>
                <Link to="/kategori/erkek-giyim" className="hover:text-primary-light transition-colors">Erkek Giyim</Link>
              </li>
              <li>
                <Link to="/kategori/kadin-giyim" className="hover:text-primary-light transition-colors">Kadın Giyim</Link>
              </li>
              <li>
                <Link to="/kategori/elektronik-aksesuarlar" className="hover:text-primary-light transition-colors">Elektronik</Link>
              </li>
              <li>
                <Link to="/kategori/ayakkabi" className="hover:text-primary-light transition-colors">Ayakkabı</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/hakkimizda" className="hover:text-primary-light transition-colors">Hakkımızda</Link>
              </li>
              <li>
                <Link to="/sikca-sorulan-sorular" className="hover:text-primary-light transition-colors">Sıkça Sorulan Sorular</Link>
              </li>
              <li>
                <Link to="/iade-kosullari" className="hover:text-primary-light transition-colors">İade Koşulları</Link>
              </li>
              <li>
                <Link to="/gizlilik-politikasi" className="hover:text-primary-light transition-colors">Gizlilik Politikası</Link>
              </li>
              <li>
                <Link to="/iletisim" className="hover:text-primary-light transition-colors">İletişim</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 flex-shrink-0" size={18} />
                <span>Atatürk Bulvarı No:123, Kat:5, 34000 İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 flex-shrink-0" size={18} />
                <span>+90 (212) 123 45 67</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 flex-shrink-0" size={18} />
                <span>info@mavialısveris.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© 2025 MaviAlışveriş. Tüm hakları saklıdır.</p>
            <div className="flex space-x-6">
              <img src="https://www.pngitem.com/pimgs/m/291-2918799_visa-mastercard-png-transparent-png.png" alt="Ödeme Yöntemleri" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;