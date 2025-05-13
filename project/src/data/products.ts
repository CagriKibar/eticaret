import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 1,
    name: "Slim Fit Erkek T-Shirt",
    slug: "slim-fit-erkek-t-shirt",
    description: "Yüksek kaliteli pamuktan üretilmiş, rahat kesimli casual erkek t-shirt. Günlük kullanıma uygun şık tasarım.",
    price: 299.99,
    discountPrice: 199.99,
    images: [
      "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "erkek-giyim",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Beyaz", code: "#FFFFFF" },
      { name: "Siyah", code: "#000000" },
      { name: "Mavi", code: "#0000FF" }
    ],
    stock: 50,
    rating: 4.5,
    reviewCount: 124,
    isNew: true,
    isPopular: true,
    relatedProducts: [2, 5, 9]
  },
  {
    id: 2,
    name: "Düğmeli Casual Erkek Gömlek",
    slug: "dugmeli-casual-erkek-gomlek",
    description: "Şık detayları ve modern kesimiyle her ortama uyum sağlayan erkek gömleği. %100 pamuk kumaştan üretilmiştir.",
    price: 599.99,
    discountPrice: 449.99,
    images: [
      "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "erkek-giyim",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Beyaz", code: "#FFFFFF" },
      { name: "Açık Mavi", code: "#ADD8E6" },
      { name: "Siyah", code: "#000000" }
    ],
    stock: 35,
    rating: 4.7,
    reviewCount: 89,
    isPopular: true,
    relatedProducts: [1, 8, 12]
  },
  {
    id: 3,
    name: "Vintage Kadın Bluz",
    slug: "vintage-kadin-bluz",
    description: "Vintage tasarımlı, şık detaylara sahip, konforlu kadın bluzu. Özel günlerde ve günlük kullanımda rahatlıkla tercih edebilirsiniz.",
    price: 399.99,
    discountPrice: 299.99,
    images: [
      "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "kadin-giyim",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Beyaz", code: "#FFFFFF" },
      { name: "Bej", code: "#F5F5DC" },
      { name: "Açık Pembe", code: "#FFC0CB" }
    ],
    stock: 25,
    rating: 4.8,
    reviewCount: 156,
    isNew: true,
    isPopular: true,
    relatedProducts: [4, 10, 14]
  },
  {
    id: 4,
    name: "Yüksek Bel Kadın Jean",
    slug: "yuksek-bel-kadin-jean",
    description: "Yüksek bel kesimi ile şık ve modern görünüm sunan jean pantolon. Esnek kumaş yapısı sayesinde gün boyu rahatlık sağlar.",
    price: 699.99,
    discountPrice: 549.99,
    images: [
      "https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "kadin-giyim",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Mavi", code: "#0000FF" },
      { name: "Siyah", code: "#000000" }
    ],
    stock: 40,
    rating: 4.6,
    reviewCount: 112,
    isPopular: true,
    relatedProducts: [3, 7, 11]
  },
  {
    id: 5,
    name: "Wireless Bluetooth Kulaklık",
    slug: "wireless-bluetooth-kulaklik",
    description: "En son teknoloji ile üretilmiş, uzun pil ömrüne sahip, yüksek ses kalitesi sunan kulak üstü bluetooth kulaklık.",
    price: 1299.99,
    discountPrice: 999.99,
    images: [
      "https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "elektronik-aksesuarlar",
    colors: [
      { name: "Siyah", code: "#000000" },
      { name: "Beyaz", code: "#FFFFFF" },
      { name: "Gri", code: "#808080" }
    ],
    stock: 15,
    rating: 4.9,
    reviewCount: 203,
    isNew: true,
    isPopular: true,
    relatedProducts: [6, 13, 15]
  },
  {
    id: 6,
    name: "Akıllı Saat",
    slug: "akilli-saat",
    description: "Şık tasarımı ve çok yönlü özellikleriyle günlük hayatınızı kolaylaştıran akıllı saat. Fitness takibi, mesaj bildirimleri ve çok daha fazlası.",
    price: 1799.99,
    discountPrice: 1499.99,
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "elektronik-aksesuarlar",
    colors: [
      { name: "Siyah", code: "#000000" },
      { name: "Gümüş", code: "#C0C0C0" },
      { name: "Altın", code: "#FFD700" }
    ],
    stock: 20,
    rating: 4.7,
    reviewCount: 175,
    isNew: true,
    isPopular: true,
    relatedProducts: [5, 13, 15]
  },
  {
    id: 7,
    name: "Spor Ayakkabı",
    slug: "spor-ayakkabi",
    description: "Hafif ve dayanıklı yapısı ile spor yaparken maksimum konfor sunan, şık tasarımlı spor ayakkabı.",
    price: 1499.99,
    discountPrice: 1199.99,
    images: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "ayakkabi",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: [
      { name: "Siyah", code: "#000000" },
      { name: "Beyaz", code: "#FFFFFF" },
      { name: "Kırmızı", code: "#FF0000" }
    ],
    stock: 30,
    rating: 4.8,
    reviewCount: 218,
    isPopular: true,
    relatedProducts: [8, 16]
  },
  {
    id: 8,
    name: "Klasik Deri Ayakkabı",
    slug: "klasik-deri-ayakkabi",
    description: "Gerçek deri yapısı ve klasik tasarımıyla hem resmi hem de şık ortamlarda kullanabileceğiniz erkek ayakkabısı.",
    price: 1899.99,
    discountPrice: 1599.99,
    images: [
      "https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "ayakkabi",
    sizes: [39, 40, 41, 42, 43, 44],
    colors: [
      { name: "Siyah", code: "#000000" },
      { name: "Kahverengi", code: "#8B4513" }
    ],
    stock: 25,
    rating: 4.6,
    reviewCount: 142,
    isPopular: true,
    relatedProducts: [7, 16]
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getRelatedProducts = (productId: number): Product[] => {
  const product = getProductById(productId);
  if (!product || !product.relatedProducts) {
    return [];
  }
  
  return product.relatedProducts
    .map((id) => getProductById(id))
    .filter((p): p is Product => p !== undefined);
};

export const getNewProducts = (): Product[] => {
  return products.filter((product) => product.isNew);
};

export const getPopularProducts = (): Product[] => {
  return products.filter((product) => product.isPopular);
};