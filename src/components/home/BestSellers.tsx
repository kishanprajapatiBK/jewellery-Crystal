'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/shop/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { Product } from '@/types';

export default function BestSellers() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { products } = useStore();

  const bestSellers = products.filter((p) => p.isFeatured || p.badges?.includes('Best Seller')).slice(0, 8);

  return (
    <section className="py-20 bg-auraa-bg border-t border-auraa-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-auraa-border pb-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-auraa-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Most Loved Specimens
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-auraa-charcoal">
              Best Selling Natural Stones
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold uppercase tracking-widest text-auraa-gold hover:text-auraa-goldHover transition-colors inline-flex items-center gap-1.5"
          >
            Shop Full Catalog ({products.length}) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
