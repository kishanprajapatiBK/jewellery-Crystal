'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import SearchModal from '@/components/ui/SearchModal';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { useToast } from '@/context/ToastContext';
import { Mail, Phone, MapPin, MessageCircle, ChevronDown } from 'lucide-react';

export default function ContactPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { showToast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thank you! Your message has been sent to our concierge team.', 'success');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const faqs = [
    {
      q: 'Are your pyrite clusters and crystals 100% natural?',
      a: 'Yes, absolutely. All AURAA stone specimens are 100% authentic natural minerals sourced from ethical mines in Spain, Brazil, Uruguay, and India. We never sell synthetic glass or dyed imitations.',
    },
    {
      q: 'What is your shipping policy and delivery timeline?',
      a: 'We offer complimentary Pan-India Express shipping on all orders above ₹999. Standard delivery takes 2 to 4 business days to major metros and 4 to 6 days to rest of India.',
    },
    {
      q: 'How do you package fragile crystal clusters for transit safety?',
      a: 'Every crystal specimen is wrapped in zero-plastic cushioned paper padding and housed in custom hardboard boxes with fragile shock protection.',
    },
    {
      q: 'What is your return or replacement policy?',
      a: 'We provide a 7-day hassle-free replacement guarantee if your stone arrives damaged or broken during transit.',
    },
  ];

  return (
    <div className="min-h-screen bg-auraa-bg flex flex-col font-sans">
      <AnnouncementBar />
      <Header onOpenSearch={() => setSearchOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b border-auraa-border pb-6 mb-12 text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-auraa-gold">Client Concierge</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-auraa-charcoal">Get in Touch</h1>
          <p className="text-xs sm:text-sm text-auraa-muted">Have a question regarding custom stone orders, room placement, or order tracking?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Contact Info & Direct WhatsApp */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-xl border border-auraa-border p-6 space-y-6 shadow-soft">
              <h2 className="font-serif text-2xl text-auraa-charcoal">Contact Details</h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-auraa-gold mt-0.5" />
                  <div>
                    <strong className="block text-auraa-charcoal font-semibold">Email Concierge</strong>
                    <span className="text-auraa-muted">care@healingcrystals.in</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-auraa-gold mt-0.5" />
                  <div>
                    <strong className="block text-auraa-charcoal font-semibold">WhatsApp & Phone Support</strong>
                    <span className="text-auraa-muted">+91 97372 64428 (Mon-Sat, 10 AM - 7 PM IST)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-auraa-gold mt-0.5" />
                  <div>
                    <strong className="block text-auraa-charcoal font-semibold">Studio Sanctuary</strong>
                    <span className="text-auraa-muted">Healing Crystals Studio, Bandra West, Mumbai, Maharashtra 400050</span>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/+919737264428"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors shadow-soft"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" /> WhatsApp Stone Advisor
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-auraa-border p-6 sm:p-8 space-y-4 shadow-soft">
              <h2 className="font-serif text-2xl text-auraa-charcoal mb-4">Send a Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-auraa-charcoal block mb-1">Your Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    placeholder="Ananya Sharma"
                    className="w-full bg-auraa-surface border border-auraa-border rounded px-3 py-2.5 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-auraa-charcoal block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    placeholder="ananya@example.com"
                    className="w-full bg-auraa-surface border border-auraa-border rounded px-3 py-2.5 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-auraa-charcoal block mb-1">Subject</label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="Order Inquiry / Custom Stone Request"
                  className="w-full bg-auraa-surface border border-auraa-border rounded px-3 py-2.5 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-auraa-charcoal block mb-1">Message</label>
                <textarea
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  placeholder="How can we assist your sanctuary space?"
                  className="w-full bg-auraa-surface border border-auraa-border rounded px-3 py-2.5 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                />
              </div>

              <button
                type="submit"
                className="bg-auraa-charcoal hover:bg-black text-white px-8 py-3 rounded text-xs uppercase font-semibold tracking-widest transition-colors shadow-soft"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-6 pt-8 border-t border-auraa-border">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl font-light text-auraa-charcoal">Frequently Asked Questions</h2>
            <p className="text-xs text-auraa-muted">Everything you need to know about our specimens and shipping.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-lg border border-auraa-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-4 flex justify-between items-center text-xs font-semibold text-auraa-charcoal hover:text-auraa-gold transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === i ? 'rotate-180 text-auraa-gold' : 'text-auraa-muted'}`} />
                </button>
                {openFaq === i && (
                  <div className="p-4 pt-0 text-xs text-auraa-muted font-sans leading-relaxed border-t border-auraa-border/40 bg-auraa-surface">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
      <WhatsAppButton />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
