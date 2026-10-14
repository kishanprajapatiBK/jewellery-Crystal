'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { INTENTIONS } from '@/data/categories';

export default function ShopByIntention() {
  return (
    <section className="py-24 bg-auraa-bg relative overflow-hidden border-b border-auraa-border/40">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-auraa-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-auraa-gold">
            <Sparkles className="w-3.5 h-3.5" /> Energy Alignment
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-auraa-charcoal">
            Shop by Intention
          </h2>
          <p className="text-xs sm:text-sm text-auraa-muted font-sans font-light max-w-lg mx-auto">
            Select stones based on the specific atmosphere and energy you wish to cultivate in your space.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {INTENTIONS.map((item) => (
            <Link
              key={item.title}
              href={`/shop?intention=${item.title}`}
              className="group glass-card glass-card-hover rounded-2xl p-4 sm:p-6 flex flex-col justify-between"
            >
              {/* Image container */}
              <div className="relative h-44 sm:h-56 w-full rounded-xl bg-auraa-surface overflow-hidden mb-5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>

              {/* Card Meta */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-auraa-charcoal group-hover:text-auraa-gold transition-colors">
                    {item.title}
                  </h3>
                  <div className="w-7 h-7 rounded-full bg-auraa-gold/10 text-auraa-gold flex items-center justify-center group-hover:bg-auraa-gold group-hover:text-white transition-all">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
                <p className="text-xs text-auraa-muted font-sans line-clamp-1">{item.subtitle}</p>
                <div className="pt-2 border-t border-auraa-border/40">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-auraa-gold flex items-center gap-1">
                    Explore {item.stoneExample}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
