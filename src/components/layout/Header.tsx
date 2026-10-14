'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, X, Gem, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface HeaderProps {
  onOpenSearch: () => void;
}

function NavItems({ onMobileClick }: { onMobileClick?: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams ? searchParams.get('category') : null;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Crystals', href: '/shop?category=Raw+Crystals' },
    { name: 'Pyrite', href: '/shop?category=Pyrite' },
    { name: 'Gemstones', href: '/shop?category=Polished+Stones' },
    { name: 'Jewelry', href: '/shop?category=Jewelry' },
    { name: 'Vastu', href: '/shop?category=Vastu' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const getIsActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href === '/shop') {
      return pathname === '/shop' && !currentCategory;
    }
    if (href.startsWith('/shop?category=')) {
      const linkCategory = href.split('=')[1].replace(/\+/g, ' ');
      return pathname === '/shop' && currentCategory === linkCategory;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {navLinks.map((link) => {
        const isActive = getIsActive(link.href);
        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={onMobileClick}
            className={`transition-colors py-1 relative hover:text-auraa-gold ${
              isActive ? 'text-auraa-gold font-bold' : 'text-auraa-charcoal/80 font-semibold'
            }`}
          >
            {link.name}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-auraa-gold rounded-full shadow-goldGlow" />
            )}
          </Link>
        );
      })}
    </>
  );
}

function MobileNavItems({ onMobileClick }: { onMobileClick: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams ? searchParams.get('category') : null;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Crystals', href: '/shop?category=Raw+Crystals' },
    { name: 'Pyrite', href: '/shop?category=Pyrite' },
    { name: 'Gemstones', href: '/shop?category=Polished+Stones' },
    { name: 'Jewelry', href: '/shop?category=Jewelry' },
    { name: 'Vastu', href: '/shop?category=Vastu' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const getIsActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href === '/shop') {
      return pathname === '/shop' && !currentCategory;
    }
    if (href.startsWith('/shop?category=')) {
      const linkCategory = href.split('=')[1].replace(/\+/g, ' ');
      return pathname === '/shop' && currentCategory === linkCategory;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col space-y-2">
      {navLinks.map((link) => {
        const isActive = getIsActive(link.href);
        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={onMobileClick}
            className={`text-xs font-bold tracking-[0.2em] uppercase py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
              isActive
                ? 'bg-auraa-gold/15 text-auraa-gold font-bold border border-auraa-gold/30'
                : 'hover:bg-auraa-gold/10 hover:text-auraa-gold text-auraa-charcoal'
            }`}
          >
            <span>{link.name}</span>
            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-auraa-gold" />}
          </Link>
        );
      })}
    </div>
  );
}

export default function Header({ onOpenSearch }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'glass-header py-3.5 shadow-soft'
            : 'bg-auraa-bg/90 backdrop-blur-md py-5 border-b border-auraa-border/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-auraa-charcoal hover:text-auraa-gold transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo with Monogram */}
          <Link href="/" className="group flex flex-col items-center">
            <div className="flex items-center gap-1.5">
              <Gem className="w-4 h-4 text-auraa-gold group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] font-light text-auraa-charcoal uppercase group-hover:text-auraa-gold transition-colors">
                HEALING CRYSTALS
              </span>
            </div>
            <span className="text-[8.5px] sm:text-[9px] tracking-[0.25em] uppercase text-auraa-muted -mt-0.5 font-sans hidden sm:block">
              Illuminate Your Path, Naturally
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs tracking-[0.18em] uppercase">
            <Suspense fallback={<span className="text-auraa-muted text-xs">Navigation...</span>}>
              <NavItems />
            </Suspense>
          </nav>

          {/* Header Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full hover:bg-auraa-gold/10 text-auraa-charcoal hover:text-auraa-gold transition-all"
              aria-label="Search Products"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Admin Panel Badge Link */}
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-auraa-charcoal text-white hover:bg-black text-[10px] uppercase font-bold tracking-wider transition-all border border-auraa-gold/40 shadow-soft"
              title="Open Store Admin Control Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-auraa-gold" /> Admin
            </Link>

            {/* Account Link */}
            <Link
              href="/contact"
              className="hidden sm:block p-2.5 rounded-full hover:bg-auraa-gold/10 text-auraa-charcoal hover:text-auraa-gold transition-all"
              aria-label="Account / Support"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
            </Link>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="p-2.5 rounded-full hover:bg-auraa-gold/10 text-auraa-charcoal hover:text-auraa-gold transition-all relative"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-auraa-terracotta text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full bg-auraa-charcoal text-white hover:bg-black transition-all relative shadow-soft"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 text-auraa-gold stroke-[1.75]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-auraa-gold text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Overlay backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full glass-card shadow-modal p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-auraa-border">
                <div className="flex items-center gap-2">
                  <Gem className="w-4 h-4 text-auraa-gold" />
                  <span className="font-serif text-lg tracking-[0.15em] font-light uppercase">HEALING CRYSTALS</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-auraa-charcoal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <Suspense fallback={<span className="text-auraa-muted text-xs">Loading menu...</span>}>
                <MobileNavItems onMobileClick={() => setMobileMenuOpen(false)} />
              </Suspense>
            </div>

            <div className="pt-6 border-t border-auraa-border text-xs text-auraa-muted text-center space-y-2 font-sans">
              <p className="font-serif text-sm text-auraa-charcoal">Natural Stones, Thoughtfully Chosen</p>
              <p className="text-auraa-gold font-bold">Free Shipping Above ₹999</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
