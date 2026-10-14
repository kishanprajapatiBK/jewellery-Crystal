'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import SearchModal from '@/components/ui/SearchModal';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Trash2, ArrowRight, Tag } from 'lucide-react';

function CartContent() {
  const [searchOpen, setSearchOpen] = useState(false);
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    total,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) setCouponInput('');
  };

  return (
    <div className="min-h-screen bg-auraa-bg flex flex-col font-sans">
      <AnnouncementBar />
      <Header onOpenSearch={() => setSearchOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="border-b border-auraa-border pb-6 mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-auraa-charcoal">
            Shopping Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-2xl border border-auraa-border p-8 space-y-4 max-w-lg mx-auto">
            <ShoppingBag className="w-12 h-12 text-auraa-gold mx-auto" />
            <h2 className="font-serif text-2xl text-auraa-charcoal">Your bag is currently empty</h2>
            <p className="text-xs text-auraa-muted font-light">Explore authentic pyrite clusters, raw stones, and mindful gemstone specimens.</p>
            <Link
              href="/shop"
              className="inline-block bg-auraa-charcoal text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl hover:bg-black transition-colors shadow-soft"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="glass-card rounded-2xl p-4 sm:p-6 flex gap-4 sm:gap-6 items-center justify-between shadow-soft"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-auraa-surface rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.product.images.primary} alt={item.product.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-auraa-gold uppercase tracking-widest font-bold block">
                      {item.product.intention}
                    </span>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-serif text-lg text-auraa-charcoal hover:text-auraa-gold transition-colors block truncate"
                    >
                      {item.product.name}
                    </Link>
                    <span className="text-xs text-auraa-muted">Unit Price: ₹{item.product.price.toLocaleString('en-IN')}</span>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-auraa-border rounded-lg bg-auraa-surface h-8">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 text-xs text-auraa-charcoal hover:bg-white h-full"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 text-xs text-auraa-charcoal hover:bg-white h-full"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-auraa-muted hover:text-auraa-terracotta text-xs flex items-center gap-1 transition-colors font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-serif font-medium text-lg text-auraa-charcoal">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-card rounded-2xl p-6 space-y-6 shadow-soft">
                <h3 className="font-serif text-xl border-b border-auraa-border pb-3">Order Summary</h3>

                {/* Coupon form */}
                <div>
                  {appliedCoupon ? (
                    <div className="flex justify-between items-center bg-auraa-gold/10 p-3 rounded-lg border border-auraa-gold/30 text-xs">
                      <span className="font-bold text-auraa-gold flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" /> Coupon "{appliedCoupon}" (-₹{couponDiscount.toLocaleString('en-IN')})
                      </span>
                      <button onClick={removeCoupon} className="text-auraa-terracotta hover:underline font-bold">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Coupon Code (AURAA10)"
                        className="flex-1 bg-auraa-surface border border-auraa-border rounded-lg px-3 py-2 text-xs uppercase focus:outline-none focus:border-auraa-gold"
                      />
                      <button
                        type="submit"
                        className="bg-auraa-charcoal text-white px-4 py-2 text-xs font-bold uppercase rounded-lg hover:bg-black"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                <div className="space-y-3 text-xs text-auraa-charcoal border-t border-auraa-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-auraa-muted">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-auraa-gold font-bold">
                      <span>Discount (10%)</span>
                      <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-auraa-muted">Pan-India Delivery</span>
                    <span className="font-medium">{shippingFee === 0 ? <span className="text-auraa-sage font-bold">FREE</span> : `₹${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-semibold border-t border-auraa-border pt-3">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-auraa-charcoal hover:bg-black text-white py-4 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-colors shadow-soft border border-white/10"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4 text-auraa-gold" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
      <WhatsAppButton />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-auraa-bg flex items-center justify-center font-serif text-xl">Loading Sanctuary Bag...</div>}>
      <CartContent />
    </Suspense>
  );
}
