export type IntentionType = 'Prosperity' | 'Love' | 'Protection' | 'Clarity' | 'Calm' | 'Balance';

export type CategoryType = 'Raw Crystals' | 'Polished Stones' | 'Pyrite' | 'Jewelry' | 'Vastu' | 'Gifts';

export type StoneType = 
  | 'Pyrite' 
  | 'Amethyst' 
  | 'Rose Quartz' 
  | 'Clear Quartz' 
  | 'Citrine' 
  | 'Black Tourmaline' 
  | 'Tiger Eye' 
  | 'Green Aventurine' 
  | 'Selenite' 
  | 'Labradorite'
  | 'Carnelian'
  | 'Lapis Lazuli'
  | 'Fluorite';

export interface StoneInfoDetails {
  origin: string;
  composition: string;
  appearance: string;
  traditionalAssociations: string;
  care: string;
  sizeWeight: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  category: CategoryType;
  intention: IntentionType;
  stoneType: StoneType;
  images: {
    primary: string;
    secondary: string;
    gallery: string[];
  };
  badges?: ('Best Seller' | 'New' | 'Low Stock' | 'Ethically Sourced')[];
  description: string;
  stoneInfo: StoneInfoDetails;
  inStock: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: string;
  intention: string;
  stoneType: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating';
}

export interface QuizQuestion {
  id: number;
  stepName: string;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description?: string;
    value: string;
    iconName?: string;
  }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  productName: string;
  rating: number;
  verified: boolean;
  avatar?: string;
}
