'use client';

import React from 'react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

export default function WhatsAppButton() {
  const whatsappNumber = '+919737264428';
  const message = encodeURIComponent('Hi Healing Crystals team, I would like to inquire about your authentic natural stone collection.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 lg:bottom-8 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:scale-110 hover:bg-[#20ba5a] transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2.5">
        Chat with Us
      </span>
    </a>
  );
}
