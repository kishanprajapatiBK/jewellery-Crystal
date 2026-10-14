'use client';

import React from 'react';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

export default function InstagramGallery() {
  const images = [
    { src: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600', alt: 'Golden Pyrite on linen desk' },
    { src: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&q=80&w=600', alt: 'Deep violet Amethyst cluster' },
    { src: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600', alt: 'Madagascar Rose Quartz heart' },
    { src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600', alt: 'Clear Quartz generator tower' },
    { src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600', alt: 'Honey Citrine rough' },
    { src: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600', alt: 'Black Tourmaline sanctuary entrance' },
  ];

  return (
    <section className="py-20 bg-auraa-bg border-t border-auraa-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-auraa-gold flex items-center justify-center gap-2">
            <Instagram className="w-4 h-4" /> Social Community
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-auraa-charcoal">
            Living with Stones
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-xs font-semibold uppercase tracking-widest text-auraa-charcoal hover:text-auraa-gold border-b border-auraa-charcoal hover:border-auraa-gold pb-0.5 transition-colors"
          >
            Follow @auraa.stones
          </a>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((img, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-lg overflow-hidden bg-auraa-surface border border-auraa-border block"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-6 h-6" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
