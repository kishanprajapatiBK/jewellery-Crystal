'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import SearchModal from '@/components/ui/SearchModal';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import {
  Check,
  Truck,
  Lock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

function CheckoutContent() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, subtotal, shippingFee, couponDiscount, total, clearCart } = useCart();
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    saveAddress: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      showToast('Please fill in all shipping details', 'error');
      return;
    }

    const generatedId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderPlaced(true);
    clearCart();
    showToast(`Order ${generatedId} placed successfully!`, 'success');
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-auraa-bg flex flex-col font-sans">
        <AnnouncementBar />
        <Header onOpenSearch={() => setSearchOpen(true)} />

        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-16 text-center space-y-6">
          <div className="w-16 h-16 bg-auraa-gold/10 text-auraa-gold rounded-full flex items-center justify-center mx-auto border border-auraa-gold/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-auraa-gold">Order Confirmed</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-auraa-charcoal">Thank You for Your Order</h1>
            <p className="text-xs sm:text-sm text-auraa-muted">Order ID: <strong className="text-auraa-charcoal font-mono">{orderId}</strong></p>
          </div>

          <div className="glass-card rounded-2xl border border-auraa-border p-6 text-left space-y-4 max-w-md mx-auto shadow-soft">
            <h3 className="font-serif text-lg text-auraa-charcoal border-b border-auraa-border pb-2">Delivery Summary</h3>
            <p className="text-xs text-auraa-charcoal"><strong>Recipient:</strong> {formData.fullName}</p>
            <p className="text-xs text-auraa-charcoal"><strong>Address:</strong> {formData.address}, {formData.city}, {formData.pincode}</p>
            <p className="text-xs text-auraa-charcoal"><strong>Payment:</strong> {paymentMethod.toUpperCase()} (Razorpay Encrypted)</p>
            <p className="text-xs text-auraa-sage font-medium flex items-center gap-1 pt-2">
              <Truck className="w-4 h-4" /> Estimated Dispatch: Within 24 Hours
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-block bg-auraa-charcoal hover:bg-black text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl transition-colors shadow-soft"
            >
              Continue Exploring Collection
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-auraa-bg flex flex-col font-sans">
      <AnnouncementBar />
      <Header onOpenSearch={() => setSearchOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="border-b border-auraa-border pb-6 mb-8 flex items-center justify-between">
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-auraa-charcoal">Checkout</h1>
          <span className="text-xs font-semibold text-auraa-sage flex items-center gap-1.5 bg-auraa-sage/10 px-3 py-1 rounded-full border border-auraa-sage/20">
            <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Accordion Flow Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact & Delivery Address */}
            <div className={`glass-card rounded-2xl transition-all ${step === 1 ? 'border-auraa-gold shadow-card p-6' : 'p-5'}`}>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setStep(1)}>
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${step > 1 ? 'bg-auraa-sage text-white' : step === 1 ? 'bg-auraa-gold text-white' : 'bg-auraa-surface text-auraa-muted'}`}>
                    {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                  </span>
                  <h2 className="font-serif text-xl text-auraa-charcoal">Shipping Address</h2>
                </div>
                {step > 1 && <span className="text-xs text-auraa-gold font-bold uppercase tracking-wider">Edit</span>}
              </div>

              {step === 1 && (
                <div className="mt-6 space-y-4 pt-4 border-t border-auraa-border">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-auraa-charcoal block mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Ananya Sharma"
                        className="w-full bg-auraa-surface border border-auraa-border rounded-lg px-3 py-2.5 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-auraa-charcoal block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        className="w-full bg-auraa-surface border border-auraa-border rounded-lg px-3 py-2.5 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-auraa-charcoal block mb-1">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Flat/House No., Building, Street Name"
                      className="w-full bg-auraa-surface border border-auraa-border rounded-lg px-3 py-2.5 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-auraa-charcoal block mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai"
                        className="w-full bg-auraa-surface border border-auraa-border rounded-lg px-3 py-2.5 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-auraa-charcoal block mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Maharashtra"
                        className="w-full bg-auraa-surface border border-auraa-border rounded-lg px-3 py-2.5 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-auraa-charcoal block mb-1">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="400001"
                        className="w-full bg-auraa-surface border border-auraa-border rounded-lg px-3 py-2.5 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        if (formData.fullName && formData.address && formData.pincode) setStep(2);
                        else showToast('Please complete shipping fields', 'error');
                      }}
                      className="bg-auraa-charcoal text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Payment Method */}
            <div className={`glass-card rounded-2xl transition-all ${step === 2 ? 'border-auraa-gold shadow-card p-6' : 'p-5'}`}>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setStep(2)}>
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${step > 2 ? 'bg-auraa-sage text-white' : step === 2 ? 'bg-auraa-gold text-white' : 'bg-auraa-surface text-auraa-muted'}`}>
                    2
                  </span>
                  <h2 className="font-serif text-xl text-auraa-charcoal">Razorpay Secure Payment</h2>
                </div>
              </div>

              {step === 2 && (
                <div className="mt-6 space-y-4 pt-4 border-t border-auraa-border">
                  <div className="space-y-3">
                    {[
                      { id: 'upi', label: 'UPI (GPay / PhonePe / Paytm / BHIM)', badge: 'Recommended' },
                      { id: 'card', label: 'Credit / Debit Card (Visa / MasterCard / RuPay)' },
                      { id: 'netbanking', label: 'Net Banking (HDFC, ICICI, SBI, Axis, etc.)' },
                      { id: 'cod', label: 'Cash on Delivery (COD)' },
                    ].map((pm) => (
                      <label
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          paymentMethod === pm.id
                            ? 'border-auraa-gold bg-auraa-gold/10 shadow-xs'
                            : 'border-auraa-border bg-white/60 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3 text-xs font-bold text-auraa-charcoal">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === pm.id}
                            onChange={() => setPaymentMethod(pm.id as any)}
                            className="accent-auraa-gold"
                          />
                          <span>{pm.label}</span>
                        </div>
                        {pm.badge && (
                          <span className="text-[10px] uppercase font-bold text-auraa-gold bg-auraa-gold/10 px-2.5 py-1 rounded-full border border-auraa-gold/20">
                            {pm.badge}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleCompleteOrder}
                      className="w-full bg-auraa-gold hover:bg-auraa-goldHover text-auraa-charcoal font-bold py-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-soft transition-colors"
                    >
                      Pay ₹{total.toLocaleString('en-IN')} & Confirm Order <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Order Summary Right Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 space-y-6 shadow-soft sticky top-24">
              <h3 className="font-serif text-xl border-b border-auraa-border pb-3">Order Summary ({cart.length} Items)</h3>

              <div className="space-y-4 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 text-xs">
                    <div className="relative w-12 h-12 bg-auraa-surface rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.product.images.primary} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{item.product.name}</h4>
                      <p className="text-auraa-muted">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-serif font-medium">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs border-t border-auraa-border pt-4">
                <div className="flex justify-between">
                  <span className="text-auraa-muted">Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-auraa-gold font-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-auraa-muted">Shipping</span>
                  <span>{shippingFee === 0 ? <span className="text-auraa-sage font-bold">FREE</span> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-semibold border-t border-auraa-border pt-3">
                  <span>Grand Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-auraa-bg flex items-center justify-center font-serif text-xl">Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
