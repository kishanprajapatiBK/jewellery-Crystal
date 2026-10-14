'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/context/ToastContext';

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('auraa_wishlist');
      if (saved && saved.trim() !== '') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setWishlist(parsed.filter((id) => typeof id === 'string'));
        }
      }
    } catch (e) {
      console.error('Error loading wishlist from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized || typeof window === 'undefined') return;
    try {
      localStorage.setItem('auraa_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist to localStorage', e);
    }
  }, [wishlist, isInitialized]);

  const toggleWishlist = (productId: string) => {
    if (!productId) return;
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed stone from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved stone to wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    if (!productId) return false;
    return wishlist.includes(productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
