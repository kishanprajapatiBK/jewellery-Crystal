import { QuizQuestion } from "@/types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    stepName: 'Intention',
    title: 'What energy do you wish to cultivate?',
    subtitle: 'Select the primary intention that resonates with your current life phase.',
    options: [
      {
        label: 'Prosperity & Abundance',
        description: 'Focus, financial vitality, and career momentum',
        value: 'Prosperity',
        iconName: 'Coins',
      },
      {
        label: 'Calm & Restful Peace',
        description: 'Easing modern stress, restful sleep, and mental serenity',
        value: 'Calm',
        iconName: 'Moon',
      },
      {
        label: 'Protection & Grounding',
        description: 'Shielding living spaces and setting healthy boundaries',
        value: 'Protection',
        iconName: 'ShieldCheck',
      },
      {
        label: 'Clarity & Intuitive Focus',
        description: 'Decision making, meditation, and sharp precision',
        value: 'Clarity',
        iconName: 'Sparkles',
      },
    ],
  },
  {
    id: 2,
    stepName: 'Space & Area',
    title: 'Where will this stone reside?',
    subtitle: 'Stones naturally complement the aesthetics and function of specific rooms.',
    options: [
      {
        label: 'Work Desk & Home Office',
        description: 'Encourages focus and clear creative thinking',
        value: 'office',
        iconName: 'Laptop',
      },
      {
        label: 'Bedside & Nightstand',
        description: 'Promotes quiet twilight calm and peaceful sleeping energy',
        value: 'bedroom',
        iconName: 'Bed',
      },
      {
        label: 'Living Room & Entrance',
        description: 'Greets guests with warm, protective, and welcoming vibes',
        value: 'living',
        iconName: 'Home',
      },
      {
        label: 'Meditation & Sacred Corner',
        description: 'Deepens quiet reflection, journaling, and breathwork',
        value: 'meditation',
        iconName: 'Flower2',
      },
    ],
  },
  {
    id: 3,
    stepName: 'Visual Style',
    title: 'Which tactile texture appeals to you?',
    subtitle: 'Natural stones possess diverse surface textures forged by millions of years.',
    options: [
      {
        label: 'Raw & Organic Specimen',
        description: 'Untouched, rugged crystalline clusters straight from Earth',
        value: 'Raw Crystals',
        iconName: 'Mountain',
      },
      {
        label: 'Polished & Smooth Palm Form',
        description: 'Silky tactile touch with elegant reflection',
        value: 'Polished Stones',
        iconName: 'Gem',
      },
      {
        label: 'Metallic Sun-Glint Luster',
        description: 'High-shine brass metallic geometry like natural gold',
        value: 'Pyrite',
        iconName: 'Sun',
      },
      {
        label: 'Vastu & Sacred Placement',
        description: 'Purposeful architectural alignments for home balance',
        value: 'Vastu',
        iconName: 'Compass',
      },
    ],
  },
  {
    id: 4,
    stepName: 'Budget',
    title: 'What budget range fits your plan?',
    subtitle: 'We curate authentic specimens across every price segment.',
    options: [
      {
        label: 'Under ₹800',
        description: 'Thoughtful everyday stones and delicate palm pieces',
        value: 'budget-sm',
        iconName: 'Tag',
      },
      {
        label: '₹800 – ₹1,500',
        description: 'Signature clusters, polished towers, and premium raw pieces',
        value: 'budget-md',
        iconName: 'Tag',
      },
      {
        label: 'Above ₹1,500',
        description: 'Master collector specimens, large Vastu sets & jewelry',
        value: 'budget-lg',
        iconName: 'Crown',
      },
    ],
  },
];
