'use client';

import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const { settings } = useStore();

  if (!isVisible) return null;

  const announcements = [
    'Free Shipping Above ₹999 Across India',
    '100% Authentic Natural Stones & Raw Clusters',
    'Ethically Sourced & Consciously Curated',
    settings.announcementText || 'USE CODE HEALING10 FOR 10% OFF YOUR FIRST SPECIMEN',
  ];

  return (
    <div className="bg-auraa-charcoal text-auraa-bg text-xs font-medium tracking-widest uppercase relative overflow-hidden py-2.5 border-b border-white/10 z-40">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
        {/* Scrolling Marquee Container */}
        <div className="flex-1 overflow-hidden group">
          <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
            {[...announcements, ...announcements].map((item, index) => (
              <span key={index} className="inline-flex items-center mx-6 gap-2 opacity-90 hover:opacity-100 transition-opacity">
                <Sparkles className="w-3 h-3 text-auraa-gold flex-shrink-0" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 p-1 text-auraa-bg/60 hover:text-auraa-bg transition-colors flex-shrink-0"
          aria-label="Dismiss Announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
