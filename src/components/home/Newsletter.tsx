'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setSubscribed(true);
    showToast('Welcome to AURAA! Use code AURAA10 for 10% off your first order.', 'success');
    setEmail('');
  };

  return (
    <section className="py-20 bg-auraa-charcoal text-auraa-bg border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-auraa-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.25em] text-auraa-gold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mindful Circle</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-white">
          Join Our World of Stones
        </h2>

        <p className="max-w-md mx-auto text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
          Subscribe to receive quarterly stone journal updates, private specimen releases, and <strong className="text-auraa-gold font-normal">10% off your first order</strong>.
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-white/10 border border-white/20 focus:border-auraa-gold text-white placeholder-neutral-400 rounded px-4 pl-11 py-3.5 text-xs focus:outline-none transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-auraa-gold hover:bg-auraa-goldHover text-auraa-charcoal px-6 py-3.5 rounded text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="bg-white/10 border border-auraa-gold/40 p-4 rounded-lg max-w-md mx-auto space-y-2">
            <p className="text-sm font-serif text-auraa-gold">Thank you for joining our circle!</p>
            <p className="text-xs text-neutral-300">
              Your 10% discount code is: <strong className="text-white bg-black/40 px-2 py-0.5 rounded tracking-widest font-mono">AURAA10</strong>
            </p>
          </div>
        )}

        <p className="text-[10px] text-neutral-400 font-sans">
          No spam, ever. Unsubscribe with one click at any time.
        </p>
      </div>
    </section>
  );
}
