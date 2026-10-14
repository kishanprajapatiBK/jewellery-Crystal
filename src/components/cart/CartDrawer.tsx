'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, Trash2, Tag, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    total,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const progressPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus(`Available for express delivery to pincode ${pincode}`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian Pincode');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-auraa-bg shadow-2xl flex flex-col justify-between border-l border-auraa-border animate-fadeIn">
          {/* Header */}
          <div className="p-6 border-b border-auraa-border flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-auraa-gold" />
              <h2 className="font-serif text-xl tracking-wide font-normal text-auraa-charcoal">
                Your Sanctuary Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-auraa-charcoal hover:text-auraa-gold transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-auraa-surface p-4 border-b border-auraa-border">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium text-auraa-charcoal flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-auraa-gold" />
                {remainingForFreeShipping === 0
                  ? 'Congratulations! You unlocked FREE Pan-India Shipping'
                  : `Add ₹${remainingForFreeShipping.toLocaleString('en-IN')} more for FREE shipping`}
              </span>
              <span className="font-bold text-auraa-gold">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-auraa-border h-2 rounded-full overflow-hidden">
              <div
                className="bg-auraa-gold h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-auraa-surface flex items-center justify-center mx-auto border border-auraa-border">
                  <ShoppingBag className="w-8 h-8 text-auraa-muted" />
                </div>
                <h3 className="font-serif text-xl text-auraa-charcoal">Your bag is currently empty</h3>
                <p className="text-xs text-auraa-muted max-w-xs mx-auto">
                  Explore our authentic pyrite clusters, raw stones, and mindful gemstone collections.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block bg-auraa-charcoal text-auraa-bg text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded hover:bg-black transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 rounded-lg bg-white border border-auraa-border relative group"
                >
                  <div className="relative w-20 h-20 bg-auraa-surface rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images.primary}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-medium text-sm text-auraa-charcoal truncate hover:text-auraa-gold transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-auraa-muted hover:text-auraa-terracotta transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-auraa-muted uppercase">{item.product.intention}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-auraa-border rounded bg-auraa-surface h-7">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 text-xs text-auraa-charcoal hover:bg-white h-full"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 text-xs text-auraa-charcoal hover:bg-white h-full"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif font-medium text-sm text-auraa-charcoal">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Pincode Shipping Calculator */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-auraa-border">
                <form onSubmit={handleCheckPincode} className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-auraa-charcoal block">
                    Check Delivery Pincode
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter 6-digit Pincode"
                      className="flex-1 bg-white border border-auraa-border rounded px-3 py-2 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                    />
                    <button
                      type="submit"
                      className="bg-auraa-surface hover:bg-auraa-sand border border-auraa-border px-3 py-2 text-xs uppercase font-semibold tracking-wider text-auraa-charcoal rounded"
                    >
                      Check
                    </button>
                  </div>
                  {pincodeStatus && (
                    <p className={`text-[11px] font-medium ${pincodeStatus.includes('valid') ? 'text-auraa-terracotta' : 'text-auraa-sage'}`}>
                      {pincodeStatus}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Summary & Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-auraa-border space-y-4">
              {/* Coupon input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-auraa-gold/10 border border-auraa-gold/30 p-2.5 rounded text-xs">
                    <span className="font-semibold text-auraa-gold flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" /> Coupon "{appliedCoupon}" Applied (-₹{couponDiscount.toLocaleString('en-IN')})
                    </span>
                    <button onClick={removeCoupon} className="text-xs text-auraa-terracotta hover:underline font-medium">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code (e.g. AURAA10)"
                      className="flex-1 bg-auraa-surface border border-auraa-border rounded px-3 py-2 text-xs uppercase focus:outline-none focus:border-auraa-gold"
                    />
                    <button
                      type="submit"
                      className="bg-auraa-charcoal text-white px-4 py-2 text-xs uppercase font-semibold tracking-wider rounded hover:bg-black transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-auraa-charcoal pt-2">
                <div className="flex justify-between">
                  <span className="text-auraa-muted">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-auraa-gold font-medium">
                    <span>Discount (10%)</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-auraa-muted">Estimated Shipping</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? <span className="text-auraa-sage font-bold uppercase">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-semibold border-t border-auraa-border pt-3 text-auraa-charcoal">
                  <span>Total (Taxes Included)</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-auraa-charcoal hover:bg-black text-auraa-bg py-3.5 rounded text-xs uppercase font-semibold tracking-widest flex items-center justify-center gap-2 transition-colors shadow-soft"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
