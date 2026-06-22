import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0a1f33",
        navy2: "#0e2a45",
        deep: "#061523",
        card: "#0f2942",
        brass: "#c9a227",
        brass2: "#e3c04a",
        foam: "#e8f0f2",
        mist: "#8aa0b0",
        teal: "#2dd4bf",
        coral: "#e8744f",
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
