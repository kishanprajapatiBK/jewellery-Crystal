'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import SearchModal from '@/components/ui/SearchModal';
import ProductCard from '@/components/shop/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { useWishlist } from '@/context/WishlistContext';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { wishlist } = useWishlist();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-auraa-bg flex flex-col font-sans">
      <AnnouncementBar />
      <Header onOpenSearch={() => setSearchOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="border-b border-auraa-border pb-6 mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-auraa-gold block mb-1">
              Your Curated Favourites
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-auraa-charcoal">
              Saved Wishlist ({savedProducts.length})
            </h1>
          </div>
        </div>

        {savedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-auraa-border p-8 space-y-4 max-w-lg mx-auto">
            <Heart className="w-12 h-12 text-auraa-muted mx-auto" />
            <h2 className="font-serif text-2xl text-auraa-charcoal">No stones saved to your wishlist yet</h2>
            <p className="text-xs text-auraa-muted">Browse our collection and tap the heart icon on any stone to save it for later.</p>
            <Link
              href="/shop"
              className="inline-block bg-auraa-charcoal text-white text-xs font-semibold uppercase tracking-widest px-8 py-3.5 rounded hover:bg-black transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {savedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
      <WhatsAppButton />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
