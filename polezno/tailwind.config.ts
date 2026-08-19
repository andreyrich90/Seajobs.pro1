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
        // Warm, appetising kitchen palette. Channels live in globals.css and
        // flip under [data-theme="dark"]. Opacity modifiers keep working via
        // the <alpha-value> placeholder.
        cream: "rgb(var(--c-cream) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        card: "rgb(var(--c-card) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        // basil green — primary accent
        basil: "rgb(var(--c-basil) / <alpha-value>)",
        basil2: "rgb(var(--c-basil2) / <alpha-value>)",
        basilInk: "rgb(var(--c-basil-ink) / <alpha-value>)",
        // terracotta — secondary / hot
        clay: "rgb(var(--c-clay) / <alpha-value>)",
        // honey — pp / healthy highlight
        honey: "rgb(var(--c-honey) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgb(31 42 36 / 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
