'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Shop', href: '/shop', icon: Compass },
    { label: 'Wishlist', href: '/wishlist', icon: Heart, badge: wishlistCount },
    { label: 'Account', href: '/contact', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-auraa-bg/95 backdrop-blur-md border-t border-auraa-border py-2 px-4 shadow-modal">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 relative py-1 px-3 transition-colors ${
                isActive ? 'text-auraa-gold' : 'text-auraa-muted hover:text-auraa-charcoal'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5 stroke-[1.75]" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2.5 bg-auraa-terracotta text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium tracking-wider uppercase">{item.label}</span>
            </Link>
          );
        })}

        {/* Cart Action button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center space-y-1 relative py-1 px-3 text-auraa-muted hover:text-auraa-gold transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2.5 bg-auraa-gold text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-wider uppercase">Cart</span>
        </button>
      </div>
    </div>
  );
}
