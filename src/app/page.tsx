'use client';

import React, { useState } from 'react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import BestSellers from '@/components/home/BestSellers';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import Newsletter from '@/components/home/Newsletter';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import SearchModal from '@/components/ui/SearchModal';

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-auraa-bg flex flex-col font-sans">
      <AnnouncementBar />
      <Header onOpenSearch={() => setSearchOpen(true)} />

      <main className="flex-1">
        <HeroSection />
        <BestSellers />
        <FeaturedCollections />
        <Newsletter />
      </main>

      <Footer />
      <MobileBottomNav />
      <WhatsAppButton />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
