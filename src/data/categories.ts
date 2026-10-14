import { CategoryType, IntentionType } from "@/types";

export interface IntentionCategory {
  title: IntentionType;
  subtitle: string;
  image: string;
  stoneExample: string;
}

export interface FeaturedCollection {
  title: CategoryType;
  subtitle: string;
  image: string;
  images: string[];
  link: string;
  size: 'full' | 'half';
}

export const INTENTIONS: IntentionCategory[] = [
  {
    title: 'Prosperity',
    subtitle: 'Invite abundance & career confidence',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600',
    stoneExample: 'Pyrite & Citrine',
  },
  {
    title: 'Love',
    subtitle: 'Nurture compassion & heart harmony',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600',
    stoneExample: 'Rose Quartz & Rhodonite',
  },
  {
    title: 'Protection',
    subtitle: 'Create grounded home boundaries',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600',
    stoneExample: 'Black Tourmaline & Labradorite',
  },
  {
    title: 'Clarity',
    subtitle: 'Enhance focus & mental precision',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600',
    stoneExample: 'Clear Quartz & Selenite',
  },
  {
    title: 'Calm',
    subtitle: 'Soothe modern stress & restful sleep',
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&q=80&w=600',
    stoneExample: 'Amethyst & Lepidolite',
  },
  {
    title: 'Balance',
    subtitle: 'Harmonize personal energy & warmth',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600',
    stoneExample: 'Carnelian & Tiger’s Eye',
  },
];

export const FEATURED_COLLECTIONS: FeaturedCollection[] = [
  {
    title: 'Pyrite',
    subtitle: 'Natural metallic golden clusters & cubes of vitality',
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600',
    ],
    link: '/shop?category=Pyrite',
    size: 'full',
  },
  {
    title: 'Raw Crystals',
    subtitle: 'Uncut, untouched Earth formations with raw texture',
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600',
    ],
    link: '/shop?category=Raw+Crystals',
    size: 'half',
  },
  {
    title: 'Polished Stones',
    subtitle: 'Smooth palm stones, hearts & standing generators',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600',
    ],
    link: '/shop?category=Polished+Stones',
    size: 'half',
  },
  {
    title: 'Vastu',
    subtitle: 'Curated home alignment sets according to directional sacred geometry',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&q=80&w=600',
    ],
    link: '/shop?category=Vastu',
    size: 'half',
  },
  {
    title: 'Jewelry',
    subtitle: 'Wearable intention beads with premium stretch and sterling accents',
    image: 'https://images.unsplash.com/photo-1611591475281-b1c970f759c7?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1611591475281-b1c970f759c7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600',
    ],
    link: '/shop?category=Jewelry',
    size: 'half',
  },
];
