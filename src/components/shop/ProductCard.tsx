'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Image Container with Badges & Hover Swap */}
        <div className="relative aspect-square w-full bg-auraa-surface overflow-hidden rounded-t-2xl">
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            <Image
              src={isHovered && product.images.secondary ? product.images.secondary : product.images.primary}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-108"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </Link>

          {/* Badges */}
          {product.badges && product.badges.length > 0 && (
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className={`text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md shadow-xs backdrop-blur-md ${
                    badge === 'Best Seller'
                      ? 'bg-auraa-charcoal/90 text-auraa-gold border border-auraa-gold/30'
                      : badge === 'New'
                      ? 'bg-auraa-gold/90 text-white border border-white/20'
                      : 'bg-auraa-sage/90 text-white border border-white/20'
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all ${
              isLiked
                ? 'bg-white text-auraa-terracotta shadow-md scale-110'
                : 'bg-white/80 text-auraa-charcoal hover:bg-white hover:text-auraa-terracotta hover:scale-110'
            }`}
            aria-label="Toggle Wishlist"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-auraa-terracotta' : ''}`} />
          </button>

          {/* Quick Action Overlay (Quick View & Quick Add) */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {onQuickView && (
              <button
                onClick={() => onQuickView(product)}
                className="flex-1 bg-white/95 hover:bg-white text-auraa-charcoal text-[11px] font-bold uppercase tracking-wider py-2.5 rounded-lg shadow-soft flex items-center justify-center gap-1.5 transition-colors border border-auraa-border"
              >
                <Eye className="w-3.5 h-3.5 text-auraa-gold" /> Quick View
              </button>
            )}
            <button
              onClick={() => addToCart(product, 1)}
              className="bg-auraa-charcoal hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider p-2.5 rounded-lg shadow-card hover:shadow-goldGlow flex items-center justify-center transition-all border border-white/10"
              aria-label="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4 text-auraa-gold" />
            </button>
          </div>
        </div>

        {/* Content details */}
        <div className="p-5 space-y-2">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold">
            <span className="text-auraa-gold">{product.intention}</span>
            <div className="flex items-center gap-1 bg-auraa-gold/10 px-2 py-0.5 rounded text-auraa-charcoal border border-auraa-gold/20">
              <Star className="w-3 h-3 fill-auraa-gold text-auraa-gold" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:text-auraa-gold transition-colors">
            <h3 className="font-serif text-lg font-normal text-auraa-charcoal line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-auraa-muted line-clamp-1 font-sans font-light">{product.subtitle}</p>
        </div>
      </div>

      {/* Footer Price & Add */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-auraa-border/40">
        <div className="flex items-baseline gap-2">
          <span className="font-serif font-medium text-lg text-auraa-charcoal">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-auraa-muted line-through font-light">
              ₹{product.compareAtPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <button
          onClick={() => addToCart(product, 1)}
          className="text-xs font-bold text-auraa-gold hover:text-auraa-goldHover uppercase tracking-widest transition-colors flex items-center gap-1"
        >
          + Add
        </button>
      </div>
    </div>
  );
}
