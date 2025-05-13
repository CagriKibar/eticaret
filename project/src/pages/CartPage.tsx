import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, ChevronLeft, ArrowRight } from 'lucide-react';
import { useShoppingCart } from '../context/ShoppingCartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useShoppingCart();
  
  const freeShippingThreshold = 300;
  const shippingCost = getCartTotal() >= freeShippingThreshold ? 0 : 29.99;
  const amountToFreeShipping = freeShippingThreshold - getCartTotal();
  
  return (
    <div className="container mx-auto px-4 py-12 mt-16">
      <h1 className="text-3xl font-bold text-center mb-10">Alışveriş Sepeti</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Sepetiniz Boş</h2>
          <p className="text-gray-600 mb-6">Sepetinizde henüz ürün bulunmamaktadır.</p>
          <Link
            to="/"
            className="inline-block bg-primary-dark hover:bg-primary text-white font-bold py-3 px-6 rounded-md transition-colors"
          >
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Ürünler ({cartItems.length})</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.product.id} className="p-6 flex flex-col sm:flex-row">
                  <div className="sm:mr-6 mb-4 sm:mb-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover object-center rounded-md"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <Link to={`/urun/${item.product.id}`} className="font-semibold text-lg hover:text-primary-dark transition-colors">
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {item.product.sizes && item.product.sizes.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Beden:</span> M
                      </p>
                    )}
                    
                    {item.product.colors && item.product.colors.length > 0 && (
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-600 font-medium mr-2">Renk:</span>
                        <span 
                          className="w-4 h-4 rounded-full inline-block border border-gray-300"
                          style={{ backgroundColor: item.product.colors[0].code }}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        {item.product.discountPrice ? (
                          <>
                            <span className="font-bold text-lg">
                              {(item.product.discountPrice * item.quantity).toLocaleString('tr-TR')} ₺
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              {(item.product.price * item.quantity).toLocaleString('tr-TR')} ₺
                            </span>
                          </>
                        ) : (
                          <span className="font-bold text-lg">
                            {(item.product.price * item.quantity).toLocaleString('tr-TR')} ₺
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <Link
                to="/"
                className="inline-flex items-center text-primary-dark hover:underline"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Alışverişe Devam Et
              </Link>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-fit">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Sipariş Özeti</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Ara Toplam</span>
                <span className="font-semibold">{getCartTotal().toLocaleString('tr-TR')} ₺</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Kargo</span>
                <span className="font-semibold">
                  {shippingCost === 0 ? 'Ücretsiz' : `${shippingCost.toLocaleString('tr-TR')} ₺`}
                </span>
              </div>
              
              {amountToFreeShipping > 0 && (
                <div className="bg-primary-light p-3 rounded-md text-sm">
                  <p className="text-primary-dark">
                    <strong>{amountToFreeShipping.toLocaleString('tr-TR')} ₺</strong> daha ekleyin, ücretsiz kargo fırsatını kaçırmayın!
                  </p>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between font-bold text-lg">
                  <span>Toplam</span>
                  <span>{(getCartTotal() + shippingCost).toLocaleString('tr-TR')} ₺</span>
                </div>
              </div>
              
              <Link
                to="/odeme"
                className="w-full bg-primary-dark hover:bg-primary text-white font-bold py-3 px-6 rounded-md transition-colors flex items-center justify-center mt-6"
              >
                Ödemeye Geç
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="mb-4">
                <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                  İndirim Kuponu
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="coupon"
                    className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                    placeholder="Kupon Kodu"
                  />
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-r-md transition-colors">
                    Uygula
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;