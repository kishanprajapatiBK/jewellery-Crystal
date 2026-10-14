'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, ShoppingBag, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-auraa-bg w-full max-w-3xl rounded-xl shadow-modal overflow-hidden border border-auraa-border z-10 animate-fadeIn my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-auraa-charcoal hover:text-auraa-gold bg-white/80 backdrop-blur-xs rounded-full border border-auraa-border transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Preview */}
          <div className="relative h-72 md:h-full min-h-[320px] bg-auraa-surface">
            <Image
              src={product.images.primary}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.badges && product.badges.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.badges.map((badge) => (
                  <span
                    key={badge}
                    className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded ${
                      badge === 'Best Seller'
                        ? 'bg-auraa-charcoal text-auraa-gold'
                        : badge === 'New'
                        ? 'bg-auraa-gold text-white'
                        : 'bg-auraa-sage text-white'
                    }`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Details Content */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-auraa-gold font-semibold mb-1">
                <span>{product.intention}</span>
                <span>•</span>
                <span>{product.category}</span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-auraa-charcoal mb-2">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-auraa-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-auraa-gold text-auraa-gold'
                          : 'text-auraa-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-auraa-charcoal">{product.rating}</span>
                <span className="text-xs text-auraa-muted">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-serif font-medium text-auraa-charcoal">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-auraa-muted line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.compareAtPrice && (
                  <span className="text-xs font-semibold text-auraa-terracotta bg-auraa-terracotta/10 px-2 py-0.5 rounded">
                    Save ₹{(product.compareAtPrice - product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs text-auraa-muted line-clamp-3 leading-relaxed mb-6 font-sans">
                {product.description}
              </p>

              {/* Origin Quick Specs */}
              <div className="bg-auraa-surface p-3 rounded-lg text-xs space-y-1 text-auraa-charcoal mb-6 border border-auraa-border">
                <div className="flex justify-between">
                  <span className="text-auraa-muted">Ethical Origin:</span>
                  <span className="font-medium">{product.stoneInfo.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-auraa-muted">Approx Size:</span>
                  <span className="font-medium">{product.stoneInfo.sizeWeight.split('|')[0]}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border border-auraa-border rounded bg-white h-11">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 text-auraa-charcoal hover:bg-auraa-surface h-full"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-semibold text-auraa-charcoal">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 text-auraa-charcoal hover:bg-auraa-surface h-full"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-auraa-charcoal hover:bg-black text-auraa-bg h-11 px-4 rounded text-xs uppercase font-semibold tracking-widest flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded border transition-colors h-11 flex items-center justify-center ${
                    isLiked
                      ? 'border-auraa-terracotta text-auraa-terracotta bg-auraa-terracotta/5'
                      : 'border-auraa-border text-auraa-charcoal hover:border-auraa-gold'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-auraa-terracotta' : ''}`} />
                </button>
              </div>

              {/* Full details link */}
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="w-full text-center block text-xs uppercase font-semibold tracking-widest text-auraa-gold hover:text-auraa-goldHover pt-1 transition-colors"
              >
                View Complete Product Details & Stone Guide →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
