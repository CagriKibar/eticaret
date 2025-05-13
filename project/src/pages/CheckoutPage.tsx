import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { CheckCircle } from 'lucide-react';

type CardType = 'visa' | 'mastercard' | 'troy' | 'amex' | 'unknown';

type PaymentInfo = {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  installments: string;
};

const CheckoutPage: React.FC = () => {
  const { cartItems, getCartTotal } = useShoppingCart();
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: '',
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    installments: '1',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [useAsBilling, setUseAsBilling] = useState(true);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const freeShippingThreshold = 300;
  const shippingCost = getCartTotal() >= freeShippingThreshold ? 0 : 29.99;
  const total = getCartTotal() + shippingCost;
  
  const detectCardType = (cardNumber: string): CardType => {
    // Basic card type detection based on first digits
    const cleaned = cardNumber.replace(/\D/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^9792/.test(cleaned)) return 'troy';
    if (/^3[47]/.test(cleaned)) return 'amex';
    return 'unknown';
  };
  
  const cardType = detectCardType(paymentInfo.cardNumber);
  
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = '';
    
    for (let i = 0; i < cleaned.length; i += 4) {
      formatted += cleaned.slice(i, i + 4) + ' ';
    }
    
    return formatted.trim();
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setPaymentInfo({
      ...paymentInfo,
      cardNumber: formatCardNumber(value),
    });
  };
  
  const handleExpiryMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      expiryMonth: e.target.value,
    });
  };
  
  const handleExpiryYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      expiryYear: e.target.value,
    });
  };
  
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setPaymentInfo({
      ...paymentInfo,
      cvv: value,
    });
  };
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
    }, 1500);
    window.scrollTo(0, 0);
  };
  
  // Generate months and years for expiry date
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());
  
  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-12 mt-16">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Siparişiniz Tamamlandı!</h1>
          <p className="text-gray-600 mb-6">
            Siparişiniz başarıyla alındı. Sipariş onayı e-posta adresinize gönderildi.
          </p>
          <p className="font-semibold mb-4">Sipariş Numarası: #38291</p>
          <Link
            to="/"
            className="inline-block bg-primary-dark hover:bg-primary text-white font-bold py-3 px-6 rounded-md transition-colors"
          >
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 mt-16">
      <h1 className="text-3xl font-bold text-center mb-10">Ödeme</h1>
      
      {/* Checkout Steps */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step >= 1 ? 'bg-primary-dark text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`w-20 h-1 ${step >= 2 ? 'bg-primary-dark' : 'bg-gray-200'} mx-1`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-primary-dark text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
          <div className={`w-20 h-1 ${step >= 3 ? 'bg-primary-dark' : 'bg-gray-200'} mx-1`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step >= 3 ? 'bg-primary-dark text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            3
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Forms */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Teslimat Bilgileri</h2>
              </div>
              
              <form onSubmit={handleShippingSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Ad
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Soyad
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Adres
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      Şehir
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Posta Kodu
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-primary-dark focus:ring-primary-dark h-4 w-4"
                      checked={useAsBilling}
                      onChange={() => setUseAsBilling(!useAsBilling)}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Fatura bilgilerim teslimat bilgilerimle aynı
                    </span>
                  </label>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-primary-dark hover:bg-primary text-white font-bold py-2 px-6 rounded-md transition-colors"
                  >
                    Devam Et
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Ödeme Bilgileri</h2>
              </div>
              
              <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4">
                <div className="mb-4">
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="text-primary-dark focus:ring-primary-dark h-4 w-4"
                        checked={paymentMethod === 'credit-card'}
                        onChange={() => setPaymentMethod('credit-card')}
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Kredi Kartı / Banka Kartı
                      </span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="text-primary-dark focus:ring-primary-dark h-4 w-4"
                        checked={paymentMethod === 'cash-on-delivery'}
                        onChange={() => setPaymentMethod('cash-on-delivery')}
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Kapıda Ödeme
                      </span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="text-primary-dark focus:ring-primary-dark h-4 w-4"
                        checked={paymentMethod === 'bank-transfer'}
                        onChange={() => setPaymentMethod('bank-transfer')}
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Havale / EFT
                      </span>
                    </label>
                  </div>
                </div>
                
                {paymentMethod === 'credit-card' && (
                  <div className="space-y-4">
                    <div className="relative">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Kart Numarası
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                          value={paymentInfo.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                        {cardType !== 'unknown' && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <span className="font-bold text-sm text-gray-600">
                              {cardType.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                        Kart Üzerindeki İsim
                      </label>
                      <input
                        type="text"
                        id="cardHolder"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                        value={paymentInfo.cardHolder}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardHolder: e.target.value })}
                        placeholder="MEHMET YILMAZ"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Son Kullanma Tarihi
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                            value={paymentInfo.expiryMonth}
                            onChange={handleExpiryMonthChange}
                            required
                          >
                            <option value="">Ay</option>
                            {months.map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                            value={paymentInfo.expiryYear}
                            onChange={handleExpiryYearChange}
                            required
                          >
                            <option value="">Yıl</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                          value={paymentInfo.cvv}
                          onChange={handleCvvChange}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Taksit Seçenekleri
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                        value={paymentInfo.installments}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, installments: e.target.value })}
                      >
                        <option value="1">Tek Çekim</option>
                        <option value="3">3 Taksit</option>
                        <option value="6">6 Taksit</option>
                        <option value="9">9 Taksit</option>
                      </select>
                    </div>
                    
                    {/* Credit Card Preview */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-md bg-gradient-to-r from-blue-800 to-blue-600 p-6 text-white">
                      <div className="absolute top-6 right-6">
                        <div className="text-lg font-bold">
                          {cardType !== 'unknown' ? cardType.toUpperCase() : 'CARD'}
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <div className="text-lg font-mono tracking-wider">
                          {paymentInfo.cardNumber || '•••• •••• •••• ••••'}
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-2">
                        <div>
                          <div className="text-xs opacity-75">Kart Sahibi</div>
                          <div className="font-medium tracking-wider mt-1">
                            {paymentInfo.cardHolder || 'AD SOYAD'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs opacity-75">Son Kullanma</div>
                          <div className="font-medium tracking-wider mt-1">
                            {paymentInfo.expiryMonth || 'MM'}/{paymentInfo.expiryYear?.slice(-2) || 'YY'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'cash-on-delivery' && (
                  <div className="bg-yellow-50 p-4 rounded-md">
                    <p className="text-sm text-yellow-800">
                      Kapıda ödeme seçeneğinde, ürün tesliminde nakit veya kredi kartı ile ödeme yapabilirsiniz.
                      Kapıda ödeme ücreti: <span className="font-semibold">10.00 ₺</span>
                    </p>
                  </div>
                )}
                
                {paymentMethod === 'bank-transfer' && (
                  <div className="bg-blue-50 p-4 rounded-md">
                    <p className="text-sm text-blue-800 mb-2">
                      Aşağıdaki banka hesaplarımıza havale yapabilirsiniz. Ödemeniz onaylandıktan sonra ürününüz kargolanacaktır.
                    </p>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li>
                        <span className="font-semibold">Garanti Bankası:</span> TR12 3456 7890 1234 5678 90
                      </li>
                      <li>
                        <span className="font-semibold">İş Bankası:</span> TR98 7654 3210 9876 5432 10
                      </li>
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      window.scrollTo(0, 0);
                    }}
                    className="border border-gray-300 bg-white text-gray-700 font-semibold py-2 px-6 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Geri
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-dark hover:bg-primary text-white font-bold py-2 px-6 rounded-md transition-colors"
                  >
                    {paymentMethod === 'bank-transfer' ? 'Siparişi Tamamla' : 'Ödeme Yap'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Step 3: Processing */}
          {step === 3 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 border-4 border-primary-dark border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
                <h2 className="text-xl font-semibold mb-2">Siparişiniz İşleniyor</h2>
                <p className="text-gray-600">
                  Lütfen bekleyin, siparişiniz işleniyor. Bu işlem birkaç saniye sürebilir.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-fit">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Sipariş Özeti</h2>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Ürünler ({cartItems.length})</h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <div className="flex">
                      <span className="font-medium mr-1">{item.quantity}x</span>
                      <span className="text-gray-600">{item.product.name}</span>
                    </div>
                    <span className="font-semibold">
                      {((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString('tr-TR')} ₺
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ara Toplam</span>
                <span>{getCartTotal().toLocaleString('tr-TR')} ₺</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Kargo</span>
                <span>{shippingCost === 0 ? 'Ücretsiz' : `${shippingCost.toLocaleString('tr-TR')} ₺`}</span>
              </div>
              
              {paymentMethod === 'cash-on-delivery' && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kapıda Ödeme Ücreti</span>
                  <span>10.00 ₺</span>
                </div>
              )}
              
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 mt-2">
                <span>Toplam</span>
                <span>
                  {(total + (paymentMethod === 'cash-on-delivery' ? 10 : 0)).toLocaleString('tr-TR')} ₺
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              <p className="mb-2 font-medium">Alışveriş Güvenliği</p>
              <p className="mb-2">
                Tüm ödemeleriniz 128 bit SSL sertifikası ile güvence altına alınmıştır.
              </p>
              <div className="flex space-x-2 mt-3">
                <img src="https://www.pngitem.com/pimgs/m/291-2918799_visa-mastercard-png-transparent-png.png" alt="Güvenli Ödeme" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;