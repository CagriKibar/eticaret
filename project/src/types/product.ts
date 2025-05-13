export type ProductCategory = 
  | 'erkek-giyim' 
  | 'kadin-giyim' 
  | 'elektronik-aksesuarlar' 
  | 'ayakkabi';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | numeric;

type numeric = number;

export type ProductColor = {
  name: string;
  code: string;
};

export type ProductReview = {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  images?: string[];
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: ProductCategory;
  sizes?: ProductSize[];
  colors?: ProductColor[];
  stock: number;
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  isNew?: boolean;
  isPopular?: boolean;
  relatedProducts?: number[];
};