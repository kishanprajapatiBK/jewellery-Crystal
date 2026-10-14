'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import SearchModal from '@/components/ui/SearchModal';
import { Gem, Sparkles, ShieldCheck, Leaf, HeartHandshake } from 'lucide-react';

function AboutContent() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-auraa-bg flex flex-col font-sans">
      <AnnouncementBar />
      <Header onOpenSearch={() => setSearchOpen(true)} />

      <main className="flex-1">
        {/* About Hero */}
        <section className="relative py-24 bg-auraa-surface border-b border-auraa-border/40 text-center">
          <div className="max-w-4xl mx-auto px-4 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-auraa-gold">
              Quiet Luxury Meets Mindful Living
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light text-auraa-charcoal leading-tight">
              Our Story & Philosophy
            </h1>
            <p className="text-base text-auraa-muted max-w-2xl mx-auto font-light leading-relaxed">
              Founded on the belief that natural stones are works of art forged by Earth, Healing Crystals curates authentic crystals, pyrite specimens, and gemstones for conscious homes across India.
            </p>
          </div>
        </section>

        {/* Editorial Story */}
        <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-card border border-auraa-border">
              <Image
                src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=1000"
                alt="Authentic Pyrite specimen selection"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-auraa-gold">Ethical Sourcing</span>
              <h2 className="font-serif text-3xl text-auraa-charcoal font-light">Mine-Direct Integrity</h2>
              <p className="text-xs sm:text-sm text-auraa-muted font-light leading-relaxed">
                We work directly with certified artisan mines in Spain, Brazil, Madagascar, and Rajasthan. Every specimen is hand-evaluated for natural geometric crystallization without synthetic dyes or chemical heat treatments.
              </p>
            </div>
          </div>

          {/* Pillars */}
          <div className="pt-12 border-t border-auraa-border">
            <h3 className="font-serif text-2xl text-auraa-charcoal text-center mb-10">Our Core Pillars</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: ShieldCheck,
                  title: '100% Unaltered',
                  desc: 'Zero synthetic dyes, zero artificial glass composites. Only authentic earth specimens.',
                },
                {
                  icon: Leaf,
                  title: 'Ethically Mined',
                  desc: 'Supporting fair-wage mining communities with eco-conscious extraction protocols.',
                },
                {
                  icon: HeartHandshake,
                  title: 'Cultural Respect',
                  desc: 'Honoring centuries of traditional stone lore with quiet elegance and transparent descriptions.',
                },
              ].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="glass-card p-6 rounded-2xl space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-auraa-gold/15 text-auraa-gold flex items-center justify-center mx-auto">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-lg font-normal text-auraa-charcoal">{pillar.title}</h4>
                    <p className="text-xs text-auraa-muted font-light leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
      <WhatsAppButton />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-auraa-bg flex items-center justify-center font-serif text-xl">Loading Our Story...</div>}>
      <AboutContent />
    </Suspense>
  );
}
