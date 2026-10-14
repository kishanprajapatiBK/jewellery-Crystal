import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        auraa: {
          bg: "#FAF7F2",
          card: "#FFFFFF",
          surface: "#F4EFE6",
          sand: "#EFE8DC",
          border: "#E2D9CC",
          charcoal: "#1A1A1A",
          muted: "#6B655B",
          lightMuted: "#8E877B",
          gold: "#C5A059",
          goldLight: "#E5C98B",
          goldHover: "#B38C45",
          sage: "#7A8A6D",
          terracotta: "#B06548",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(26, 26, 26, 0.04)",
        card: "0 10px 30px -5px rgba(197, 160, 89, 0.08)",
        hover: "0 20px 40px -10px rgba(197, 160, 89, 0.16)",
        modal: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        goldGlow: "0 0 35px rgba(197, 160, 89, 0.25)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        fadeIn: "fadeIn 0.4s ease-out forwards",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
