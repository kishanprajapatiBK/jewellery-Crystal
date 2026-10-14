'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-auraa-bg flex flex-col items-center justify-center text-center px-4 py-20 space-y-4 font-sans">
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-auraa-gold">404 Error</span>
      <h1 className="font-serif text-4xl sm:text-5xl font-light text-auraa-charcoal">Page Not Found</h1>
      <p className="text-xs sm:text-sm text-auraa-muted max-w-md font-light">
        The stone specimen or page you are looking for might have been moved or renamed.
      </p>
      <div className="pt-4">
        <Link
          href="/"
          className="inline-block bg-auraa-charcoal text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl hover:bg-black transition-colors shadow-soft"
        >
          Return to Home Sanctuary
        </Link>
      </div>
    </div>
  );
}
