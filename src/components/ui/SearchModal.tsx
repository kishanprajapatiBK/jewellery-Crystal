'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.intention.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.stoneType.toLowerCase().includes(query.toLowerCase())
      );

  const recentSearches = ['Pyrite Cluster', 'Amethyst', 'Rose Quartz', 'Clear Quartz', 'Vastu Shield', 'Black Tourmaline'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-auraa-bg w-full max-w-3xl rounded-xl shadow-modal overflow-hidden border border-auraa-border z-10 animate-fadeIn">
        {/* Search Header */}
        <div className="p-4 sm:p-6 border-b border-auraa-border flex items-center gap-3">
          <Search className="w-5 h-5 text-auraa-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by stone name, intention (e.g. Prosperity, Calm), or category..."
            className="flex-1 bg-transparent text-base sm:text-lg text-auraa-charcoal placeholder-auraa-muted focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-auraa-muted hover:text-auraa-charcoal px-2 py-1 uppercase tracking-wider"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-auraa-charcoal hover:text-auraa-gold transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
          {query.trim() === '' ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-auraa-muted mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-auraa-gold" /> Recent Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs bg-auraa-surface hover:bg-auraa-sand text-auraa-charcoal px-3 py-1.5 rounded-full border border-auraa-border transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-auraa-muted mb-3">
                  Shop by Intention
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Prosperity', 'Love', 'Protection', 'Clarity', 'Calm', 'Balance'].map((intention) => (
                    <Link
                      key={intention}
                      href={`/shop?intention=${intention}`}
                      onClick={onClose}
                      className="p-3 bg-white hover:bg-auraa-surface rounded-lg border border-auraa-border flex items-center justify-between text-xs font-medium text-auraa-charcoal transition-colors group"
                    >
                      <span>{intention}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-auraa-muted group-hover:text-auraa-gold group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div>
              <p className="text-xs text-auraa-muted uppercase tracking-wider mb-4">
                Found {filteredProducts.length} matching products
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-lg bg-white border border-auraa-border hover:border-auraa-gold/60 transition-all hover:shadow-soft group"
                  >
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-auraa-surface flex-shrink-0">
                      <Image
                        src={product.images.primary}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-medium text-auraa-charcoal truncate group-hover:text-auraa-gold transition-colors">
                        {product.name}
                      </h5>
                      <p className="text-xs text-auraa-muted capitalize">{product.intention} • {product.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold text-auraa-charcoal">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-auraa-muted line-through">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-3">
              <p className="text-base text-auraa-charcoal font-serif">No stones found matching "{query}"</p>
              <p className="text-xs text-auraa-muted">Try searching by stone type like Pyrite, Amethyst, or Rose Quartz.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-auraa-surface border-t border-auraa-border text-center">
          <Link
            href="/shop"
            onClick={onClose}
            className="text-xs font-semibold tracking-widest uppercase text-auraa-gold hover:text-auraa-goldHover transition-colors inline-flex items-center gap-1.5"
          >
            Explore All 156 Products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
