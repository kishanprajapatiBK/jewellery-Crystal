'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';

export default function Testimonials() {
  return (
    <section className="py-20 bg-auraa-surface border-t border-auraa-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-auraa-gold">
            Client Words
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-auraa-charcoal">
            Reflections & Experiences
          </h2>
          <p className="text-sm text-auraa-muted font-sans font-light">
            Real stories from homes and sanctuaries across India.
          </p>
        </div>

        {/* Testimonials horizontal snap container */}
        <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="snap-center min-w-[280px] sm:min-w-[360px] md:min-w-[400px] bg-white rounded-xl border border-auraa-border p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-soft hover:shadow-hover transition-all flex-shrink-0"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-auraa-gold/40" />

                {/* Stars */}
                <div className="flex items-center gap-1 text-auraa-gold">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-auraa-gold text-auraa-gold" />
                  ))}
                </div>

                <p className="font-serif text-lg text-auraa-charcoal font-normal italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-auraa-border/40 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-auraa-charcoal flex items-center gap-1.5">
                    {item.name}
                    {item.verified && (
                      <span title="Verified Client">
                        <CheckCircle2 className="w-3.5 h-3.5 text-auraa-sage" />
                      </span>
                    )}
                  </h4>
                  <span className="text-auraa-muted">{item.location}</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-auraa-surface text-auraa-gold font-medium border border-auraa-border text-[10px] uppercase">
                  {item.productName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
