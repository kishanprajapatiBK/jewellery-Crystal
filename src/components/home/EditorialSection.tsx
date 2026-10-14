'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, Hammer, HeartHandshake } from 'lucide-react';

export default function EditorialSection() {
  const stories = [
    {
      icon: Compass,
      title: 'Geological Origin',
      subtitle: 'Forged over millions of years',
      text: 'Our pyrite clusters hail from ancient basalt beds in Logroño, Spain and Minas Gerais, Brazil. Every natural specimen carries raw crystalline striations shaped by subterranean pressure.',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600',
    },
    {
      icon: Hammer,
      title: 'Master Craft',
      subtitle: 'Artisanal lapidary shaping',
      text: 'From raw rough boulders to hand-carved hearts and generator towers, Indian lapidary masters shape our stones while respecting their natural crystalline cleavage and optical flash.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600',
    },
    {
      icon: HeartHandshake,
      title: 'Mindful Care',
      subtitle: 'Preserving natural radiance',
      text: 'Natural minerals thrive with soft dry velvet cleaning, moonlight rests, and proper placement away from harsh chemicals. We include a custom stone care guide with every piece.',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600',
    },
  ];

  return (
    <section className="py-20 bg-auraa-surface border-t border-auraa-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-auraa-gold">
            Heritage & Lineage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-auraa-charcoal">
            Every Stone Has a Story
          </h2>
          <p className="text-sm text-auraa-muted font-sans font-light">
            Understanding the journey from deep Earth crusts to your sanctuary table.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-auraa-border overflow-hidden p-6 flex flex-col justify-between space-y-6 shadow-soft hover:shadow-hover transition-all"
              >
                <div className="space-y-4">
                  <div className="relative h-48 w-full rounded-lg overflow-hidden bg-auraa-surface">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-auraa-gold text-xs uppercase font-semibold tracking-wider">
                    <Icon className="w-4 h-4" />
                    <span>{s.subtitle}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-auraa-charcoal font-normal">
                    {s.title}
                  </h3>
                  <p className="text-xs text-auraa-muted font-sans leading-relaxed">
                    {s.text}
                  </p>
                </div>

                <div className="pt-2 border-t border-auraa-border/40">
                  <Link
                    href="/about"
                    className="text-xs font-semibold uppercase tracking-widest text-auraa-charcoal hover:text-auraa-gold transition-colors inline-flex items-center gap-1.5"
                  >
                    Read Full Story <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
