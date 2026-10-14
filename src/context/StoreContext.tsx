'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: { productName: string; quantity: number; price: number }[];
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  paymentMethod: string;
}

export interface SiteSettings {
  heroBadge: string;
  heroTitle: string;
  heroTitleItalic: string;
  heroSubtitle: string;
  announcementText: string;
  whatsappNumber: string;
  conciergeEmail: string;
}

interface StoreContextType {
  products: Product[];
  categories: string[];
  orders: Order[];
  settings: SiteSettings;
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  resetToDefault: () => void;
}

const DEFAULT_SETTINGS: SiteSettings = {
  heroBadge: 'Pyrite, Pyramids & Healing Bracelets',
  heroTitle: 'Natural Stones,',
  heroTitleItalic: 'Illuminate Your Path, Naturally.',
  heroSubtitle: 'Quiet luxury meets mindful living. Discover authentic pyrite clusters, crystal pyramids, Vastu sun frames, and hand-strung gemstone bracelets curated for conscious Indian spaces.',
  announcementText: 'USE CODE HEALING10 FOR 10% OFF YOUR FIRST SPECIMEN',
  whatsappNumber: '+919737264428',
  conciergeEmail: 'care@healingcrystals.in',
};

const DEFAULT_CATEGORIES = ['Pyrite', 'Raw Crystals', 'Polished Stones', 'Vastu', 'Jewelry'];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9821',
    customerName: 'Ananya Sharma',
    email: 'ananya.s@gmail.com',
    phone: '+91 98123 45678',
    address: 'Apt 402, Lotus Towers, Bandra West, Mumbai 400050',
    items: [
      { productName: 'Natural Pyrite Cluster', quantity: 1, price: 1299 },
      { productName: 'Golden Pyrite Abundance Bracelet', quantity: 1, price: 999 },
    ],
    totalAmount: 2298,
    status: 'Delivered',
    date: '2026-10-05',
    paymentMethod: 'Razorpay UPI',
  },
  {
    id: 'ORD-9822',
    customerName: 'Rohan Mehta',
    email: 'rohan.m@techcorp.in',
    phone: '+91 97890 12345',
    address: 'Plot 12, Jubilee Hills, Hyderabad 500033',
    items: [{ productName: 'Raw Uruguayan Amethyst Cluster', quantity: 2, price: 1798 }],
    totalAmount: 1798,
    status: 'Processing',
    date: '2026-10-07',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-9823',
    customerName: 'Priyanka Patel',
    email: 'priyanka.p@yahoo.com',
    phone: '+91 99012 34567',
    address: 'Villa 4, Koregaon Park, Pune 411001',
    items: [{ productName: 'Vastu Pyrite 7-Horse Sun Frame', quantity: 1, price: 2499 }],
    totalAmount: 2499,
    status: 'Pending',
    date: '2026-10-08',
    paymentMethod: 'Cash on Delivery',
  },
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate from localStorage on client load
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedProducts = localStorage.getItem('healing_products');
      if (savedProducts && savedProducts.trim() !== '') {
        setProducts(JSON.parse(savedProducts));
      }

      const savedCategories = localStorage.getItem('healing_categories');
      if (savedCategories && savedCategories.trim() !== '') {
        setCategories(JSON.parse(savedCategories));
      }

      const savedSettings = localStorage.getItem('healing_settings');
      if (savedSettings && savedSettings.trim() !== '') {
        setSettings(JSON.parse(savedSettings));
      }

      const savedOrders = localStorage.getItem('healing_orders');
      if (savedOrders && savedOrders.trim() !== '') {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (e) {
      console.error('Error hydrating store state:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync products to localStorage
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    if (typeof window !== 'undefined') {
      localStorage.setItem('healing_products', JSON.stringify(newProducts));
    }
  };

  // Sync categories to localStorage
  const saveCategories = (newCategories: string[]) => {
    setCategories(newCategories);
    if (typeof window !== 'undefined') {
      localStorage.setItem('healing_categories', JSON.stringify(newCategories));
    }
  };

  // Sync settings to localStorage
  const saveSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('healing_settings', JSON.stringify(newSettings));
    }
  };

  // Sync orders to localStorage
  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    if (typeof window !== 'undefined') {
      localStorage.setItem('healing_orders', JSON.stringify(newOrders));
    }
  };

  // Add Product
  const addProduct = (productData: Omit<Product, 'id' | 'slug'>) => {
    const slug = productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const id = `specimen-${Date.now()}`;

    const newProduct: Product = {
      ...productData,
      id,
      slug,
    };

    saveProducts([newProduct, ...products]);
  };

  // Update Product
  const updateProduct = (updatedProduct: Product) => {
    const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    saveProducts(updated);
  };

  // Delete Product
  const deleteProduct = (id: string) => {
    const filtered = products.filter((p) => p.id !== id);
    saveProducts(filtered);
  };

  // Add Category
  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      saveCategories([...categories, category]);
    }
  };

  // Delete Category
  const deleteCategory = (category: string) => {
    saveCategories(categories.filter((c) => c !== category));
  };

  // Update Site Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    saveSettings({ ...settings, ...newSettings });
  };

  // Update Order Status
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    saveOrders(updated);
  };

  // Reset Store State to Defaults
  const resetToDefault = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('healing_products');
      localStorage.removeItem('healing_categories');
      localStorage.removeItem('healing_settings');
      localStorage.removeItem('healing_orders');
    }
    setProducts(PRODUCTS);
    setCategories(DEFAULT_CATEGORIES);
    setSettings(DEFAULT_SETTINGS);
    setOrders(INITIAL_ORDERS);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        orders,
        settings,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        deleteCategory,
        updateSettings,
        updateOrderStatus,
        resetToDefault,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
