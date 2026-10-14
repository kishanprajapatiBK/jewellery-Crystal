'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import SearchModal from '@/components/ui/SearchModal';
import { useStore, Order } from '@/context/StoreContext';
import { useToast } from '@/context/ToastContext';
import { Product, CategoryType, StoneType } from '@/types';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Sparkles,
  ShoppingBag,
  Settings,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Truck,
  RotateCcw,
  Save,
  Search,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

function AdminDashboardContent() {
  const {
    products,
    categories,
    orders,
    settings,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
    updateSettings,
    updateOrderStatus,
    resetToDefault,
  } = useStore();

  const { showToast } = useToast();
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'settings'>('products');

  // Product Form State (For Create & Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    price: 999,
    compareAtPrice: 1299,
    rating: 4.9,
    reviewCount: 12,
    category: 'Pyrite' as CategoryType,
    intention: 'Prosperity' as any,
    stoneType: 'Pyrite' as StoneType,
    primaryImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
    secondaryImage: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=800',
    badges: ['Ethically Sourced'],
    description: '',
    origin: 'Logroño, Spain',
    composition: 'Natural Mineral Specimen',
    inStock: true,
    isFeatured: true,
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState(settings);

  // New Category Input
  const [newCatInput, setNewCatInput] = useState('');

  // Handle Edit Product Trigger
  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      subtitle: p.subtitle,
      price: p.price,
      compareAtPrice: p.compareAtPrice || p.price + 300,
      rating: p.rating,
      reviewCount: p.reviewCount,
      category: p.category,
      intention: p.intention,
      stoneType: p.stoneType,
      primaryImage: p.images.primary,
      secondaryImage: p.images.secondary,
      badges: p.badges || ['Ethically Sourced'],
      description: p.description,
      origin: p.stoneInfo?.origin || 'Ethical Mine',
      composition: p.stoneInfo?.composition || 'Natural Mineral',
      inStock: p.inStock,
      isFeatured: !!p.isFeatured,
    });
    setIsProductModalOpen(true);
  };

  // Handle Create Product Trigger
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      subtitle: '',
      price: 1199,
      compareAtPrice: 1499,
      rating: 4.9,
      reviewCount: 8,
      category: 'Pyrite',
      intention: 'Prosperity',
      stoneType: 'Pyrite',
      primaryImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
      secondaryImage: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=800',
      badges: ['New', 'Ethically Sourced'],
      description: 'Hand-curated authentic stone specimen.',
      origin: 'Ethical Mine',
      composition: 'Natural Earth Specimen',
      inStock: true,
      isFeatured: true,
    });
    setIsProductModalOpen(true);
  };

  // Save Product Form
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Please enter a specimen name', 'error');
      return;
    }

    const payload = {
      name: formData.name,
      subtitle: formData.subtitle,
      price: Number(formData.price),
      compareAtPrice: Number(formData.compareAtPrice),
      rating: Number(formData.rating),
      reviewCount: Number(formData.reviewCount),
      category: formData.category,
      intention: formData.intention,
      stoneType: formData.stoneType,
      images: {
        primary: formData.primaryImage,
        secondary: formData.secondaryImage,
        gallery: [formData.primaryImage, formData.secondaryImage],
      },
      badges: formData.badges as any,
      description: formData.description,
      stoneInfo: {
        origin: formData.origin,
        composition: formData.composition,
        appearance: 'Natural raw luster',
        traditionalAssociations: 'Associated with clarity and positivity.',
        care: 'Clean with dry soft cloth.',
        sizeWeight: 'Standard specimen weight',
      },
      inStock: formData.inStock,
      isFeatured: formData.isFeatured,
    };

    if (editingProduct) {
      updateProduct({ ...payload, id: editingProduct.id, slug: editingProduct.slug });
      showToast(`Specimen "${formData.name}" updated live!`, 'success');
    } else {
      addProduct(payload);
      showToast(`New Specimen "${formData.name}" published live!`, 'success');
    }

    setIsProductModalOpen(false);
  };

  // Save Settings Form
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    showToast('Site settings & Hero content updated live!', 'success');
  };

  // Add Category Submit
  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatInput.trim()) return;
    addCategory(newCatInput.trim());
    showToast(`Category "${newCatInput.trim()}" added!`, 'success');
    setNewCatInput('');
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="min-h-screen bg-auraa-bg flex flex-col font-sans">
      <AnnouncementBar />
      <Header onOpenSearch={() => setSearchOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-auraa-border pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-auraa-gold mb-1">
              <LayoutDashboard className="w-4 h-4" /> Live Content Management
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-auraa-charcoal">
              Store Control Panel
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold uppercase tracking-wider text-auraa-charcoal hover:text-auraa-gold flex items-center gap-1.5 glass-card px-4 py-2 rounded-lg border border-auraa-border transition-colors"
            >
              View Live Site <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => {
                if (window.confirm('Reset all store data to defaults?')) {
                  resetToDefault();
                  showToast('Store reset to defaults', 'info');
                }
              }}
              className="text-xs font-semibold uppercase tracking-wider text-auraa-terracotta hover:bg-auraa-terracotta/10 px-4 py-2 rounded-lg border border-auraa-terracotta/30 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
            </button>
          </div>
        </div>

        {/* Analytics Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-auraa-border shadow-soft space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-auraa-muted block">Total Revenue</span>
            <span className="font-serif text-2xl font-normal text-auraa-charcoal">₹{totalRevenue.toLocaleString('en-IN')}</span>
            <span className="text-[10px] text-auraa-sage block font-medium">Live Sales Volume</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-auraa-border shadow-soft space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-auraa-muted block">Active Specimens</span>
            <span className="font-serif text-2xl font-normal text-auraa-charcoal">{products.length} Items</span>
            <span className="text-[10px] text-auraa-gold block font-medium">Catalog Items</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-auraa-border shadow-soft space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-auraa-muted block">Total Orders</span>
            <span className="font-serif text-2xl font-normal text-auraa-charcoal">{orders.length} Orders</span>
            <span className="text-[10px] text-auraa-muted block font-medium">Customer Inquiries</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-auraa-border shadow-soft space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-auraa-muted block">Categories</span>
            <span className="font-serif text-2xl font-normal text-auraa-charcoal">{categories.length} Collections</span>
            <span className="text-[10px] text-auraa-gold block font-medium">Live Filter Tabs</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-auraa-border overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 rounded-t-xl transition-colors border-b-2 ${
              activeTab === 'products'
                ? 'border-auraa-gold text-auraa-gold bg-white shadow-soft'
                : 'border-transparent text-auraa-muted hover:text-auraa-charcoal'
            }`}
          >
            <Package className="w-4 h-4" /> Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 rounded-t-xl transition-colors border-b-2 ${
              activeTab === 'categories'
                ? 'border-auraa-gold text-auraa-gold bg-white shadow-soft'
                : 'border-transparent text-auraa-muted hover:text-auraa-charcoal'
            }`}
          >
            <FolderTree className="w-4 h-4" /> Categories ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 rounded-t-xl transition-colors border-b-2 ${
              activeTab === 'orders'
                ? 'border-auraa-gold text-auraa-gold bg-white shadow-soft'
                : 'border-transparent text-auraa-muted hover:text-auraa-charcoal'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 rounded-t-xl transition-colors border-b-2 ${
              activeTab === 'settings'
                ? 'border-auraa-gold text-auraa-gold bg-white shadow-soft'
                : 'border-transparent text-auraa-muted hover:text-auraa-charcoal'
            }`}
          >
            <Settings className="w-4 h-4" /> Hero & Banners
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-auraa-charcoal">Specimen Products Catalog</h2>
              <button
                onClick={handleOpenCreate}
                className="bg-auraa-charcoal hover:bg-black text-auraa-bg px-5 py-2.5 rounded-xl text-xs uppercase font-semibold tracking-wider flex items-center gap-2 shadow-soft transition-all"
              >
                <Plus className="w-4 h-4 text-auraa-gold" /> Add New Specimen
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-auraa-border overflow-hidden shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-auraa-charcoal">
                  <thead className="bg-auraa-surface uppercase text-[10px] font-semibold tracking-wider border-b border-auraa-border">
                    <tr>
                      <th className="p-4">Specimen Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Stone Type</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-auraa-border">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-auraa-surface/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-auraa-surface flex-shrink-0 border border-auraa-border">
                              <Image src={p.images.primary} alt={p.name} fill className="object-cover" />
                            </div>
                            <div>
                              <strong className="block text-sm font-medium text-auraa-charcoal">{p.name}</strong>
                              <span className="text-[10px] text-auraa-muted">{p.subtitle}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-auraa-gold">{p.category}</td>
                        <td className="p-4">{p.stoneType}</td>
                        <td className="p-4">
                          <span className="font-semibold text-sm">₹{p.price}</span>
                          {p.compareAtPrice && (
                            <span className="text-[10px] text-auraa-muted line-through ml-1">₹{p.compareAtPrice}</span>
                          )}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                              p.inStock
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-rose-100 text-rose-800 border border-rose-300'
                            }`}
                          >
                            {p.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-2 text-auraa-charcoal hover:text-auraa-gold hover:bg-auraa-surface rounded-lg transition-colors"
                              title="Edit Specimen"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${p.name}"?`)) {
                                  deleteProduct(p.id);
                                  showToast(`Deleted "${p.name}"`, 'info');
                                }
                              }}
                              className="p-2 text-auraa-terracotta hover:bg-auraa-terracotta/10 rounded-lg transition-colors"
                              title="Delete Specimen"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CATEGORIES MANAGER */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-auraa-charcoal">Category Collections</h2>
            </div>

            {/* Add Category Card */}
            <form onSubmit={handleAddCategorySubmit} className="bg-white p-6 rounded-2xl border border-auraa-border shadow-soft flex items-center gap-4">
              <input
                type="text"
                value={newCatInput}
                onChange={(e) => setNewCatInput(e.target.value)}
                placeholder="Enter new category name (e.g. Orbs, Pendulums)"
                className="flex-1 bg-auraa-surface border border-auraa-border px-4 py-2.5 rounded-xl text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
              />
              <button
                type="submit"
                className="bg-auraa-charcoal hover:bg-black text-auraa-bg px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-auraa-gold" /> Add Category
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const count = products.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
                return (
                  <div key={cat} className="bg-white p-5 rounded-2xl border border-auraa-border shadow-soft flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-xl text-auraa-charcoal">{cat}</h4>
                      <span className="text-xs text-auraa-muted">{count} Products</span>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete category "${cat}"?`)) {
                          deleteCategory(cat);
                          showToast(`Category "${cat}" deleted`, 'info');
                        }
                      }}
                      className="p-2 text-auraa-terracotta hover:bg-auraa-terracotta/10 rounded-lg transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGER */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-auraa-charcoal">Client Orders</h2>

            <div className="bg-white rounded-2xl border border-auraa-border overflow-hidden shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-auraa-charcoal">
                  <thead className="bg-auraa-surface uppercase text-[10px] font-semibold tracking-wider border-b border-auraa-border">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Purchased Items</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-auraa-border">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-auraa-surface/50 transition-colors">
                        <td className="p-4 font-mono font-bold text-auraa-gold">{order.id}</td>
                        <td className="p-4">
                          <strong className="block text-sm font-medium text-auraa-charcoal">{order.customerName}</strong>
                          <span className="text-[10px] text-auraa-muted block">{order.email} | {order.phone}</span>
                          <span className="text-[10px] text-auraa-muted block truncate max-w-xs">{order.address}</span>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            {order.items.map((it, idx) => (
                              <span key={idx} className="block text-[11px]">
                                • {it.productName} (x{it.quantity})
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 font-bold text-sm">₹{order.totalAmount}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.status === 'Processing'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className="bg-auraa-surface border border-auraa-border rounded-lg px-2.5 py-1 text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HERO & BANNERS MANAGER */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="bg-white p-8 rounded-2xl border border-auraa-border shadow-soft space-y-6 max-w-3xl">
            <h2 className="font-serif text-2xl text-auraa-charcoal border-b border-auraa-border pb-4">
              Homepage Hero & Banner Content Editor
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-auraa-charcoal mb-1">
                  Hero Pill Badge Text
                </label>
                <input
                  type="text"
                  value={settingsForm.heroBadge}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroBadge: e.target.value })}
                  className="w-full bg-auraa-surface border border-auraa-border px-4 py-2.5 rounded-xl text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-auraa-charcoal mb-1">
                  Hero Main Headline (Regular Text)
                </label>
                <input
                  type="text"
                  value={settingsForm.heroTitle}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                  className="w-full bg-auraa-surface border border-auraa-border px-4 py-2.5 rounded-xl text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-auraa-charcoal mb-1">
                  Hero Headline Subtitle (Italic Shimmer Text)
                </label>
                <input
                  type="text"
                  value={settingsForm.heroTitleItalic}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroTitleItalic: e.target.value })}
                  className="w-full bg-auraa-surface border border-auraa-border px-4 py-2.5 rounded-xl text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-auraa-charcoal mb-1">
                  Hero Subtitle Paragraph
                </label>
                <textarea
                  rows={3}
                  value={settingsForm.heroSubtitle}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                  className="w-full bg-auraa-surface border border-auraa-border px-4 py-2.5 rounded-xl text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-auraa-charcoal mb-1">
                  Top Announcement Bar Banner Text
                </label>
                <input
                  type="text"
                  value={settingsForm.announcementText}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                  className="w-full bg-auraa-surface border border-auraa-border px-4 py-2.5 rounded-xl text-xs text-auraa-charcoal focus:outline-none focus:border-auraa-gold"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-auraa-border flex justify-end">
              <button
                type="submit"
                className="bg-auraa-charcoal hover:bg-black text-auraa-bg px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-soft transition-all"
              >
                <Save className="w-4 h-4 text-auraa-gold" /> Save Changes Live
              </button>
            </div>
          </form>
        )}
      </main>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white max-w-2xl w-full rounded-2xl p-6 sm:p-8 space-y-6 shadow-modal border border-auraa-border my-8">
            <div className="flex items-center justify-between border-b border-auraa-border pb-4">
              <h3 className="font-serif text-2xl text-auraa-charcoal">
                {editingProduct ? `Edit Specimen "${editingProduct.name}"` : 'Add New Specimen Product'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 text-auraa-muted hover:text-auraa-charcoal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-auraa-charcoal mb-1">
                    Specimen Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-auraa-surface border border-auraa-border px-3 py-2 rounded-lg text-xs"
                    placeholder="e.g. Raw Uruguayan Amethyst Cluster"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-auraa-charcoal mb-1">
                    Subtitle Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full bg-auraa-surface border border-auraa-border px-3 py-2 rounded-lg text-xs"
                    placeholder="e.g. Deep violet specimen for tranquil spaces"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-auraa-charcoal mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-auraa-surface border border-auraa-border px-3 py-2 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-auraa-charcoal mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.compareAtPrice}
                    onChange={(e) => setFormData({ ...formData, compareAtPrice: Number(e.target.value) })}
                    className="w-full bg-auraa-surface border border-auraa-border px-3 py-2 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-auraa-charcoal mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-auraa-surface border border-auraa-border px-3 py-2 rounded-lg text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-auraa-charcoal mb-1">
                    Stone Type *
                  </label>
                  <select
                    value={formData.stoneType}
                    onChange={(e) => setFormData({ ...formData, stoneType: e.target.value as any })}
                    className="w-full bg-auraa-surface border border-auraa-border px-3 py-2 rounded-lg text-xs"
                  >
                    {['Pyrite', 'Amethyst', 'Rose Quartz', 'Clear Quartz', 'Citrine', 'Black Tourmaline', 'Tiger Eye', 'Green Aventurine', 'Selenite', 'Labradorite'].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-auraa-charcoal mb-1">
                  Primary Image URL
                </label>
                <input
                  type="text"
                  value={formData.primaryImage}
                  onChange={(e) => setFormData({ ...formData, primaryImage: e.target.value })}
                  className="w-full bg-auraa-surface border border-auraa-border px-3 py-2 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-auraa-charcoal mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-auraa-surface border border-auraa-border px-3 py-2 rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="accent-auraa-gold rounded"
                  />
                  <span className="font-semibold text-auraa-charcoal">In Stock</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-auraa-gold rounded"
                  />
                  <span className="font-semibold text-auraa-charcoal">Featured Best Seller</span>
                </label>
              </div>

              <div className="pt-4 border-t border-auraa-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 border border-auraa-border rounded-xl text-auraa-charcoal hover:bg-auraa-surface text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-auraa-charcoal hover:bg-black text-auraa-bg px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-auraa-gold" /> {editingProduct ? 'Save Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-auraa-bg flex items-center justify-center font-serif text-xl">Loading Admin Panel...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
