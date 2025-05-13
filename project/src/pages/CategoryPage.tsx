import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import { SlidersHorizontal, ChevronDown, Check } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const products = getProductsByCategory(category || '');
  
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Beyaz', code: '#FFFFFF' },
    { name: 'Siyah', code: '#000000' },
    { name: 'Mavi', code: '#0000FF' },
    { name: 'Kırmızı', code: '#FF0000' },
    { name: 'Yeşil', code: '#008000' },
  ];
  
  const getCategoryTitle = (categorySlug: string) => {
    switch (categorySlug) {
      case 'erkek-giyim':
        return 'Erkek Giyim';
      case 'kadin-giyim':
        return 'Kadın Giyim';
      case 'elektronik-aksesuarlar':
        return 'Elektronik Aksesuarlar';
      case 'ayakkabi':
        return 'Ayakkabı';
      default:
        return 'Ürünler';
    }
  };
  
  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  
  const toggleColor = (colorCode: string) => {
    if (selectedColors.includes(colorCode)) {
      setSelectedColors(selectedColors.filter(c => c !== colorCode));
    } else {
      setSelectedColors([...selectedColors, colorCode]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 mt-16">
      <h1 className="text-3xl font-bold text-center mb-10">{getCategoryTitle(category || '')}</h1>
      
      {/* Filters and Sorting Bar */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <button 
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-dark transition-colors"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filtreler</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <label className="text-gray-600 mr-2">Sırala:</label>
          <select 
            className="border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">En Yeniler</option>
            <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
            <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
            <option value="rating">En Yüksek Puanlı</option>
          </select>
        </div>
      </div>
      
      {/* Expanded Filters */}
      {showFilters && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-4">Fiyat Aralığı</h3>
            <div className="px-2">
              <div className="flex justify-between mb-2">
                <span>{priceRange[0]}₺</span>
                <span>{priceRange[1]}₺</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="2000" 
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
          
          {/* Sizes */}
          <div>
            <h3 className="font-semibold mb-4">Bedenler</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 border rounded-md ${
                    selectedSizes.includes(size)
                      ? 'bg-primary-light border-primary-dark text-primary-dark'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Colors */}
          <div>
            <h3 className="font-semibold mb-4">Renkler</h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color.code}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                    selectedColors.includes(color.code) ? 'border-primary-dark p-0.5' : 'border-transparent'
                  }`}
                  onClick={() => toggleColor(color.code)}
                  title={color.name}
                >
                  <span 
                    className="w-full h-full rounded-full relative"
                    style={{ backgroundColor: color.code }}
                  >
                    {selectedColors.includes(color.code) && (
                      <Check 
                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${
                          color.code === '#FFFFFF' ? 'text-black' : 'text-white'
                        }`} 
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Bu kategoride ürün bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;