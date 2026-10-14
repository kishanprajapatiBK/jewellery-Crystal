'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { useToast } from '@/context/ToastContext';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  appliedCoupon: string | null;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const { showToast } = useToast();

  // Load cart from localStorage safely
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('auraa_cart');
      if (saved && saved.trim() !== '') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCart(
            parsed.filter((item) => item && item.product && typeof item.product.price === 'number')
          );
        }
      }
      const savedCoupon = localStorage.getItem('auraa_coupon');
      if (savedCoupon && savedCoupon.trim() !== '') {
        setAppliedCoupon(savedCoupon);
        setCouponDiscountPercent(10);
      }
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage safely
  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    try {
      localStorage.setItem('auraa_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Product, quantity = 1) => {
    if (!product || !product.id) return;
    setCart((prev) => {
      const existing = prev.find((item) => item && item.product && item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item && item.product && item.product.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your cart`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    if (!productId) return;
    setCart((prev) => prev.filter((item) => item && item.product && item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (!productId) return;
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item && item.product && item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscountPercent(0);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('auraa_coupon');
      } catch (e) {}
    }
  };

  const applyCoupon = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'AURAA10' || trimmed === 'WELCOME10') {
      setAppliedCoupon(trimmed);
      setCouponDiscountPercent(10);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('auraa_coupon', trimmed);
        } catch (e) {}
      }
      showToast('Coupon applied! 10% discount added', 'success');
      return true;
    } else {
      showToast('Invalid coupon code. Try "AURAA10"', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscountPercent(0);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('auraa_coupon');
      } catch (e) {}
    }
    showToast('Coupon removed', 'info');
  };

  const totalItems = cart.reduce((sum, item) => sum + (item?.quantity || 0), 0);

  const subtotal = cart.reduce((sum, item) => {
    if (item && item.product && typeof item.product.price === 'number') {
      return sum + item.product.price * (item.quantity || 1);
    }
    return sum;
  }, 0);

  const freeShippingThreshold = 999;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const couponDiscount = Math.round((subtotal * couponDiscountPercent) / 100);
  const total = Math.max(0, subtotal - couponDiscount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingFee,
        freeShippingThreshold,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
