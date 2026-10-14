'use client';

import React from 'react';
import { Gem, Sparkles, Leaf, ShieldCheck, Headphones } from 'lucide-react';

export default function BrandValues() {
  const values = [
    {
      icon: Gem,
      title: 'Authentic Specimens',
      description: 'Zero synthetic treatments, dye coatings, or artificial glass reconstitutions.',
    },
    {
      icon: Sparkles,
      title: 'Thoughtfully Curated',
      description: 'Hand-selected by stone artisans for crystalline clarity and natural form.',
    },
    {
      icon: Leaf,
      title: 'Sustainable Sourcing',
      description: 'Ethically mined with zero-plastic eco packaging and fair worker compensation.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Razorpay Checkout',
      description: '100% encrypted Pan-India payments via UPI, Cards, NetBanking, and COD.',
    },
    {
      icon: Headphones,
      title: 'Personal Concierge',
      description: 'Direct WhatsApp stone consultation for room placement and Vastu advice.',
    },
  ];

  return (
    <section className="py-16 bg-auraa-bg border-t border-auraa-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-lg border border-auraa-border flex flex-col justify-between space-y-3 shadow-soft hover:shadow-hover transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-auraa-surface flex items-center justify-center text-auraa-gold border border-auraa-border">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-normal text-auraa-charcoal mb-1">
                    {v.title}
                  </h3>
                  <p className="text-xs text-auraa-muted font-sans leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
