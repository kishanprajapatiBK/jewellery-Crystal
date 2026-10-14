'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Gem, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function HeroSection() {
  const { settings } = useStore();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 lg:py-24 border-b border-auraa-border/40 bg-auraa-bg">
      {/* High-Resolution Custom Pyrite, Crystal Pyramid, Diya & Bracelet Sanctuary Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-pyrite-bg.jpg"
          alt="Natural Pyrite Cluster, Crystal Pyramid, Diya Lamp & Gemstone Bracelet Sanctuary"
          fill
          priority
          className="object-cover object-center opacity-65 scale-105 filter saturate-[1.25] brightness-95"
          sizes="100vw"
        />
        {/* Soft Warm Ivory Gradient Overlay for Optimal Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-auraa-bg/90 via-auraa-bg/70 to-auraa-bg/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-auraa-bg/90 via-transparent to-auraa-bg/20" />
      </div>

      {/* Background Ambient Glow Blobs */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-auraa-gold/20 rounded-full blur-[100px] pointer-events-none animate-pulse z-0" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-auraa-terracotta/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Grid Texture Overlay */}
      <div className="absolute inset-0 paper-texture pointer-events-none z-0 opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content (Left 7 columns on Desktop) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-fadeIn">
            {/* Pill Badge with Pulse */}
            <div className="inline-flex items-center gap-2.5 glass-card px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-auraa-charcoal border border-auraa-gold/30 shadow-soft">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-auraa-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-auraa-gold"></span>
              </span>
              <span className="text-gold-shimmer font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-auraa-gold" /> {settings.heroBadge || 'Pyrite, Pyramids & Healing Bracelets'}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-auraa-charcoal leading-[1.08]">
              {settings.heroTitle || 'Natural Stones,'} <br />
              <span className="italic font-normal text-gold-shimmer">{settings.heroTitleItalic || 'Illuminate Your Path, Naturally.'}</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-auraa-muted font-sans font-light leading-relaxed">
              {settings.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto bg-auraa-charcoal hover:bg-black text-auraa-bg px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 shadow-card hover:shadow-goldGlow hover:-translate-y-0.5 border border-white/10"
              >
                Shop Collection <ArrowRight className="w-4 h-4 text-auraa-gold" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto glass-card glass-card-hover text-auraa-charcoal px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center transition-all duration-300"
              >
                Our Story & Ethics
              </Link>
            </div>

            {/* Trust Metrics Pill Bar */}
            <div className="pt-8 grid grid-cols-3 max-w-md mx-auto lg:mx-0 border-t border-auraa-border/60 text-center lg:text-left gap-6">
              <div>
                <span className="block font-serif text-2xl font-normal text-auraa-charcoal">100%</span>
                <span className="text-[10px] text-auraa-muted font-semibold uppercase tracking-widest">Mine Authentic</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-normal text-auraa-charcoal">₹999+</span>
                <span className="text-[10px] text-auraa-muted font-semibold uppercase tracking-widest">Free Pan-India</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-normal text-auraa-charcoal">4.9★</span>
                <span className="text-[10px] text-auraa-muted font-semibold uppercase tracking-widest">Client Rating</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card (Pushed Right Towards Yellow Marker / WhatsApp Button Position) */}
          <div className="lg:col-span-5 relative flex justify-end">
            <div className="relative aspect-[4/5] w-full max-w-lg ml-auto rounded-3xl overflow-hidden glass-card p-3 shadow-hover border border-auraa-gold/30 lg:translate-x-6">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=1200"
                  alt="Natural Pyrite cluster specimen"
                  fill
                  priority
                  className="object-cover scale-100 hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Glass Pill 1: Specimen Tag */}
                <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-xl text-white space-y-1 backdrop-blur-md border border-white/20">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-auraa-gold font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <Gem className="w-3 h-3" /> Featured Specimen
                    </span>
                    <span className="text-[10px] text-neutral-300">Spain Mine</span>
                  </div>
                  <h3 className="font-serif text-lg font-normal text-white">Natural Golden Pyrite Cluster</h3>
                </div>
              </div>
            </div>

            {/* Floating Glass Pill 2: Top Right Guarantee */}
            <div className="absolute -top-4 left-0 glass-card p-3 rounded-2xl shadow-card border border-auraa-gold/30 hidden sm:flex items-center gap-3 animate-float z-20">
              <div className="w-10 h-10 rounded-xl bg-auraa-gold/15 text-auraa-gold flex items-center justify-center border border-auraa-gold/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left text-xs pr-2">
                <span className="font-bold text-auraa-charcoal block">Zero Dyes</span>
                <span className="text-[10px] text-auraa-muted">100% Unaltered Specimen</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
