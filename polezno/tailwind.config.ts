import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Свежо" tokens — channels in globals.css, flipped under
        // [data-theme="dark"]. Opacity modifiers work via <alpha-value>.
        cream: "rgb(var(--c-cream) / <alpha-value>)",
        cream2: "rgb(var(--c-cream2) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        card: "rgb(var(--c-card) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        // forest green — primary
        basil: "rgb(var(--c-basil) / <alpha-value>)",
        basil2: "rgb(var(--c-basil2) / <alpha-value>)",
        basilInk: "rgb(var(--c-basil-ink) / <alpha-value>)",
        // terracotta — CTA / accent
        clay: "rgb(var(--c-clay) / <alpha-value>)",
        clay2: "rgb(var(--c-clay2) / <alpha-value>)",
        // mustard — numbers / highlight
        honey: "rgb(var(--c-honey) / <alpha-value>)",
        // leaf green
        leaf: "rgb(var(--c-leaf) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 18px 40px -18px rgb(38 48 31 / 0.35)",
        card: "0 8px 24px -14px rgb(38 48 31 / 0.25)",
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
