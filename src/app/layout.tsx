import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ToastProvider } from '@/context/ToastContext';
import CartDrawer from '@/components/cart/CartDrawer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Healing Crystals | Illuminate Your Path, Naturally',
  description: 'Illuminate Your Path, Naturally. Premium natural pyrite clusters, raw crystals, and gemstones for conscious Indian homes.',
  keywords: ['Healing Crystals', 'crystals', 'pyrite cluster', 'natural stones', 'amethyst', 'rose quartz', 'vastu stones', 'gemstones India'],
  openGraph: {
    title: 'Healing Crystals | Illuminate Your Path, Naturally',
    description: 'Illuminate Your Path, Naturally. Premium natural pyrite clusters, raw crystals, and gemstones.',
    url: 'https://healingcrystals.in',
    siteName: 'Healing Crystals',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-auraa-bg text-auraa-charcoal font-sans antialiased min-h-screen flex flex-col">
        <StoreProvider>
          <ToastProvider>
            <WishlistProvider>
              <CartProvider>
                {children}
                <CartDrawer />
              </CartProvider>
            </WishlistProvider>
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
