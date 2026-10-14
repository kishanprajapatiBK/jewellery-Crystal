'use client';

import React from 'react';
import Link from 'next/link';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { Instagram, Facebook, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#262626] text-[#FDFBF7] pt-16 pb-12 border-t border-white/10">
      {/* Brand Values Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-white/10 mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <ShieldCheck className="w-6 h-6 text-auraa-gold mb-1" />
            <h4 className="text-sm font-semibold tracking-wider uppercase">100% Authentic</h4>
            <p className="text-xs text-neutral-400">Ethically sourced natural crystals & minerals</p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-2">
            <Truck className="w-6 h-6 text-auraa-gold mb-1" />
            <h4 className="text-sm font-semibold tracking-wider uppercase">Free Pan-India Shipping</h4>
            <p className="text-xs text-neutral-400">Complimentary delivery on all orders above ₹999</p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-2">
            <RefreshCw className="w-6 h-6 text-auraa-gold mb-1" />
            <h4 className="text-sm font-semibold tracking-wider uppercase">7-Day Easy Returns</h4>
            <p className="text-xs text-neutral-400">Hassle-free replacement for transit safety</p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-2">
            <CreditCard className="w-6 h-6 text-auraa-gold mb-1" />
            <h4 className="text-sm font-semibold tracking-wider uppercase">Secure Razorpay Payments</h4>
            <p className="text-xs text-neutral-400">UPI, Credit/Debit Cards & Net Banking</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-light uppercase text-white">
                HEALING CRYSTALS
              </span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-sm font-sans leading-relaxed">
              Illuminate Your Path, Naturally. Thoughtfully chosen raw crystals, pyrite specimens, and polished gemstones designed for modern sanctuary spaces.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-auraa-gold hover:text-auraa-charcoal flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/+919737264428"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366] text-white hover:scale-110 flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-auraa-gold">
              Shop Collections
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/shop?category=Pyrite" className="hover:text-white transition-colors">
                  Natural Pyrite Clusters
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Raw+Crystals" className="hover:text-white transition-colors">
                  Raw Crystals & Geodes
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Polished+Stones" className="hover:text-white transition-colors">
                  Polished Stones & Generators
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Vastu" className="hover:text-white transition-colors">
                  Vastu Sanctuary Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Jewelry" className="hover:text-white transition-colors">
                  Mindful Jewelry & Bracelets
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-auraa-gold">
              Support & Care
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Stone Care Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-auraa-gold">
              Legal & Trust
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Ethical Sourcing Pledge
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Disclaimer Notice
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="mt-12 p-4 rounded-lg bg-neutral-900/60 border border-white/5 text-[11px] text-neutral-400 leading-relaxed text-center max-w-4xl mx-auto">
          <strong className="text-neutral-300">Cultural & Spiritual Disclaimer:</strong> These products are for decorative, mindful living, and personal ritual purposes only. Traditional associations mentioned on this site are based on cultural beliefs, heritage traditions, and historical literature and should not be considered medical, financial, legal, or professional health advice.
        </div>

        {/* Bottom copyright & payment methods */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 HEALING CRYSTALS. Made with intention in India. All rights reserved.</p>
          <div className="flex items-center space-x-3 text-neutral-400">
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider font-semibold">
              UPI
            </span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider font-semibold">
              RAZORPAY
            </span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider font-semibold">
              VISA / MC
            </span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider font-semibold">
              NET BANKING
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
