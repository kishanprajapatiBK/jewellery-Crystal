'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { FEATURED_COLLECTIONS } from '@/data/categories';

export default function FeaturedCollections() {
  const fullWidthCollection = FEATURED_COLLECTIONS.find((c) => c.size === 'full') || FEATURED_COLLECTIONS[0];
  const halfWidthCollections = FEATURED_COLLECTIONS.filter((c) => c.size === 'half');

  return (
    <section className="py-20 bg-auraa-surface border-t border-auraa-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-auraa-border pb-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-auraa-gold">
              Curated Edit
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-auraa-charcoal">
              Featured Collections
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold uppercase tracking-widest text-auraa-charcoal hover:text-auraa-gold transition-colors inline-flex items-center gap-1.5"
          >
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Layout Grid */}
        <div className="space-y-8">
          {/* Full-width editorial hero card (Pyrite) */}
          <Link
            href={fullWidthCollection.link}
            className="group relative block rounded-xl overflow-hidden min-h-[360px] md:min-h-[440px] shadow-card border border-auraa-border"
          >
            <Image
              src={fullWidthCollection.images[0]}
              alt={fullWidthCollection.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center p-8 md:p-14">
              <div className="max-w-md text-white space-y-4">
                <span className="text-xs uppercase font-bold tracking-[0.3em] text-auraa-gold">
                  Signature Collection
                </span>
                <h3 className="font-serif text-3xl md:text-5xl font-normal">
                  Natural {fullWidthCollection.title} Clusters
                </h3>
                <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                  {fullWidthCollection.subtitle}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 bg-white text-auraa-charcoal px-6 py-3 rounded text-xs uppercase font-semibold tracking-widest group-hover:bg-auraa-gold group-hover:text-white transition-colors">
                    Explore Collection <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* 50/50 Split grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {halfWidthCollections.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="group relative block rounded-xl overflow-hidden min-h-[300px] border border-auraa-border shadow-card"
              >
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-8">
                  <div className="text-white space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-auraa-gold">
                      Essential Collection
                    </span>
                    <h4 className="font-serif text-2xl font-normal group-hover:text-auraa-gold transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
