import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductGrid from '../components/products/ProductGrid';
import { motion } from 'framer-motion';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(Number(id));
  const { addToCart } = useShoppingCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const relatedProducts = getRelatedProducts(Number(id));
  const inWishlist = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 mt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Ürün bulunamadı</h2>
          <p className="mt-4">İstediğiniz ürün mevcut değil veya kaldırılmış olabilir.</p>
          <Link to="/" className="mt-6 inline-block bg-primary-dark text-white font-semibold py-2 px-4 rounded">
            Anasayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Here you could add a notification/toast
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div>
          <div className="relative overflow-hidden rounded-lg bg-white shadow-lg mb-4 aspect-square">
            <motion.img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={selectedImage}
            />
          </div>
          
          {/* Image Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`rounded-md overflow-hidden border-2 ${
                    index === selectedImage ? 'border-primary-dark' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Görsel ${index + 1}`}
                    className="w-full h-20 object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviewCount} Değerlendirme)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            {product.discountPrice ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold text-primary-dark">{product.discountPrice.toLocaleString('tr-TR')} ₺</span>
                <span className="ml-3 text-lg line-through text-gray-500">{product.price.toLocaleString('tr-TR')} ₺</span>
                <span className="ml-3 bg-accent text-white text-sm font-bold px-2 py-1 rounded">
                  %{Math.round(((product.price - product.discountPrice) / product.price) * 100)} İndirim
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-primary-dark">{product.price.toLocaleString('tr-TR')} ₺</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Stock Status */}
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? 'Stokta Var' : 'Stokta Yok'}
            </span>
            {product.stock > 0 && product.stock <= 10 && (
              <span className="ml-2 text-sm text-red-600 font-semibold">
                Son {product.stock} ürün!
              </span>
            )}
          </div>

          {/* Options - Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Beden:</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.toString()}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedSize === size
                        ? 'border-primary-dark bg-primary-light text-primary-dark'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Options - Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Renk:</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.code}
                    onClick={() => setSelectedColor(color.code)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                      selectedColor === color.code ? 'border-primary-dark p-1' : 'border-transparent'
                    }`}
                    title={color.name}
                  >
                    <span 
                      className="w-full h-full rounded-full block" 
                      style={{ backgroundColor: color.code }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Adet:</h3>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-10 h-10 rounded-l-md bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-14 h-10 text-center border-y border-gray-200 focus:outline-none"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-10 h-10 rounded-r-md bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary-dark hover:bg-primary text-white font-bold py-3 px-6 rounded-md transition-colors flex items-center justify-center"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Stokta Yok' : 'Sepete Ekle'}
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`w-12 h-12 rounded-md flex items-center justify-center ${
                inWishlist 
                  ? 'bg-red-50 text-red-500 border border-red-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart className={inWishlist ? 'fill-current' : ''} size={20} />
            </button>
            <button
              className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
            >
              <Share2 size={20} />
            </button>
          </div>

          {/* Features */}
          <div className="space-y-3 border-t border-gray-200 pt-6">
            <div className="flex items-start">
              <Truck className="h-5 w-5 text-primary-dark mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Hızlı Teslimat</p>
                <p className="text-sm text-gray-500">2-4 iş günü içinde kargoya verilir</p>
              </div>
            </div>
            <div className="flex items-start">
              <ShieldCheck className="h-5 w-5 text-primary-dark mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Güvenli Alışveriş</p>
                <p className="text-sm text-gray-500">SSL sertifikalı güvenli ödeme</p>
              </div>
            </div>
            <div className="flex items-start">
              <RotateCcw className="h-5 w-5 text-primary-dark mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Kolay İade</p>
                <p className="text-sm text-gray-500">30 gün içerisinde ücretsiz iade</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Benzer Ürünler</h2>
        <ProductGrid products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;