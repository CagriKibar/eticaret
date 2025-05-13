import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../types/product';
import { useWishlist } from '../../context/WishlistContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const hasDiscount = product.discountPrice !== undefined;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg bg-white shadow-card hover:shadow-hover transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <Link to={`/urun/${product.id}`} className="block">
        <div className="relative overflow-hidden pb-[120%]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Product badge */}
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-primary-dark text-white text-xs font-bold px-2 py-1 rounded">
              YENİ
            </div>
          )}
          
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
              %{discountPercentage} İNDİRİM
            </div>
          )}
          
          {/* Wishlist button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:bg-white"
          >
            <Heart
              className={`h-5 w-5 ${inWishlist ? 'fill-accent text-accent' : 'text-gray-600'}`}
            />
          </button>
          
          {/* Quick shop overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
              <button className="bg-white text-primary-dark font-semibold py-2 px-4 rounded-md hover:bg-primary-light transition-colors">
                Hızlı Bakış
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 line-clamp-1 mb-1">{product.name}</h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          
          <div className="flex items-center">
            {hasDiscount ? (
              <>
                <span className="font-bold text-gray-900">{product.discountPrice.toLocaleString('tr-TR')} ₺</span>
                <span className="ml-2 text-sm line-through text-gray-500">{product.price.toLocaleString('tr-TR')} ₺</span>
              </>
            ) : (
              <span className="font-bold text-gray-900">{product.price.toLocaleString('tr-TR')} ₺</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;