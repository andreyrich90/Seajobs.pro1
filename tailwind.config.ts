import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // lib/markdown.tsx renders classed markup too; without this its classes are
    // only in the stylesheet by luck, because app/ happens to use the same ones.
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens — channels defined in globals.css and flipped by
        // the `data-theme="light"` attribute on <html>. Opacity modifiers
        // (bg-brass/10 etc.) keep working via the <alpha-value> placeholder.
        navy: "rgb(var(--c-navy) / <alpha-value>)",
        navy2: "rgb(var(--c-navy2) / <alpha-value>)",
        deep: "rgb(var(--c-deep) / <alpha-value>)",
        card: "rgb(var(--c-card) / <alpha-value>)",
        brass: "rgb(var(--c-brass) / <alpha-value>)",
        brass2: "rgb(var(--c-brass2) / <alpha-value>)",
        // Brass as TEXT. Fills and text need different golds on a light ground:
        // the bright accent that makes a button pop is unreadable as a label.
        brassInk: "rgb(var(--c-brass-ink) / <alpha-value>)",
        foam: "rgb(var(--c-foam) / <alpha-value>)",
        mist: "rgb(var(--c-mist) / <alpha-value>)",
        teal: "rgb(var(--c-teal) / <alpha-value>)",
        coral: "rgb(var(--c-coral) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-archivo)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
