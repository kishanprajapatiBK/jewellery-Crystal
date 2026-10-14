'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import SearchModal from '@/components/ui/SearchModal';
import ProductCard from '@/components/shop/ProductCard';
import QuickViewModal from '@/components/ui/QuickViewModal';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import {
  Star,
  Heart,
  ShoppingBag,
  Share2,
  ShieldCheck,
  Truck,
  RefreshCw,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

function ProductDetailContent() {
  const { products } = useStore();
  const params = useParams();
  const slug = params?.slug as string;
  const product = (slug ? products.find((p) => p.slug === slug) : null) || products[0];

  const productId = product?.id;
  const primaryImg = product?.images?.primary || products[0]?.images?.primary;
  const [selectedImage, setSelectedImage] = useState(primaryImg);

  React.useEffect(() => {
    if (primaryImg) {
      setSelectedImage(primaryImg);
    }
  }, [productId, primaryImg]);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'stoneInfo' | 'shipping' | 'reviews'>('description');
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const isLiked = isInWishlist(product.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.location.href = '/checkout';
  };

  const relatedProducts = products.filter((p) => p.id !== product?.id && p.category === product?.category).slice(0, 4);

  return (
    <div className="min-h-screen bg-auraa-bg flex flex-col font-sans pb-20 lg:pb-0">
      <AnnouncementBar />
      <Header onOpenSearch={() => setSearchOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-auraa-muted mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-auraa-charcoal">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-auraa-charcoal">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-auraa-charcoal">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-auraa-charcoal font-medium truncate">{product.name}</span>
        </div>

        {/* Top Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
          {/* Gallery Column (7 cols desktop) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden glass-card shadow-card group">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              {product.badges && (
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  {product.badges.map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded bg-auraa-charcoal text-auraa-gold shadow-md border border-auraa-gold/30"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.gallery.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img ? 'border-auraa-gold ring-2 ring-auraa-gold/30 scale-105' : 'border-auraa-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Column (5 cols desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Intention tag */}
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-auraa-gold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{product.intention}</span>
                <span>•</span>
                <span>{product.category}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-auraa-charcoal leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex text-auraa-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-auraa-gold text-auraa-gold' : 'text-auraa-border'}`}
                    />
                  ))}
                </div>
                <span className="font-bold text-auraa-charcoal">{product.rating}</span>
                <span className="text-auraa-muted">({product.reviewCount} verified client reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 pt-2 border-t border-auraa-border/60">
                <span className="font-serif text-3xl font-medium text-auraa-charcoal">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-auraa-muted line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.compareAtPrice && (
                  <span className="text-xs font-bold text-auraa-terracotta bg-auraa-terracotta/10 px-2.5 py-1 rounded-full border border-auraa-terracotta/20">
                    Save ₹{(product.compareAtPrice - product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Subtitle / Short description */}
              <p className="text-sm text-auraa-muted font-sans font-light leading-relaxed">
                {product.subtitle}
              </p>

              {/* Quick Specs Highlight Box */}
              <div className="glass-card p-4 rounded-xl border border-auraa-border text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-auraa-muted">Natural Origin:</span>
                  <span className="font-bold text-auraa-charcoal">{product.stoneInfo.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-auraa-muted">Crystalline Mineral:</span>
                  <span className="font-bold text-auraa-charcoal">{product.stoneInfo.composition.split(',')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-auraa-muted">Dimensions & Weight:</span>
                  <span className="font-bold text-auraa-charcoal">{product.stoneInfo.sizeWeight}</span>
                </div>
              </div>

              {/* Quantity Controls & Main Actions */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-auraa-charcoal">Quantity</span>
                  <div className="flex items-center border border-auraa-border rounded-lg bg-white h-11">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 text-auraa-charcoal hover:bg-auraa-surface h-full"
                    >
                      -
                    </button>
                    <span className="px-4 text-sm font-bold text-auraa-charcoal">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 text-auraa-charcoal hover:bg-auraa-surface h-full"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => addToCart(product, quantity)}
                    className="bg-auraa-charcoal hover:bg-black text-auraa-bg h-13 py-3.5 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-colors shadow-soft"
                  >
                    <ShoppingBag className="w-4 h-4 text-auraa-gold" /> Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="bg-auraa-gold hover:bg-auraa-goldHover text-white h-13 py-3.5 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center justify-center transition-colors shadow-soft"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className="text-xs font-bold text-auraa-charcoal hover:text-auraa-terracotta flex items-center gap-2 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-auraa-terracotta text-auraa-terracotta' : ''}`} />
                    {isLiked ? 'Saved to Wishlist' : 'Add to Wishlist'}
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="text-xs font-bold text-auraa-muted hover:text-auraa-charcoal flex items-center gap-1.5 transition-colors"
                  >
                    <Share2 className="w-4 h-4" /> Share Stone
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-auraa-border text-center text-[10px] uppercase font-bold text-auraa-muted">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-auraa-gold" />
                <span>100% Authentic</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-auraa-gold" />
                <span>Express Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-auraa-gold" />
                <span>7-Day Replacement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Details & Stone Information Section */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 mb-16 shadow-soft">
          <div className="flex border-b border-auraa-border gap-6 sm:gap-10 overflow-x-auto text-xs uppercase font-bold tracking-widest mb-8">
            {[
              { id: 'description', label: 'Description' },
              { id: 'stoneInfo', label: 'Stone Information & Care' },
              { id: 'shipping', label: 'Shipping & Returns' },
              { id: 'reviews', label: `Reviews (${product.reviewCount})` },
            ].map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-auraa-gold text-auraa-gold font-bold'
                    : 'border-transparent text-auraa-muted hover:text-auraa-charcoal'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'description' && (
            <div className="space-y-4 text-sm text-auraa-charcoal leading-relaxed font-sans max-w-3xl">
              <h3 className="font-serif text-2xl font-normal">About {product.name}</h3>
              <p>{product.description}</p>
            </div>
          )}

          {/* Tab 2: Stone Information Card */}
          {activeTab === 'stoneInfo' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <div className="space-y-4">
                <h4 className="font-serif text-xl text-auraa-charcoal border-b border-auraa-border pb-2">
                  Geological Specifications
                </h4>
                <dl className="space-y-3 text-xs">
                  <div>
                    <dt className="text-auraa-muted font-bold uppercase tracking-wider">Origin Mines</dt>
                    <dd className="text-auraa-charcoal font-medium">{product.stoneInfo.origin}</dd>
                  </div>
                  <div>
                    <dt className="text-auraa-muted font-bold uppercase tracking-wider">Chemical Composition</dt>
                    <dd className="text-auraa-charcoal font-medium">{product.stoneInfo.composition}</dd>
                  </div>
                  <div>
                    <dt className="text-auraa-muted font-bold uppercase tracking-wider">Visual Appearance</dt>
                    <dd className="text-auraa-charcoal font-medium">{product.stoneInfo.appearance}</dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-4">
                <h4 className="font-serif text-xl text-auraa-charcoal border-b border-auraa-border pb-2">
                  Traditional Associations & Care
                </h4>
                <dl className="space-y-3 text-xs">
                  <div>
                    <dt className="text-auraa-muted font-bold uppercase tracking-wider">Cultural Beliefs</dt>
                    <dd className="text-auraa-charcoal font-medium">{product.stoneInfo.traditionalAssociations}</dd>
                  </div>
                  <div>
                    <dt className="text-auraa-muted font-bold uppercase tracking-wider">Cleansing & Care Instructions</dt>
                    <dd className="text-auraa-charcoal font-medium">{product.stoneInfo.care}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {/* Tab 3: Shipping */}
          {activeTab === 'shipping' && (
            <div className="space-y-4 text-xs text-auraa-charcoal max-w-3xl leading-relaxed">
              <h4 className="font-serif text-xl text-auraa-charcoal">Pan-India Delivery & Zero-Plastic Packaging</h4>
              <p>• All orders above ₹999 qualify for complimentary Pan-India Express shipping.</p>
              <p>• Orders are dispatched within 24-48 business hours in custom cushioned eco-friendly bio-degradable packaging.</p>
              <p>• 7-Day Hassle-Free Replacement Guarantee in the rare event of transit damage.</p>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center gap-4 glass-card p-4 rounded-xl border border-auraa-border">
                <span className="font-serif text-4xl text-auraa-charcoal">{product.rating}</span>
                <div>
                  <div className="flex text-auraa-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-auraa-gold text-auraa-gold" />
                    ))}
                  </div>
                  <span className="text-xs text-auraa-muted font-semibold">Based on {product.reviewCount} verified client reviews</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 glass-card rounded-xl border border-auraa-border text-xs space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="flex items-center gap-1.5 text-auraa-charcoal">
                      Pooja R. <CheckCircle2 className="w-3.5 h-3.5 text-auraa-sage" />
                    </span>
                    <span className="text-auraa-muted font-normal">2 weeks ago</span>
                  </div>
                  <p className="text-auraa-charcoal italic font-serif text-sm">"The weight, metallic luster, and natural form of this stone are stunning. Arrived quickly."</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* You May Also Like (Related Products) */}
        <div className="space-y-8 mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-auraa-charcoal border-b border-auraa-border pb-4">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Add to Cart Bar for Mobile */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-white border-t border-auraa-border p-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="font-serif font-bold text-sm text-auraa-charcoal block">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-auraa-muted uppercase truncate max-w-[140px] block font-semibold">{product.name}</span>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product, quantity)}
          className="bg-auraa-charcoal hover:bg-black text-auraa-bg text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4 text-auraa-gold" /> Add to Cart
        </button>
      </div>

      <Footer />
      <MobileBottomNav />
      <WhatsAppButton />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-auraa-bg flex items-center justify-center font-serif text-xl">Loading Stone Details...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}
