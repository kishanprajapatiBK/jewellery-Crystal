'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ProductCard from '@/components/shop/ProductCard';
import FilterSidebar from '@/components/shop/FilterSidebar';
import QuickViewModal from '@/components/ui/QuickViewModal';
import SearchModal from '@/components/ui/SearchModal';
import { useStore } from '@/context/StoreContext';
import { FilterState, Product } from '@/types';
import { LayoutGrid, List, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

function ShopContent() {
  const { products } = useStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get('category') || '';
  const intentionParam = searchParams.get('intention') || '';

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [displayCount, setDisplayCount] = useState(12);

  const [filters, setFilters] = useState<FilterState>({
    category: categoryParam,
    intention: intentionParam,
    stoneType: '',
    minPrice: 0,
    maxPrice: 5000,
    rating: 0,
    inStockOnly: false,
    sortBy: 'featured',
  });

  // Keep filter state 100% synchronized with URL search params when clicking nav tabs or back/forward
  useEffect(() => {
    setFilters((prev) => {
      if (prev.category === categoryParam && prev.intention === intentionParam) return prev;
      return {
        ...prev,
        category: categoryParam,
        intention: intentionParam,
      };
    });
  }, [categoryParam, intentionParam]);

  // Handler when sidebar filters change: update state AND update URL search params seamlessly
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.intention) params.set('intention', newFilters.intention);
    const queryString = params.toString();
    const newPath = queryString ? `/shop?${queryString}` : '/shop';
    router.replace(newPath, { scroll: false });
  };

  const handleResetFilters = () => {
    const resetState: FilterState = {
      category: '',
      intention: '',
      stoneType: '',
      minPrice: 0,
      maxPrice: 5000,
      rating: 0,
      inStockOnly: false,
      sortBy: 'featured',
    };
    setFilters(resetState);
    router.replace('/shop', { scroll: false });
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filters.category && p.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
      if (filters.intention && p.intention.toLowerCase() !== filters.intention.toLowerCase()) {
        return false;
      }
      if (filters.stoneType && p.stoneType.toLowerCase() !== filters.stoneType.toLowerCase()) {
        return false;
      }
      if (filters.minPrice > 0 && p.price < filters.minPrice) return false;
      if (filters.maxPrice < 5000 && p.price > filters.maxPrice) return false;
      if (filters.inStockOnly && !p.inStock) return false;
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.badges?.includes('New') ? 1 : 0) - (a.badges?.includes('New') ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [filters]);

  const displayedProducts = filteredProducts.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-auraa-bg flex flex-col font-sans">
      <AnnouncementBar />
      <Header onOpenSearch={() => setSearchOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="border-b border-auraa-border pb-8 mb-8 space-y-2 text-center md:text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-auraa-gold">
            Natural Stone Gallery
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-auraa-charcoal">
            {filters.category
              ? `${filters.category === 'Raw Crystals' ? 'Crystals' : filters.category === 'Polished Stones' ? 'Gemstones' : filters.category} Collection`
              : filters.intention
              ? `${filters.intention} Stones`
              : 'All Stone Specimens'}
          </h1>
          <p className="text-xs sm:text-sm text-auraa-muted max-w-2xl font-light">
            Ethically sourced crystals, metallic pyrite clusters, and standing generators for mindful living.
          </p>
        </div>

        {/* Top Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-auraa-border/60 mb-8">
          {/* Product counter */}
          <div className="text-xs text-auraa-muted">
            Showing <strong className="text-auraa-charcoal">{displayedProducts.length}</strong> of{' '}
            <strong className="text-auraa-charcoal">{filteredProducts.length}</strong> products
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 border border-auraa-border bg-white px-4 py-2 rounded text-xs font-medium text-auraa-charcoal"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-auraa-gold" /> Filter
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-auraa-muted hidden sm:inline" />
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
                className="bg-white border border-auraa-border rounded px-3 py-1.5 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-auraa-border rounded bg-white p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs ${
                  viewMode === 'grid' ? 'bg-auraa-gold text-white' : 'text-auraa-muted hover:text-auraa-charcoal'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded text-xs ${
                  viewMode === 'list' ? 'bg-auraa-gold text-white' : 'text-auraa-muted hover:text-auraa-charcoal'
                }`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28">
            <FilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Product Grid / List */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white border border-auraa-border/60 rounded-2xl p-8 space-y-4">
                <span className="text-3xl block">🔮</span>
                <h3 className="font-serif text-2xl text-auraa-charcoal font-light">No Stone Specimens Found</h3>
                <p className="text-xs sm:text-sm text-auraa-muted max-w-md mx-auto font-light">
                  Try adjusting your filter selection or clear filters to view all specimens.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="bg-auraa-charcoal text-white text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded hover:bg-black transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {displayedProducts.length < filteredProducts.length && (
              <div className="text-center pt-12">
                <button
                  type="button"
                  onClick={() => setDisplayCount((prev) => prev + 12)}
                  className="bg-white hover:bg-auraa-surface text-auraa-charcoal border border-auraa-border px-8 py-3.5 rounded text-xs uppercase font-bold tracking-widest transition-colors shadow-soft"
                >
                  Load More Specimens ({filteredProducts.length - displayedProducts.length} Remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
      <WhatsAppButton />

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-auraa-bg h-full p-6 overflow-y-auto z-10 shadow-2xl space-y-6">
            <FilterSidebar
              filters={filters}
              onChange={(f) => {
                handleFilterChange(f);
                setMobileFilterOpen(false);
              }}
              onReset={() => {
                handleResetFilters();
                setMobileFilterOpen(false);
              }}
              isMobileOpen={mobileFilterOpen}
              onCloseMobile={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-auraa-bg flex items-center justify-center font-serif text-xl">Loading Stone Gallery...</div>}>
      <ShopContent />
    </Suspense>
  );
}
