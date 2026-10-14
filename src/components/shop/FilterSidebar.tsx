'use client';

import React from 'react';
import { FilterState } from '@/types';
import { X, RotateCcw, Filter } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function FilterSidebar({
  filters,
  onChange,
  onReset,
  isMobileOpen,
  onCloseMobile,
}: FilterSidebarProps) {
  const categories = ['All', 'Pyrite', 'Raw Crystals', 'Polished Stones', 'Vastu', 'Jewelry'];
  const stoneTypes = ['All', 'Pyrite', 'Amethyst', 'Rose Quartz', 'Clear Quartz', 'Citrine', 'Black Tourmaline', 'Tiger Eye', 'Green Aventurine', 'Selenite', 'Labradorite'];

  const content = (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-auraa-border">
        <h3 className="font-serif text-xl font-normal text-auraa-charcoal flex items-center gap-2">
          <Filter className="w-4 h-4 text-auraa-gold" /> Filter Specimens
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-auraa-muted hover:text-auraa-gold flex items-center gap-1 transition-colors uppercase tracking-wider font-semibold"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-auraa-charcoal">
          Category
        </h4>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center space-x-2 text-xs text-auraa-muted hover:text-auraa-charcoal cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                checked={filters.category === (cat === 'All' ? '' : cat)}
                onChange={() =>
                  onChange({ ...filters, category: cat === 'All' ? '' : cat })
                }
                className="accent-auraa-gold"
              />
              <span className={filters.category === (cat === 'All' ? '' : cat) ? 'text-auraa-gold font-semibold' : ''}>
                {cat === 'Raw Crystals' ? 'Crystals' : cat === 'Polished Stones' ? 'Gemstones' : cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-auraa-charcoal">
          Price Range (₹)
        </h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs">
            <input
              type="number"
              min="0"
              max="5000"
              value={filters.minPrice}
              onChange={(e) =>
                onChange({ ...filters, minPrice: Number(e.target.value) })
              }
              className="w-full bg-white border border-auraa-border rounded px-2 py-1 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
            />
            <span className="text-auraa-muted">-</span>
            <input
              type="number"
              min="0"
              max="5000"
              value={filters.maxPrice}
              onChange={(e) =>
                onChange({ ...filters, maxPrice: Number(e.target.value) })
              }
              className="w-full bg-white border border-auraa-border rounded px-2 py-1 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
            />
          </div>
        </div>
      </div>

      {/* Stone Type Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-auraa-charcoal">
          Stone Type
        </h4>
        <select
          value={filters.stoneType || 'All'}
          onChange={(e) =>
            onChange({
              ...filters,
              stoneType: e.target.value === 'All' ? '' : e.target.value,
            })
          }
          className="w-full bg-white border border-auraa-border rounded px-3 py-2 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
        >
          {stoneTypes.map((stone) => (
            <option key={stone} value={stone}>
              {stone}
            </option>
          ))}
        </select>
      </div>

      {/* In Stock Filter */}
      <div className="pt-2">
        <label className="flex items-center space-x-2 text-xs text-auraa-muted hover:text-auraa-charcoal cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              onChange({ ...filters, inStockOnly: e.target.checked })
            }
            className="accent-auraa-gold rounded"
          />
          <span>In Stock Items Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Header */}
      {isMobileOpen && (
        <div className="flex items-center justify-between pb-4 border-b border-auraa-border mb-4">
          <h3 className="font-serif text-lg text-auraa-charcoal font-medium">Filter Specimens</h3>
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1 text-auraa-muted hover:text-auraa-charcoal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      {content}
    </>
  );
}
